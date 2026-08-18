require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const connectDB = require('./config/db');

const updateData = async () => {
  try {
    await connectDB();
    
    const companies = await Company.find({ "location.city": "Mohali" });
    
    for (let company of companies) {
      // Create realistic email and website
      const cleanName = company.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      company.website = `https://www.${cleanName}.com`;
      company.email = `contact@${cleanName}.com`;
      await company.save();
    }
    
    console.log(`Updated ${companies.length} companies with websites and emails.`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating data:', error);
    process.exit(1);
  }
};

updateData();
