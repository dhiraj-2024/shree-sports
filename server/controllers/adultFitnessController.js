// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/controllers/adultFitnessController.js
const AdultFitness = require("../models/AdultFitness");

exports.submitAdultFitnessForm = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    // Add CORS headers to response
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_BASE_URL || "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");

    // Validate selected days
    if (!req.body.selectedDays || req.body.selectedDays.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one day must be selected",
      });
    }

    const newEntry = await AdultFitness.create(req.body);

    res.status(201).json({
      success: true,
      data: newEntry,
      message: "Registration successful",
    });
  } catch (err) {
    console.error("Error in submission:", err);
    res.status(400).json({
      success: false,
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};


exports.getAllAdultFitnessRegistrations = async (req, res) => {
  try {
    const registrations = await AdultFitness.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: registrations,
    });
  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getAdultFitnessCount = async (req, res) => {
  try {
    const count = await AdultFitness.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Error counting registrations:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMonthlyAdultFitnessCount = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const count = await AdultFitness.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    res.json({ count });
  } catch (err) {
    console.error("Error counting monthly registrations:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDailyAdultFitnessCount = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const count = await AdultFitness.countDocuments({
      createdAt: { $gte: startOfDay },
    });
    res.json({ count });
  } catch (err) {
    console.error("Error counting daily registrations:", err);
    res.status(500).json({ error: err.message });
  }
};