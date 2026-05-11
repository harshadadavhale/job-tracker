const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  const fs = require('fs');
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    envFile.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  } catch (e) {
    console.log('No .env file found');
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Connect to MongoDB ───────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ MongoDB connection failed:', err.message));

// ─── View Engine ──────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ───────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Session Setup ────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// ─── Make user available in all EJS pages ────────────────────
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ─── Routes ───────────────────────────────────────────────────
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const jobRoutes = require('./routes/jobs');
app.use('/jobs', jobRoutes);

// ─── Home route ───────────────────────────────────────────────
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/jobs/dashboard');
  res.redirect('/auth/login');
});

// ─── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});