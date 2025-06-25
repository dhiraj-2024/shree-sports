// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/controllers/contactController.js
const Contact = require("../models/Contact");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Create new contact entry
    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
      status: "new",
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      data: newContact,
      message: "Contact form submitted successfully",
    });
  } catch (err) {
    console.error("Error submitting contact form:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getContactCount = async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Error counting contacts:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMonthlyContactCount = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const count = await Contact.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    res.json({ count });
  } catch (err) {
    console.error("Error counting monthly contacts:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDailyContactCount = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const count = await Contact.countDocuments({
      createdAt: { $gte: startOfDay },
    });
    res.json({ count });
  } catch (err) {
    console.error("Error counting daily contacts:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status value",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }

    res.json({
      success: true,
      data: updatedContact,
    });
  } catch (err) {
    console.error("Error updating contact status:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};