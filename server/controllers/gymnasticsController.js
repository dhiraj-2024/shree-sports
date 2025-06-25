// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/controllers/gymnasticsController.js
// gymnasticsController.js
const Gymnastics = require("../models/Gymnastics");

exports.submitGymnasticsForm = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    // Convert string dates to Date objects
    const formData = {
      ...req.body,
      joiningDate: new Date(req.body.joiningDate),
      dob: new Date(req.body.dob),
      age: parseInt(req.body.age),
    };

    // Validate required fields
    const requiredFields = [
      "name",
      "joiningDate",
      "dob",
      "age",
      "gender",
      "mobile",
      "email",
      "address",
      "guardianName",
      "emergencyContact",
      "classType",
      "classDays",
      "aadharNumber",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({
          success: false,
          error: `${field} is required`,
        });
      }
    }

    const newEntry = await Gymnastics.create(formData);

    console.log("New entry created:", newEntry); // Log the created document

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


exports.getAllGymnasticsRegistrations = async (req, res) => {
  try {
    const registrations = await Gymnastics.find().sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch registrations",
    });
  }
};

exports.getGymnasticsCount = async (req, res) => {
  try {
    const count = await Gymnastics.countDocuments();
    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    console.error("Error counting registrations:", err);
    res.status(500).json({
      success: false,
      error: "Failed to get count",
    });
  }
};
exports.getMonthlyCount = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const count = await Gymnastics.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    res.status(200).json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getDailyCount = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const count = await Gymnastics.countDocuments({
      createdAt: { $gte: startOfDay },
    });

    res.status(200).json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};