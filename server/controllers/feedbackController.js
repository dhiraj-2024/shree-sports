const Feedback = require("../models/Feedback");

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public
exports.submitFeedback = async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    const feedback = new Feedback({
      name,
      message,
      rating,
      status: "pending",
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all feedback (admin)
// @route   GET /api/feedback
// @access  Private/Admin
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort("-createdAt");
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get approved feedback for display
// @route   GET /api/feedback/approved
// @access  Public
exports.getApprovedFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ status: "approved" })
      .sort("-createdAt")
      .limit(4);
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update feedback status
// @route   PUT /api/feedback/:id
// @access  Private/Admin
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    feedback.status = status;
    const updatedFeedback = await feedback.save();

    res.json(updatedFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private/Admin
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    await feedback.remove();
    res.json({ message: "Feedback removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
