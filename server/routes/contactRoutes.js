// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/routes/contactRoutes.js
const express = require("express");
const {
  submitContactForm,
  getAllContacts,
  getContactCount,
  getMonthlyContactCount,
  getDailyContactCount,
  updateContactStatus,
} = require("../controllers/contactController");
const router = express.Router();

router.post("/submit", submitContactForm);
router.get("/", getAllContacts);
router.get("/count", getContactCount);
router.get("/monthly-count", getMonthlyContactCount);
router.get("/daily-count", getDailyContactCount);
router.put("/:id/status", updateContactStatus);

module.exports = router;
