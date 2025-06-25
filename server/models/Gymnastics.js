// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/models/Gymnastics.js
const mongoose = require("mongoose");

const GymnasticsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    guardianName: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    classType: { type: String, required: true },
    classDays: { type: String, required: true },
    schoolName: { type: String },
    medicalConditions: { type: String },
    aadharNumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gymnastics", GymnasticsSchema);
