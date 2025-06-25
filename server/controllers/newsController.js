// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/controllers/newsController.js
const News = require("../models/News");

// @desc    Get all news
// @route   GET /api/news
// @access  Public
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({ status: "published" }).sort("-createdAt");
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get featured news
// @route   GET /api/news/featured
// @access  Public
exports.getFeaturedNews = async (req, res) => {
  try {
    const featuredNews = await News.find({
      status: "published",
      isFeatured: true,
    })
      .limit(3)
      .sort("-createdAt");
    res.json(featuredNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get single news item
// @route   GET /api/news/:id
// @access  Public
exports.getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);

    if (!newsItem || newsItem.status !== "published") {
      return res.status(404).json({ error: "News not found" });
    }

    res.json(newsItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private/Admin
exports.createNews = async (req, res) => {
  try {
    const { title, content, imageUrl, isFeatured, tags } = req.body;

    const newsItem = new News({
      title,
      content,
      imageUrl,
      isFeatured: isFeatured || false,
      tags: tags || [],
      author: req.user.name || "Admin",
    });

    const createdNews = await newsItem.save();
    res.status(201).json(createdNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private/Admin
exports.updateNews = async (req, res) => {
  try {
    const { title, content, imageUrl, isFeatured, tags, status } = req.body;

    const newsItem = await News.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ error: "News not found" });
    }

    newsItem.title = title || newsItem.title;
    newsItem.content = content || newsItem.content;
    newsItem.imageUrl = imageUrl || newsItem.imageUrl;
    newsItem.isFeatured = isFeatured || newsItem.isFeatured;
    newsItem.tags = tags || newsItem.tags;
    newsItem.status = status || newsItem.status;

    const updatedNews = await newsItem.save();
    res.json(updatedNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin
exports.deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ error: "News not found" });
    }

    await newsItem.remove();
    res.json({ message: "News removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
