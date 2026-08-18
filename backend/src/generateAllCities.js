require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const City = require('./models/City');
const connectDB = require('./config/db');

const citiesData = [
  { name: 'Bengaluru', state: 'Karnataka', tier: '1', count: 1450 },
  { name: 'Hyderabad', state: 'Telangana', tier: '1', count: 1200 },
  { name: 'Pune', state: 'Maharashtra', tier: '1', count: 1100 },
  { name: 'Chennai', state: 'Tamil Nadu', tier: '1', count: 950 },
  { name: 'Mumbai', state: 'Maharashtra', tier: '1', count: 900 },
  { name: 'Gurugram', state: 'Haryana', tier: '1', count: 850 },
  { name: 'Noida', state: 'Uttar Pradesh', tier: '1', count: 800 },
  { name: 'Delhi', state: 'Delhi', tier: '1', count: 750 },
  { name: 'Ahmedabad', state: 'Gujarat', tier: '2', count: 500 },
  { name: 'Kolkata', state: 'West Bengal', tier: '2', count: 450 },
  { name: 'Coimbatore', state: 'Tamil Nadu', tier: '2', count: 400 },
  { name: 'Jaipur', state: 'Rajasthan', tier: '2', count: 350 },
  { name: 'Indore', state: 'Madhya Pradesh', tier: '2', count: 300 },
  { name: 'Chandigarh', state: 'Chandigarh', tier: '2', count: 280 },
  { name: 'Kochi', state: 'Kerala', tier: '2', count: 250 },
  { name: 'Thiruvananthapuram', state: 'Kerala', tier: '2', count: 220 },
  { name: 'Lucknow', state: 'Uttar Pradesh', tier: '2', count: 200 },
  { name: 'Bhubaneswar', state: 'Odisha', tier: '2', count: 180 },
  { name: 'Mohali', state: 'Punjab', tier: '2', count: 175 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', tier: '2', count: 160 },
  { name: 'Vadodara', state: 'Gujarat', tier: '3', count: 150 },
  { name: 'Nagpur', state: 'Maharashtra', tier: '3', count: 140 },
  { name: 'Mysore', state: 'Karnataka', tier: '3', count: 130 },
  { name: 'Nashik', state: 'Maharashtra', tier: '3', count: 120 },
  { name: 'Dehradun', state: 'Uttarakhand', tier: '3', count: 110 },
  { name: 'Bhopal', state: 'Madhya Pradesh', tier: '3', count: 100 },
  { name: 'Ranchi', state: 'Jharkhand', tier: '3', count: 90 },
  { name: 'Guwahati', state: 'Assam', tier: '3', count: 80 },
  { name: 'Greater Noida', state: 'Uttar Pradesh', tier: '3', count: 150 },
  { name: 'Gandhinagar', state: 'Gujarat', tier: '3', count: 120 },
  { name: 'Panchkula', state: 'Haryana', tier: '3', count: 80 },
  { name: 'Mangalore', state: 'Karnataka', tier: '3', count: 70 },
  { name: 'Belagavi', state: 'Karnataka', tier: '3', count: 60 }
];

const prefixes = ["Tech", "Info", "Data", "Cloud", "Cyber", "Web", "App", "Next", "Smart", "Global", "Net", "Quantum", "Alpha", "Beta", "Core", "Prime", "Apex", "Elite", "Pro", "Max", "Future", "Vision", "Blue", "Red", "First", "Top"];
const suffixes = ["Solutions", "Systems", "Technologies", "Labs", "Soft", "Works", "Dynamics", "Matrix", "Networks", "Consulting", "Innovations", "Corp", "Group", "Enterprises", "IT", "Digital", "Studios", "Software", "AI", "Data", "Cloud"];
const techStacksPool = ["React", "Node.js", "MongoDB", "Python", "Java", "C++", "AWS", "Azure", "Docker", "Kubernetes", "Angular", "Vue", "PHP", "Laravel", "Ruby", "Swift", "Kotlin", "Flutter", "React Native", "Blockchain", "Web3", "AI", "Machine Learning", "Data Science", "Go", "Rust"];

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
    
    // Clear all existing data to enforce the new strict list
    console.log("Wiping existing cities and companies...");
    await City.deleteMany({});
    await Company.deleteMany({});

    for (const cityInfo of citiesData) {
      console.log(`Generating ${cityInfo.count} companies for ${cityInfo.name}...`);
      
      const city = await City.create({
        name: cityInfo.name,
        slug: cityInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        state: cityInfo.state,
        country: 'India',
        tier: cityInfo.tier
      });

      const companiesToInsert = [];
      let index = 0;
      
      while (companiesToInsert.length < cityInfo.count) {
        index++;
        const p = prefixes[Math.floor(Math.random() * prefixes.length)];
        const s = suffixes[Math.floor(Math.random() * suffixes.length)];
        // Just standard clean name without numbers
        let name = `${p} ${s} ${cityInfo.name}`;
        
        // Ensure name is somewhat unique or fallback to adding a random suffix if collision could happen
        if (index > 200) {
            // To prevent massive identical names in huge cities like Bangalore, add a random identifier word
            const p2 = prefixes[Math.floor(Math.random() * prefixes.length)];
            name = `${p} ${p2} ${s} ${cityInfo.name}`;
        }

        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        companiesToInsert.push({
          name: name,
          slug: cleanName + '-' + index, // kept unique via index
          cityId: city._id,
          location: {
            city: cityInfo.name,
            state: cityInfo.state,
            country: 'India',
            address: `IT Hub, ${cityInfo.name}`
          },
          scale: ['mnc', 'big', 'mid', 'small', 'startup'][Math.floor(Math.random() * 5)],
          employeeCount: Math.floor(Math.random() * 500) + 10,
          ratings: {
            overall: (Math.random() * 2 + 3).toFixed(1),
            glassdoor: (Math.random() * 2 + 3).toFixed(1)
          },
          techStack: generateRandomTechStack(),
          description: `Leading technology solutions provider based in ${cityInfo.name}.`,
          website: `https://www.${cleanName}.com`,
          email: `contact@${cleanName}.com`,
          isActive: true,
          verified: Math.random() > 0.5
        });
      }

      // Batch insert in chunks of 500 to save memory
      const chunkSize = 500;
      for (let i = 0; i < companiesToInsert.length; i += chunkSize) {
        const chunk = companiesToInsert.slice(i, i + chunkSize);
        await Company.insertMany(chunk);
      }
      
      // Update city stats
      const stats = await Company.aggregate([
        { $match: { "location.city": cityInfo.name, isActive: true } },
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

    console.log('Finished generating realistic company volumes for all specific Indian IT hubs!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
};

generateData();
