// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/routes/newsRoutes.js
const express = require('express');
const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  getFeaturedNews,
  getNewsStats
} = require('../controllers/newsController');

const router = express.Router();

// Public routes
router.get('/', getAllNews);
router.get('/featured', getFeaturedNews);
router.get('/:id', getNewsById);
router.get('/stats', getNewsStats);

// Admin routes
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;