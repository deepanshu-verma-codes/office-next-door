const Company = require('../models/Company');
const City = require('../models/City');
const axios = require('axios');

exports.submitCompany = async (req, res) => {
  try {
    const { name, website, cityName, scale, companyType, email } = req.body;

    // 1. Basic validation
    if (!name || !website || !cityName || !email) {
      return res.status(400).json({ message: 'Name, website, email and city are required' });
    }

    // 2. City validation
    const city = await City.findOne({ name: new RegExp('^' + cityName + '$', 'i') });
    if (!city) {
      return res.status(400).json({ message: 'City not supported or invalid' });
    }

    // 3. Duplicate check
    const existing = await Company.findOne({ 
      name: new RegExp('^' + name + '$', 'i'),
      cityId: city._id
    });
    if (existing) {
      return res.status(400).json({ message: 'Company already exists in this city' });
    }

    // 4. Live Verification (Axios)
    let isVerified = false;
    try {
      // Add https if missing
      const url = website.startsWith('http') ? website : `https://${website}`;
      
      // Ping the website to ensure it's a real live company domain
      const response = await axios.get(url, { timeout: 5000 });
      if (response.status >= 200 && response.status < 400) {
        isVerified = true;
      }
    } catch (err) {
      return res.status(400).json({ 
        message: 'Website verification failed. Please ensure the URL is active and reachable.',
        error: err.message
      });
    }

    if (!isVerified) {
      return res.status(400).json({ message: 'Could not verify the company website.' });
    }

    // 5. Add to DB
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const slug = `${cleanName}-${city.slug}-${Date.now()}`;
    
    const scaleRankMap = { 'mnc': 1, 'big': 2, 'mid': 3, 'small': 4, 'startup': 5 };
    const scaleRank = scaleRankMap[scale?.toLowerCase()] || 6;

    const company = new Company({
      name,
      slug,
      cityId: city._id,
      location: {
        city: city.name,
        state: city.state,
        country: 'India',
        address: city.name // Placeholder
      },
      scale: scale || 'startup',
      scaleRank,
      employeeCount: 50,
      ratings: { overall: 0, glassdoor: 0 },
      companyType: companyType || 'Service Based',
      email,
      description: 'Community submitted company.',
      website: website.startsWith('http') ? website : `https://${website}`,
      isActive: true,
      verified: true // Verified via our live Axios ping
    });

    await company.save();

    // Increment city count
    await City.updateOne({ _id: city._id }, { $inc: { totalCompanies: 1 } });

    res.status(201).json({ message: 'Company verified and added successfully!', company });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Server error during submission' });
  }
};
