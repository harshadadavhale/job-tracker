const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// ─── Show Register Page ───────────────────────────────────────
router.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/jobs/dashboard');
  res.render('auth/register', { error: null });
});

// ─── Handle Register Form ─────────────────────────────────────
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('auth/register', { error: 'Email already registered!' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    req.session.user = { id: user._id, name: user.name, email: user.email };
    res.redirect('/jobs/dashboard');
  } catch (err) {
    console.log('REGISTER ERROR:', err.message);
    res.render('auth/register', { error: err.message });
  }
});

// ─── Show Login Page ──────────────────────────────────────────
router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/jobs/dashboard');
  res.render('auth/login', { error: null });
});

// ─── Handle Login Form ────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('auth/login', { error: 'No account found with this email.' });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return res.render('auth/login', { error: 'Incorrect password.' });
    }
    req.session.user = { id: user._id, name: user.name, email: user.email };
    res.redirect('/jobs/dashboard');
  } catch (err) {
    console.log('LOGIN ERROR:', err.message);
    res.render('auth/login', { error: err.message });
  }
});

// ─── Logout ───────────────────────────────────────────────────
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;