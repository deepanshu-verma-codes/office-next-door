require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const City = require('./models/City');
const Job = require('./models/Job');
const connectDB = require('./config/db');

const prefixes = ["Tech", "Info", "Data", "Cloud", "Cyber", "Web", "App", "Next", "Smart", "Global", "Net", "Quantum", "Alpha", "Beta", "Core", "Prime", "Apex", "Elite", "Pro", "Max"];
const suffixes = ["Solutions", "Systems", "Technologies", "Labs", "Soft", "Works", "Dynamics", "Matrix", "Networks", "Consulting", "Innovations", "Corp", "Group", "Enterprises"];
const techStacksPool = ["React", "Node.js", "MongoDB", "Python", "Java", "C++", "AWS", "Azure", "Docker", "Kubernetes", "Angular", "Vue", "PHP", "Laravel", "Ruby", "Swift", "Kotlin", "Flutter", "React Native", "Blockchain", "Web3", "AI", "Machine Learning", "Data Science"];

const realCompanies = [
  "Tech Mahindra", "Dell", "Quark Software", "IDS Infotech", "Net Solutions", 
  "PTC", "Bebo Technologies", "Sebiz Infotech", "Drish Infotech", "Trigma", 
  "MoogleLabs", "Debut Infotech", "Solitaire Infosys", "ThinkNEXT Technologies", 
  "Live Deftsoft", "Oneulsoft", "Bringle Tech", "Bexo.AI", "Infosys", "Wipro", 
  "TCS", "Cognizant", "Accenture", "IBM", "Capgemini", "HCL", "Mindtree", 
  "L&T Infotech", "Mphasis", "Syntel", "Hexaware", "Zensar", "Cybage", 
  "Persistent", "KPIT", "Tata Elxsi", "Sonata Software", "Birlasoft", 
  "TechJini", "Robosoft", "Qburst", "Experion", "Fingent", "ToXSL", "Netsmartz"
];

function generateRandomTechStack() {
  const stack = [];
  const numSkills = Math.floor(Math.random() * 5) + 3;
  while (stack.length < numSkills) {
    const skill = techStacksPool[Math.floor(Math.random() * techStacksPool.length)];
    if (!stack.includes(skill)) stack.push(skill);
  }
  return stack;
}

const generateData = async () => {
  try {
    await connectDB();
    
    let mohali = await City.findOne({ name: 'Mohali' });
    if (!mohali) {
      mohali = await City.create({
        name: 'Mohali',
        slug: 'mohali',
        state: 'Punjab',
        country: 'India',
        tier: '2'
      });
    }

    const companiesToInsert = [];
    
    // Add real companies
    for (const name of realCompanies) {
      companiesToInsert.push({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-mohali',
        cityId: mohali._id,
        location: {
          city: 'Mohali',
          state: 'Punjab',
          country: 'India',
          address: 'Industrial Area Phase 8, Mohali'
        },
        scale: ['mnc', 'big', 'mid', 'small', 'startup'][Math.floor(Math.random() * 5)],
        employeeCount: Math.floor(Math.random() * 1000) + 10,
        ratings: {
          overall: (Math.random() * 2 + 3).toFixed(1),
          glassdoor: (Math.random() * 2 + 3).toFixed(1)
        },
        techStack: generateRandomTechStack(),
        description: `Leading IT services and consulting firm based in Mohali.`,
        isActive: true,
        verified: true
      });
    }

    // Generate remaining to hit 200
    let index = 0;
    while (companiesToInsert.length < 200) {
      index++;
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      const name = `${p} ${s} Mohali ${index}`;
      companiesToInsert.push({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-mohali-' + index,
        cityId: mohali._id,
        location: {
          city: 'Mohali',
          state: 'Punjab',
          country: 'India',
          address: 'Phase 8B, Sector 74, Mohali'
        },
        scale: ['mid', 'small', 'startup'][Math.floor(Math.random() * 3)],
        employeeCount: Math.floor(Math.random() * 200) + 5,
        ratings: {
          overall: (Math.random() * 2 + 3).toFixed(1),
          glassdoor: (Math.random() * 2 + 3).toFixed(1)
        },
        techStack: generateRandomTechStack(),
        description: `Innovative software solutions provider in the heart of Mohali.`,
        isActive: true,
        verified: false
      });
    }

    // Clear existing Mohali companies to prevent duplicates on rerun
    await Company.deleteMany({ "location.city": "Mohali" });

    await Company.insertMany(companiesToInsert);
    console.log(`Successfully inserted 200 companies for Mohali!`);
    
    // Update city stats
    const stats = await Company.aggregate([
      { $match: { "location.city": "Mohali", isActive: true } },
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
        { _id: mohali._id },
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
      console.log('City stats updated for Mohali.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
};

generateData();
