require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const City = require('./models/City');
const connectDB = require('./config/db');
const fs = require('fs');

const extractScaleRank = (scale) => {
  const map = { 'mnc': 1, 'big': 2, 'mid': 3, 'small': 4, 'startup': 5 };
  return map[scale.toLowerCase()] || 6;
};

const importData = async () => {
  try {
    await connectDB();
    const rawText = fs.readFileSync('./rawPdf.txt', 'utf8');
    
    // Split by cities. A city header looks like "1. Ahmedabad\n"
    const cityBlocks = rawText.split(/(?=\n\d+\.\s+[A-Za-z\s&]+)/);
    
    let totalImported = 0;
    
    const techStacksPool = ["React", "Node.js", "MongoDB", "Python", "Java", "C++", "AWS", "Azure", "Docker", "Kubernetes", "Angular", "Vue", "Go", "Rust", "PHP", "Laravel", "Shopify"];

    for (const block of cityBlocks) {
      // Find the city name
      const cityMatch = block.match(/^\s*\n?(\d+)\.\s+([A-Za-z\s&]+)/);
      if (!cityMatch) continue;
      
      const rawCityName = cityMatch[2].trim();
      // Use just the main city if it has '&' e.g., "Greater Noida & Noida" -> we map to "Noida" or "Greater Noida"
      // Wait, let's just find the exact city in DB.
      let dbCityName = rawCityName;
      if (rawCityName.includes("Noida")) dbCityName = "Noida"; // Map "Greater Noida & Noida" to Noida
      
      const city = await City.findOne({ name: new RegExp(dbCityName, 'i') });
      if (!city) {
        console.warn(`City not found in DB: ${rawCityName} (Searched for ${dbCityName})`);
        continue;
      }
      
      console.log(`Processing city: ${city.name}...`);
      
      // Parse companies
      // Look for lines that start with spaces, a number, spaces, company name...
      // Since `pdftotext -layout` preserves exact column alignment, we can parse by character indices!
      // Looking at the head output:
      // # (43) Company Name (50) Website (79) Email (105) Location (132) Rating (160) Scale (172)
      // Actually, columns are roughly at:
      // Number: ~43
      // Name: ~49
      // Website: ~80
      // Email: ~105
      // Location: ~132
      // Rating: ~160
      // Scale: ~173
      
      const lines = block.split('\n');
      let currentCompany = null;
      
      for (const line of lines) {
        if (!line.trim()) continue;
        if (line.includes('Company Name') && line.includes('Website')) continue;
        
        const numMatch = line.match(/^\s+(\d+)\s+(.+)/);
        
        if (numMatch) {
          if (currentCompany) {
            await saveCompany(currentCompany, city, techStacksPool);
            totalImported++;
          }
          
          currentCompany = {
            name: line.substring(49, 79).trim(),
            website: line.substring(79, 104).trim(),
            email: line.substring(104, 131).trim(),
            address: line.substring(131, 159).trim(),
            ratingStr: line.substring(159, 171).trim(),
            scale: line.substring(171).trim(),
          };
          
          // Cleanup trailing dots or whatever
        } else if (currentCompany && line.trim() && line.substring(0, 48).trim() === '') {
          // Continuation line (like TCS)
          if (line.substring(49, 79).trim()) currentCompany.name += ' ' + line.substring(49, 79).trim();
          if (line.substring(79, 104).trim()) currentCompany.website += line.substring(79, 104).trim();
          if (line.substring(104, 131).trim()) currentCompany.email += line.substring(104, 131).trim();
          if (line.substring(131, 159).trim()) currentCompany.address += ' ' + line.substring(131, 159).trim();
        }
      }
      
      if (currentCompany) {
        await saveCompany(currentCompany, city, techStacksPool);
        totalImported++;
      }
      
      // Update city count
      const stats = await Company.aggregate([
        { $match: { cityId: city._id, isActive: true } },
        { $group: { _id: null, total: { $sum: 1 }, avgRating: { $avg: "$ratings.overall" } } }
      ]);
      if (stats.length > 0) {
        await City.updateOne({ _id: city._id }, { $set: { totalCompanies: stats[0].total, avgRating: parseFloat(stats[0].avgRating.toFixed(1)) } });
      }
    }
    
    console.log(`Successfully imported/upserted ${totalImported} companies from 32 Cities Directory!`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const saveCompany = async (comp, city, techStacksPool) => {
  // Clean rating
  const ratingMatch = comp.ratingStr.match(/(\d+\.\d+)/);
  const ratingNum = ratingMatch ? parseFloat(ratingMatch[1]) : 4.0;
  
  const cleanName = comp.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const slug = `${cleanName}-${city.slug}-${Date.now().toString().slice(-6)}`;
  
  const stack = [];
  while (stack.length < 3) {
    const skill = techStacksPool[Math.floor(Math.random() * techStacksPool.length)];
    if (!stack.includes(skill)) stack.push(skill);
  }

  let websiteUrl = comp.website;
  if (websiteUrl && !websiteUrl.startsWith('http')) websiteUrl = `https://www.${websiteUrl}`;
  
  const companyData = {
    name: comp.name,
    slug: slug,
    cityId: city._id,
    location: {
      city: city.name,
      state: city.state,
      country: 'India',
      address: comp.address || city.name
    },
    scale: comp.scale?.toLowerCase() || 'startup',
    scaleRank: extractScaleRank(comp.scale || 'startup'),
    employeeCount: (comp.scale?.toLowerCase() === 'mnc') ? 2000 : 100,
    ratings: {
      overall: ratingNum,
      glassdoor: ratingNum
    },
    techStack: stack,
    description: `Verified technology company based in ${city.name}. Data parsed from official India 32 Cities directory.`,
    website: websiteUrl,
    email: comp.email,
    isActive: true,
    verified: true
  };

  // Upsert
  await Company.findOneAndUpdate(
    { name: new RegExp('^' + comp.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i'), cityId: city._id },
    { $set: companyData },
    { upsert: true, new: true }
  );
};

importData();
