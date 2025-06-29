const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  vehicleInterest: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  source: {
    type: String,
    enum: ["website", "whatsapp", "social"],
    default: "website",
  },
  status: {
    type: String,
    enum: ["new", "contacted", "closed"],
    default: "new",
  },
  dealership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealership",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lead", leadSchema);
