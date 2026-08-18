const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// POST /api/jobs
router.post('/', jobController.createJob);

// GET /api/jobs
router.get('/', jobController.getAllJobs);

module.exports = router;
