const mongoose = require("mongoose");

const dealershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  colorScheme: { type: String },
  typography: { type: String },
  tagline: { type: String },
  missionStatement: { type: String },
  contact: {
    phone: { type: String },
    email: { type: String },
    address: { type: String },
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  hours: { type: String },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
  },
  whatsappNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

dealershipSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Dealership", dealershipSchema);
