const { Worker } = require('bullmq');
const redisClient = require('../config/redis');

const jobWorker = new Worker('jobQueue', async job => {
  console.log(`Processing job ${job.id} of type ${job.name}`);
  console.log('Job Data:', job.data);
  
  if (job.name === 'processNewJobAlert') {
    // Simulate background task for sending alerts to users
    console.log(`Sending alerts for new job ${job.data.jobId} in city ${job.data.cityId}...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Alerts sent for job ${job.data.jobId}`);
  }
}, { connection: redisClient });

jobWorker.on('completed', job => {
  console.log(`Job ${job.id} has completed!`);
});

jobWorker.on('failed', (job, err) => {
  console.log(`Job ${job.id} has failed with ${err.message}`);
});

module.exports = jobWorker;
