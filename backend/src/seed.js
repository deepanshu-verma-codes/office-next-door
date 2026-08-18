require('dotenv').config();
const mongoose = require('mongoose');
const City = require('./models/City');
const Company = require('./models/Company');
const Job = require('./models/Job');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();
    
    await City.deleteMany();
    await Company.deleteMany();
    await Job.deleteMany();

    const cities = await City.insertMany([
      { name: 'San Francisco', slug: 'san-francisco', state: 'CA', country: 'USA', tier: '1' },
      { name: 'Austin', slug: 'austin', state: 'TX', country: 'USA', tier: '2' },
      { name: 'London', slug: 'london', state: 'England', country: 'UK', tier: '1' },
      { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', country: 'India', tier: '1' },
      { name: 'Mohali', slug: 'mohali', state: 'Punjab', country: 'India', tier: '2' }
    ]);

    const companiesData = [
      {
        name: 'TechNova Solutions',
        slug: 'technova-solutions',
        cityId: cities[0]._id, 
        location: { city: 'San Francisco', state: 'CA', country: 'USA' },
        description: 'Building the next generation of cloud infrastructure.',
        techStack: ['React', 'Node.js', 'MongoDB', 'AWS'],
        scale: 'mid',
        employeeCount: 150,
        ratings: { glassdoor: 4.8, ambitionBox: 4.5, overall: 4.65 }
      },
      {
        name: 'Quantum Local',
        slug: 'quantum-local',
        cityId: cities[1]._id,
        location: { city: 'Austin', state: 'TX', country: 'USA' },
        description: 'Hyperlocal delivery and logistics platform powered by AI.',
        techStack: ['Next.js', 'Express', 'Redis', 'BullMQ'],
        scale: 'small',
        employeeCount: 45,
        ratings: { glassdoor: 4.2, ambitionBox: 4.0, overall: 4.1 }
      },
      {
        name: 'GlobalFinance',
        slug: 'globalfinance',
        cityId: cities[2]._id,
        location: { city: 'London', state: 'England', country: 'UK' },
        description: 'Leading multinational banking software provider.',
        techStack: ['Angular', 'Java', 'PostgreSQL'],
        scale: 'mnc',
        employeeCount: 5000,
        ratings: { glassdoor: 3.9, ambitionBox: 3.8, overall: 3.85 }
      },
      {
        name: 'StartupX',
        slug: 'startupx',
        cityId: cities[3]._id,
        location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
        description: 'Disrupting the real estate market through AI.',
        techStack: ['Vue', 'Python', 'Neo4j'],
        scale: 'startup',
        employeeCount: 15,
        ratings: { glassdoor: 4.5, ambitionBox: 4.5, overall: 4.5 }
      },
      {
        name: 'Suffescom Solutions',
        slug: 'suffescom-solutions',
        cityId: cities[4]._id, 
        location: { city: 'Mohali', state: 'Punjab', country: 'India' },
        description: 'Providing scalable IT infrastructure and Web3 apps.',
        techStack: ['React', 'Node.js', 'Blockchain', 'Web3'],
        scale: 'mid',
        employeeCount: 120,
        ratings: { glassdoor: 4.2, ambitionBox: 4.5, goodFirms: 5.0, overall: 4.4 }
      }
    ];

    const companies = await Company.insertMany(companiesData);

    const jobsData = [
      {
        title: 'Senior Full Stack Engineer',
        companyId: companies[0]._id,
        cityId: cities[0]._id,
        role: 'MERN',
        experienceLevel: 'Senior',
        description: 'We are looking for a rockstar MERN developer.',
        salaryRange: '$120k - $160k'
      },
      {
        title: 'MERN Stack Developer',
        companyId: companies[4]._id, // Suffescom
        cityId: cities[4]._id, // Mohali
        role: 'Fullstack',
        experienceLevel: 'Mid',
        description: 'Looking for a passionate blockchain and MERN dev in Mohali.',
        salaryRange: '₹8L - ₹15L'
      }
    ];

    await Job.insertMany(jobsData);
    
    // Trigger the aggregation stats manually for seeding
    for (let city of cities) {
        const stats = await Company.aggregate([
          { $match: { "location.city": city.name, isActive: true } },
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
            { _id: city._id },
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

    console.log('Database seeded successfully with new schemas!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
