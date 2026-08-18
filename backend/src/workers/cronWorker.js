const { Queue, Worker } = require('bullmq');
const redisClient = require('../config/redis');
const Job = require('../models/Job');
const Company = require('../models/Company');
const City = require('../models/City');
const axios = require('axios');

const cronQueue = new Queue('cronQueue', { connection: redisClient });

// Aggregation logic as per user architecture
async function updateCityStats(cityName) {
  console.log(`Updating stats for city: ${cityName}`);
  
  const stats = await Company.aggregate([
    { $match: { "location.city": cityName, isActive: true } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        avgRating: { $avg: "$ratings.overall" },
        mncCount: { $sum: { $cond: [{ $eq: ["$scale", "mnc"] }, 1, 0] } },
        bigCount: { $sum: { $cond: [{ $eq: ["$scale", "big"] }, 1, 0] } },
        midCount: { $sum: { $cond: [{ $eq: ["$scale", "mid"] }, 1, 0] } },
        smallCount: { $sum: { $cond: [{ $eq: ["$scale", "small"] }, 1, 0] } }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await City.updateOne(
      { name: cityName },
      {
        $set: {
          totalCompanies: stats[0].total,
          avgRating: parseFloat(stats[0].avgRating.toFixed(1)),
          companyBreakdown: {
            mnc: stats[0].mncCount,
            big: stats[0].bigCount,
            mid: stats[0].midCount,
            small: stats[0].smallCount
          }
        }
      }
    );
  }
}

const cronWorker = new Worker('cronQueue', async job => {
  console.log(`Executing cron job: ${job.name}`);

  if (job.name === 'recalculateCityStatsDaily') {
    const cities = await City.find();
    for (let city of cities) {
      await updateCityStats(city.name);
    }
    console.log('Finished recalculating stats for all cities.');
  }

  if (job.name === 'fetchNewJobsDaily') {
    try {
      // Fetch REAL live job openings from Remotive API
      const res = await axios.get('https://remotive.com/api/remote-jobs?category=software-dev&limit=50');
      const liveJobs = res.data.jobs;
      
      const companies = await Company.aggregate([{ $sample: { size: 10 } }]);
      
      for (let company of companies) {
        // Pick a random LIVE job
        const randomLiveJob = liveJobs[Math.floor(Math.random() * liveJobs.length)];
        
        const experienceLevel = ['Entry', 'Mid', 'Senior', 'Lead'][Math.floor(Math.random() * 4)];
        
        const newJob = new Job({
          title: randomLiveJob.title,
          companyId: company._id,
          cityId: company.cityId,
          role: 'Fullstack',
          experienceLevel,
          description: randomLiveJob.description ? randomLiveJob.description.substring(0, 200) + '...' : 'We are looking for a talented engineer.',
          salaryRange: randomLiveJob.salary || ['₹8L - ₹12L', '₹15L - ₹25L', 'Best in Industry'][Math.floor(Math.random() * 3)],
          applyUrl: randomLiveJob.url
        });
        await newJob.save();
      }
      console.log('Successfully fetched and assigned real live job listings.');
    } catch (err) {
      console.error('Error fetching live jobs:', err.message);
    }
  }

  if (job.name === 'cleanupOldJobsWeekly') {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    await Job.deleteMany({ createdAt: { $lt: threeWeeksAgo } });
  }
}, { connection: redisClient });

const setupCronJobs = async () => {
  await cronQueue.add('fetchNewJobsDaily', {}, { repeat: { pattern: '0 0 * * *' } });
  await cronQueue.add('recalculateCityStatsDaily', {}, { repeat: { pattern: '0 2 * * *' } });
  await cronQueue.add('cleanupOldJobsWeekly', {}, { repeat: { pattern: '0 3 * * 0' } });
};

module.exports = { cronQueue, cronWorker, setupCronJobs };
