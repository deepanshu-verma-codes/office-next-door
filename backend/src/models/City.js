const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  state: String,
  country: String,
  tier: {
    type: String,
    enum: ['1', '2', '3'],
  },
  totalCompanies: {
    type: Number,
    default: 0
  },
  companyBreakdown: {
    mnc: { type: Number, default: 0 },
    big: { type: Number, default: 0 },
    mid: { type: Number, default: 0 },
    small: { type: Number, default: 0 }
  },
  avgRating: {
    type: Number,
    default: 0
  },
  topTechStacks: [String],
  coordinates: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

// Create indexes
citySchema.index({ name: 1 }, { unique: true });
citySchema.index({ tier: 1 });
citySchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('City', citySchema);
