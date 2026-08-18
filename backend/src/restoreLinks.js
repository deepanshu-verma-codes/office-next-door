require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const connectDB = require('./config/db');

const restoreLinks = async () => {
  try {
    await connectDB();
    
    const companies = await Company.find({});
    
    const bulkOps = companies.map(company => {
      // Re-create the standard website format
      const cleanName = company.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return {
        updateOne: {
          filter: { _id: company._id },
          update: { $set: { website: `https://www.${cleanName}.com` } }
        }
      };
    });
    
    if (bulkOps.length > 0) {
      await Company.bulkWrite(bulkOps);
    }
    
    console.log(`Successfully restored standard website links for ${bulkOps.length} companies!`);
    process.exit(0);
  } catch (error) {
    console.error('Error restoring links:', error);
    process.exit(1);
  }
};

restoreLinks();
