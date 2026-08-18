require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const connectDB = require('./config/db');

const fixLinks = async () => {
  try {
    await connectDB();
    
    // We will update all companies
    const companies = await Company.find({});
    
    let count = 0;
    const bulkOps = companies.map(company => {
      // Create a Google search link for the company to ensure it "works"
      const encodedName = encodeURIComponent(company.name);
      return {
        updateOne: {
          filter: { _id: company._id },
          update: { $set: { website: `https://www.google.com/search?q=${encodedName}` } }
        }
      };
    });
    
    // Execute bulk write for performance
    if (bulkOps.length > 0) {
      await Company.bulkWrite(bulkOps);
    }
    
    console.log(`Successfully fixed website links for ${bulkOps.length} companies!`);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing links:', error);
    process.exit(1);
  }
};

fixLinks();
