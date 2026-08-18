const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// GET /api/cities
router.get('/', cityController.getAllCities);

// GET /api/cities/:cityName/companies
router.get('/:cityName/companies', cityController.getCompaniesByCity);

// GET /api/cities/:cityName/jobs
router.get('/:cityName/jobs', cityController.getJobsByCity);

module.exports = router;
