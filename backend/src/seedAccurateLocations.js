require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const City = require('./models/City');
const connectDB = require('./config/db');

const companyData = [
  { name: 'Tata Consultancy Services (TCS)', website: 'https://www.tcs.com', scale: 'mnc', cities: ['Mumbai', 'Bengaluru', 'Pune', 'Chennai', 'Hyderabad', 'Noida', 'Gurugram', 'Kolkata', 'Ahmedabad', 'Gandhinagar', 'Lucknow', 'Nagpur', 'Bhubaneswar', 'Kochi', 'Thiruvananthapuram', 'Indore'] },
  { name: 'Infosys', website: 'https://www.infosys.com', scale: 'mnc', cities: ['Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Mohali', 'Chandigarh', 'Thiruvananthapuram', 'Mysore', 'Mangalore', 'Jaipur', 'Bhubaneswar', 'Indore', 'Nagpur'] },
  { name: 'Wipro', website: 'https://www.wipro.com', scale: 'mnc', cities: ['Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Noida', 'Gurugram', 'Kochi', 'Visakhapatnam', 'Bhubaneswar', 'Ahmedabad', 'Mysore'] },
  { name: 'HCLTech', website: 'https://www.hcltech.com', scale: 'mnc', cities: ['Noida', 'Chennai', 'Bengaluru', 'Hyderabad', 'Pune', 'Lucknow', 'Madurai', 'Nagpur', 'Kolkata'] },
  { name: 'Tech Mahindra', website: 'https://www.techmahindra.com', scale: 'mnc', cities: ['Pune', 'Hyderabad', 'Bengaluru', 'Chennai', 'Noida', 'Chandigarh', 'Kolkata', 'Bhubaneswar', 'Nagpur'] },
  { name: 'Cognizant', website: 'https://www.cognizant.com', scale: 'mnc', cities: ['Chennai', 'Bengaluru', 'Pune', 'Hyderabad', 'Kolkata', 'Kochi', 'Coimbatore', 'Noida', 'Gurugram', 'Mangalore'] },
  { name: 'Accenture', website: 'https://www.accenture.com', scale: 'mnc', cities: ['Bengaluru', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai', 'Gurugram', 'Noida', 'Kolkata', 'Indore', 'Jaipur'] },
  { name: 'IBM India', website: 'https://www.ibm.com/in-en', scale: 'mnc', cities: ['Bengaluru', 'Pune', 'Gurugram', 'Noida', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'] },
  { name: 'Capgemini', website: 'https://www.capgemini.com', scale: 'mnc', cities: ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Noida', 'Gurugram', 'Kolkata', 'Bhubaneswar', 'Gandhinagar', 'Salem'] },
  { name: 'BrowserStack', website: 'https://www.browserstack.com', scale: 'mid', cities: ['Mumbai', 'Bengaluru', 'Pune', 'Noida'] },
  { name: 'Zoho', website: 'https://www.zoho.com', scale: 'big', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tenkasi'] },
  { name: 'Zerodha', website: 'https://zerodha.com', scale: 'startup', cities: ['Bengaluru', 'Pune'] },
  { name: 'Razorpay', website: 'https://razorpay.com', scale: 'startup', cities: ['Bengaluru'] },
  { name: 'Swiggy Tech', website: 'https://www.swiggy.com', scale: 'startup', cities: ['Bengaluru', 'Gurugram'] },
  { name: 'Zomato Tech', website: 'https://www.zomato.com', scale: 'startup', cities: ['Gurugram', 'Delhi', 'Bengaluru'] },
  { name: 'Paytm', website: 'https://paytm.com', scale: 'startup', cities: ['Noida', 'Bengaluru', 'Mumbai', 'Chennai'] },
  { name: 'Cred', website: 'https://cred.club', scale: 'startup', cities: ['Bengaluru'] },
  { name: 'Postman', website: 'https://www.postman.com', scale: 'mid', cities: ['Bengaluru'] },
  { name: 'Freshworks', website: 'https://www.freshworks.com', scale: 'big', cities: ['Chennai', 'Bengaluru', 'Hyderabad'] },
  { name: 'LTIMindtree', website: 'https://www.ltimindtree.com', scale: 'mnc', cities: ['Mumbai', 'Pune', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata'] },
  { name: 'Coforge', website: 'https://www.coforge.com', scale: 'big', cities: ['Greater Noida', 'Pune', 'Hyderabad', 'Bengaluru', 'Kolkata'] },
  { name: 'Persistent Systems', website: 'https://www.persistent.com', scale: 'big', cities: ['Pune', 'Nagpur', 'Bengaluru', 'Hyderabad', 'Goa'] },
  { name: 'KPIT Technologies', website: 'https://www.kpit.com', scale: 'mid', cities: ['Pune', 'Bengaluru'] },
  { name: 'Cybage', website: 'https://www.cybage.com', scale: 'mid', cities: ['Pune', 'Hyderabad', 'Gandhinagar'] },
  { name: 'Nykaa', website: 'https://www.nykaa.com', scale: 'startup', cities: ['Mumbai', 'Gurugram', 'Bengaluru'] },
  { name: 'Dream11', website: 'https://www.dream11.com', scale: 'startup', cities: ['Mumbai', 'Pune'] },
  { name: 'PolicyBazaar', website: 'https://www.policybazaar.com', scale: 'startup', cities: ['Gurugram', 'Bengaluru'] },
  { name: 'Oracle India', website: 'https://www.oracle.com/in/', scale: 'mnc', cities: ['Bengaluru', 'Hyderabad', 'Pune', 'Noida', 'Mumbai', 'Chennai'] },
  { name: 'Microsoft India', website: 'https://www.microsoft.com/en-in', scale: 'mnc', cities: ['Hyderabad', 'Bengaluru', 'Noida', 'Pune'] },
  { name: 'Google India', website: 'https://about.google/intl/en-in/', scale: 'mnc', cities: ['Hyderabad', 'Bengaluru', 'Gurugram', 'Pune'] },
  { name: 'Amazon India', website: 'https://www.amazon.jobs/en/locations/india', scale: 'mnc', cities: ['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Gurugram'] },
  { name: 'Lenskart', website: 'https://www.lenskart.com', scale: 'startup', cities: ['Gurugram', 'Delhi', 'Bengaluru'] },
  { name: 'Groww', website: 'https://groww.in', scale: 'startup', cities: ['Bengaluru'] },
  { name: 'Upstox', website: 'https://upstox.com', scale: 'startup', cities: ['Mumbai', 'Bengaluru'] },
  { name: 'Meesho', website: 'https://meesho.com', scale: 'startup', cities: ['Bengaluru'] },
  { name: 'ShareChat', website: 'https://sharechat.com', scale: 'startup', cities: ['Bengaluru'] },
  { name: 'Udaan', website: 'https://udaan.com', scale: 'startup', cities: ['Bengaluru'] },
  { name: 'Pine Labs', website: 'https://www.pinelabs.com', scale: 'startup', cities: ['Noida', 'Bengaluru', 'Mumbai'] },
  { name: 'Tata Elxsi', website: 'https://www.tataelxsi.com', scale: 'mid', cities: ['Bengaluru', 'Thiruvananthapuram', 'Chennai', 'Pune'] },
  { name: 'Mphasis', website: 'https://www.mphasis.com', scale: 'big', cities: ['Bengaluru', 'Chennai', 'Pune', 'Mumbai', 'Indore'] },
  { name: 'Mindtree', website: 'https://www.mindtree.com', scale: 'big', cities: ['Bengaluru', 'Chennai', 'Pune', 'Hyderabad', 'Bhubaneswar'] },
  { name: 'Hexaware Technologies', website: 'https://www.hexaware.com', scale: 'big', cities: ['Mumbai', 'Chennai', 'Pune', 'Bengaluru'] },
  { name: 'Zensar Technologies', website: 'https://www.zensar.com', scale: 'big', cities: ['Pune', 'Hyderabad', 'Bengaluru'] },
  { name: 'Birlasoft', website: 'https://www.birlasoft.com', scale: 'mid', cities: ['Noida', 'Pune', 'Bengaluru', 'Hyderabad'] },
  { name: 'Sonata Software', website: 'https://www.sonata-software.com', scale: 'mid', cities: ['Bengaluru', 'Hyderabad', 'Chennai'] },
  { name: 'Fractal Analytics', website: 'https://www.fractal.ai', scale: 'mid', cities: ['Mumbai', 'Bengaluru', 'Gurugram', 'Pune'] },
  { name: 'Mu Sigma', website: 'https://www.mu-sigma.com', scale: 'mid', cities: ['Bengaluru'] },
  { name: 'Ola Electric', website: 'https://olaelectric.com', scale: 'startup', cities: ['Bengaluru'] },
  { name: 'Oyo Rooms', website: 'https://www.oyorooms.com', scale: 'startup', cities: ['Gurugram'] }
];

// Fallback generic companies for cities that don't naturally have enough top-tier companies mapped above
const generateLocalCompanies = (cityName, tier) => {
  const localCompanies = [];
  const count = tier === '1' ? 10 : (tier === '2' ? 15 : 20); // Add more local companies to smaller cities
  
  const prefixes = ["Tech", "Info", "Data", "Cloud", "Cyber", "Web", "App", "Next", "Smart", "Global", "Net", "Quantum", "Alpha", "Beta", "Core", "Prime", "Apex"];
  const suffixes = ["Solutions", "Systems", "Technologies", "Labs", "Soft", "Works", "Dynamics", "Matrix", "Networks", "Consulting", "Innovations", "Corp", "Group"];
  
  for (let i = 0; i < count; i++) {
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const s = suffixes[Math.floor(Math.random() * suffixes.length)];
    const name = `${p} ${s} ${cityName}`;
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    localCompanies.push({
      name: name,
      website: `https://www.${cleanName}.com`,
      scale: ['small', 'startup', 'mid'][Math.floor(Math.random() * 3)],
      isLocal: true
    });
  }
  return localCompanies;
};

const techStacksPool = ["React", "Node.js", "MongoDB", "Python", "Java", "C++", "AWS", "Azure", "Docker", "Kubernetes", "Angular", "Vue", "Go", "Rust"];

const generateData = async () => {
  try {
    await connectDB();
    
    console.log("Wiping existing companies...");
    await Company.deleteMany({});
    
    const cities = await City.find({});
    let totalInserted = 0;

    for (const city of cities) {
      const companiesToInsert = [];
      
      // 1. Find exact matches from our real companies list
      const matchedCompanies = companyData.filter(c => c.cities.includes(city.name));
      
      // 2. Generate some realistic local companies to fill out the ecosystem
      const localCompanies = generateLocalCompanies(city.name, city.tier);
      
      const allCityCompanies = [...matchedCompanies, ...localCompanies];

      for (let i = 0; i < allCityCompanies.length; i++) {
        const comp = allCityCompanies[i];
        const cleanName = comp.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const slug = `${cleanName}-${city.slug}-${i}`; // guarantee uniqueness
        
        const stack = [];
        const numSkills = Math.floor(Math.random() * 4) + 2;
        while (stack.length < numSkills) {
          const skill = techStacksPool[Math.floor(Math.random() * techStacksPool.length)];
          if (!stack.includes(skill)) stack.push(skill);
        }

        companiesToInsert.push({
          name: comp.name,
          slug: slug,
          cityId: city._id,
          location: {
            city: city.name,
            state: city.state,
            country: 'India',
            address: comp.isLocal ? `Local IT Park, ${city.name}` : `Major IT Park, ${city.name}`
          },
          scale: comp.scale,
          employeeCount: comp.isLocal ? Math.floor(Math.random() * 200) + 10 : Math.floor(Math.random() * 5000) + 500,
          ratings: {
            overall: (Math.random() * 1.5 + 3.5).toFixed(1),
            glassdoor: (Math.random() * 1.5 + 3.5).toFixed(1)
          },
          techStack: stack,
          description: comp.isLocal ? `Local tech agency based in ${city.name}.` : `Established technology firm operating in ${city.name}.`,
          website: comp.website,
          email: `contact@${cleanName}.com`,
          isActive: true,
          verified: !comp.isLocal
        });
      }

      await Company.insertMany(companiesToInsert);
      totalInserted += companiesToInsert.length;
      
      // Update city stats
      const stats = await Company.aggregate([
        { $match: { "location.city": city.name, isActive: true } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            avgRating: { $avg: "$ratings.overall" }
          }
        }
      ]);
      
      if (stats.length > 0) {
        await City.updateOne(
          { _id: city._id },
          { $set: { totalCompanies: stats[0].total, avgRating: parseFloat(stats[0].avgRating.toFixed(1)) } }
        );
      } else {
        await City.updateOne({ _id: city._id }, { $set: { totalCompanies: 0, avgRating: 0 } });
      }
    }

    console.log(`Successfully seeded accurately mapped companies across all cities! (Total: ${totalInserted})`);
    process.exit(0);
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
};

generateData();
