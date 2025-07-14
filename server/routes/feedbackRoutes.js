// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/routes/feedbackRoutes.js
const express = require("express");
const {
  submitFeedback,
  getAllFeedback,
  getApprovedFeedback,
  updateFeedbackStatus,
  deleteFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

// Public route for submitting feedback
router.route("/").post(submitFeedback);

// Get all feedback (now unprotected)
router.route("/").get(getAllFeedback);

// Get only approved feedback (public)
router.route("/approved").get(getApprovedFeedback);

// Feedback management routes (now unprotected)
router.route("/:id").put(updateFeedbackStatus).delete(deleteFeedback);

module.exports = router;
