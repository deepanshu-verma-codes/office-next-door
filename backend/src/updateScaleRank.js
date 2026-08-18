require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const connectDB = require('./config/db');

const scaleRankMap = {
  'mnc': 1,
  'big': 2,
  'mid': 3,
  'small': 4,
  'startup': 5
};

const updateRanks = async () => {
  try {
    await connectDB();
    
    console.log("Updating scaleRank for all companies...");
    const companies = await Company.find({});
    let updated = 0;
    
    const bulkOps = companies.map(company => {
      const rank = scaleRankMap[company.scale] || 6;
      return {
        updateOne: {
          filter: { _id: company._id },
          update: { $set: { scaleRank: rank } }
        }
      };
    });
    
    if (bulkOps.length > 0) {
      await Company.bulkWrite(bulkOps);
      updated = bulkOps.length;
    }
    
    console.log(`Successfully updated scaleRank for ${updated} companies!`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating ranks:', error);
    process.exit(1);
  }
};

updateRanks();
