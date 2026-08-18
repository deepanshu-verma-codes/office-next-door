const City = require('../models/City');
const Company = require('../models/Company');
const Job = require('../models/Job');
const redisClient = require('../config/redis');

exports.getAllCities = async (req, res) => {
  try {
    const cachedData = await redisClient.get('all_cities');
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    const cities = await City.find({}, 'name slug state country totalCompanies').sort({ name: 1 });
    await redisClient.set('all_cities', JSON.stringify(cities), 'EX', 3600);
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching all cities:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCompaniesByCity = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { cursor } = req.query;
    const limit = 20;
    
    const searchQuery = req.query.search || '';
    const cacheKey = `companies:${cityName.toLowerCase()}:cursor:${cursor || 'first'}:search:${searchQuery}`;
    const cachedData = await redisClient.get(cacheKey);
    
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const city = await City.findOne({ name: new RegExp('^' + cityName + '$', 'i') });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const query = { cityId: city._id };
    if (req.query.search) {
      query.name = new RegExp(req.query.search, 'i');
    }
    if (cursor) {
      let cursorId = cursor;
      if (cursor.includes('_')) {
        cursorId = cursor.split('_')[1];
      }
      
      const mongoose = require('mongoose');
      let objectIdCursor;
      try {
        objectIdCursor = new mongoose.Types.ObjectId(cursorId);
      } catch(e) {
        objectIdCursor = cursorId;
      }
      
      query._id = { $gt: objectIdCursor };
    }

    const companies = await Company.find(query).sort({ _id: 1 }).limit(limit);
    
    let nextCursor = null;
    if (companies.length === limit) {
      const lastItem = companies[companies.length - 1];
      nextCursor = lastItem._id.toString();
    }
    
    const responseData = { data: companies, nextCursor, totalCount: city.totalCompanies };

    // Set cache for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(responseData), 'EX', 3600);

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getJobsByCity = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { role, experienceLevel } = req.query;

    const city = await City.findOne({ name: new RegExp('^' + cityName + '$', 'i') });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const query = { cityId: city._id, isActive: true };
    if (role) query.role = new RegExp(role, 'i');
    if (experienceLevel) query.experienceLevel = experienceLevel;

    const jobs = await Job.find(query).populate('companyId', 'name logoUrl');

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
