// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/routes/newsRoutes.js
const express = require("express");
const {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews,
    getFeaturedNews,
} = require("../controllers/newsController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getAllNews).post(protect, admin, createNews);

router.route("/featured").get(getFeaturedNews);

router
    .route("/:id")
    .get(getNewsById)
    .put(protect, admin, updateNews)
    .delete(protect, admin, deleteNews);

module.exports = router;
