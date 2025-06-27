// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/controllers/newsController.js
const News = require('../models/News');
const { validationResult } = require('express-validator');

// Create new news
exports.createNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const news = new News(req.body);
    await news.save();
    res.status(201).json({ success: true, data: news });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all news (paginated)
exports.getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      News.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      News.countDocuments()
    ]);

    res.json({
      success: true,
      data: news,
      pages: Math.ceil(total / limit),
      page,
      total
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get featured news
exports.getFeaturedNews = async (req, res) => {
  try {
    const featuredNews = await News.find({ isFeatured: true, status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(3);
    res.json({ success: true, data: featuredNews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single news by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, error: 'News not found' });
    }
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update news
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!news) {
      return res.status(404).json({ success: false, error: 'News not found' });
    }
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete news
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, error: 'News not found' });
    }
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get news statistics
exports.getNewsStats = async (req, res) => {
  try {
    const stats = await News.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};