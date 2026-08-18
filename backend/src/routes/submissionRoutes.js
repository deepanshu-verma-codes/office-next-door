const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middleware/auth');

// Protected route: user must be logged in to submit a company
router.post('/', authMiddleware, submissionController.submitCompany);

module.exports = router;
