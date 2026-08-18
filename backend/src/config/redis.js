const { Redis } = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URI || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

module.exports = redisClient;
