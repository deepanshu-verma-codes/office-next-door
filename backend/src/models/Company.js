const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  website: String,
  email: String,
  phone: String,
  
  location: {
    city: String,
    state: String,
    country: { type: String, default: 'India' },
    address: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  
  scale: {
    type: String,
    enum: ['mnc', 'big', 'mid', 'small', 'startup'],
    default: 'mid'
  },
  employeeCount: Number,
  
  ratings: {
    glassdoor: { type: Number, default: 0 },
    ambitionBox: { type: Number, default: 0 },
    goodFirms: { type: Number, default: 0 },
    justDial: { type: Number, default: 0 },
    google: { type: Number, default: 0 },
    overall: { type: Number, default: 0 }
  },
  
  description: String,
  companyType: {
    type: String,
    enum: ['Product Based', 'Service Based', 'Both'],
    default: 'Service Based'
  },
  services: [String],
  logoUrl: String,
  
  sources: [{
    name: String,
    url: String,
    lastScraped: Date
  }],
  
  isActive: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Indexes for performance (Step 6)
companySchema.index({ "location.city": 1, isActive: 1 });
companySchema.index({ scale: 1, "ratings.overall": -1 });
companySchema.index({ name: "text", "location.city": "text" }); 
companySchema.index({ slug: 1 }, { unique: true, sparse: true });
companySchema.index({ updatedAt: 1 });

module.exports = mongoose.model('Company', companySchema);
