const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { isAuthenticated } = require('../middleware/auth');

// Protect all job routes
router.use(isAuthenticated);

// ─── Dashboard ────────────────────────────────────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const statusFilter = req.query.status || '';
    const query = { user: req.session.user.id };
    if (statusFilter) query.status = statusFilter;

    const jobs = await Job.find(query).sort({ date: -1 });
    const allJobs = await Job.find({ user: req.session.user.id });

    const stats = {
      total:     allJobs.length,
      interview: allJobs.filter(j => j.status === 'Interview').length,
      selected:  allJobs.filter(j => j.status === 'Selected').length,
      rejected:  allJobs.filter(j => j.status === 'Rejected').length,
    };

    res.render('jobs/dashboard', { jobs, stats, statusFilter });
  } catch (err) {
    console.log('DASHBOARD ERROR:', err.message);
    res.status(500).send('Error loading dashboard');
  }
});

// ─── Show Add Job Form ────────────────────────────────────────
router.get('/add', (req, res) => {
  res.render('jobs/form', { job: null, error: null });
});

// ─── Handle Add Job ───────────────────────────────────────────
router.post('/add', async (req, res) => {
  const { company, role, status, date, notes } = req.body;
  try {
    await Job.create({
      user: req.session.user.id,
      company,
      role,
      status,
      date: date || Date.now(),
      notes
    });
    res.redirect('/jobs/dashboard');
  } catch (err) {
    console.log('ADD JOB ERROR:', err.message);
    res.render('jobs/form', { job: null, error: err.message });
  }
});

// ─── Show Edit Job Form ───────────────────────────────────────
router.get('/edit/:id', async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.session.user.id
    });
    if (!job) return res.redirect('/jobs/dashboard');
    res.render('jobs/form', { job, error: null });
  } catch (err) {
    res.redirect('/jobs/dashboard');
  }
});

// ─── Handle Edit Job ──────────────────────────────────────────
router.post('/edit/:id', async (req, res) => {
  const { company, role, status, date, notes } = req.body;
  try {
    await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.session.user.id },
      { company, role, status, date, notes }
    );
    res.redirect('/jobs/dashboard');
  } catch (err) {
    console.log('EDIT JOB ERROR:', err.message);
    res.redirect('/jobs/dashboard');
  }
});

// ─── Delete Job ───────────────────────────────────────────────
router.post('/delete/:id', async (req, res) => {
  try {
    await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.session.user.id
    });
    res.redirect('/jobs/dashboard');
  } catch (err) {
    console.log('DELETE JOB ERROR:', err.message);
    res.redirect('/jobs/dashboard');
  }
});

module.exports = router;