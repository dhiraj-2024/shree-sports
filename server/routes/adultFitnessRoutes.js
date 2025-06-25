// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/routes/adultFitnessRoutes.js
const express = require("express");
const {
  submitAdultFitnessForm,
  getAllAdultFitnessRegistrations,
  getAdultFitnessCount,
  getMonthlyAdultFitnessCount,
  getDailyAdultFitnessCount,
} = require("../controllers/adultFitnessController");

const router = express.Router();

router.post("/submit", submitAdultFitnessForm);
router.get("/", getAllAdultFitnessRegistrations);
router.get("/count", getAdultFitnessCount);
router.get("/monthly-count", getMonthlyAdultFitnessCount);
router.get("/daily-count", getDailyAdultFitnessCount);
module.exports = router;
