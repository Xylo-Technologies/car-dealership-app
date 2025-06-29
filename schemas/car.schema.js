const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  trim: { type: String },
  mileage: { type: Number },
  price: { type: Number, required: true },
  VIN: { type: String, unique: true, required: true },
  condition: {
    type: String,
    enum: ["new", "used", "certified"],
    required: true,
  },
  fuelType: { type: String },
  transmission: { type: String },
  engine: { type: String },
  drivetrain: { type: String },
  color: { type: String },
  features: [{ type: String }],
  images: [{ url: String, caption: String }],
  videos: [{ url: String }],
  status: {
    type: String,
    enum: ["Active", "Sold", "Reserved", "Pending"],
    default: "Active",
  },
  dealership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealership",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Car", carSchema);
