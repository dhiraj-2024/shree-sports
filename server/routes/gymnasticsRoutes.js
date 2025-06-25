// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/routes/gymnasticsRoutes.js

const express = require("express");
const {
  submitGymnasticsForm,
  getAllGymnasticsRegistrations,
  getGymnasticsCount,
  getMonthlyCount,
  getDailyCount,
} = require("../controllers/gymnasticsController");

const router = express.Router();

router.post("/submit", submitGymnasticsForm);
router.get("/", getAllGymnasticsRegistrations);
router.get("/count", getGymnasticsCount);
router.get("/monthly-count", getMonthlyCount);
router.get("/daily-count", getDailyCount);
module.exports = router;




