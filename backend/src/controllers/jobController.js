const Job = require('../models/Job');
const { Queue } = require('bullmq');
const redisClient = require('../config/redis');

// Create a queue for processing job-related background tasks (e.g. notifications)
const jobQueue = new Queue('jobQueue', { connection: redisClient });

exports.createJob = async (req, res) => {
  try {
    const { title, companyId, cityId, role, experienceLevel, description, salaryRange, applyUrl } = req.body;

    const newJob = new Job({
      title,
      companyId,
      cityId,
      role,
      experienceLevel,
      description,
      salaryRange,
      applyUrl
    });

    const savedJob = await newJob.save();

    // Add task to queue (e.g., notify subscribers)
    await jobQueue.add('processNewJobAlert', {
      jobId: savedJob._id,
      cityId: savedJob.cityId,
      role: savedJob.role
    });

    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const cursor = req.query.cursor;
    
    const query = { isActive: true };
    if (cursor) {
      query._id = { $lt: cursor };
    }

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .populate('companyId', 'name logoUrl')
        .populate('cityId', 'name')
        .sort({ _id: -1 })
        .limit(limit),
      Job.countDocuments({ isActive: true })
    ]);

    const nextCursor = jobs.length === limit ? jobs[jobs.length - 1]._id : null;

    res.status(200).json({
      data: jobs,
      total,
      nextCursor
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
