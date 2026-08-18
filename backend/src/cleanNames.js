require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const connectDB = require('./config/db');

const cleanData = async () => {
  try {
    await connectDB();
    
    // Find all companies that have a number at the end of their name
    const companies = await Company.find({ name: { $regex: /\s\d+$/ } });
    
    let count = 0;
    for (let company of companies) {
      // Remove trailing space and numbers from the name
      company.name = company.name.replace(/\s\d+$/, '');
      await company.save();
      count++;
    }
    
    console.log(`Successfully cleaned the names of ${count} companies!`);
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning data:', error);
    process.exit(1);
  }
};

cleanData();
