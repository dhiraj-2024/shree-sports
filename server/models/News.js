// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/models/News.js
const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    imageUrl: {
      type: String,
      required: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      default: "Admin",
    },
    tags: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("News", NewsSchema);
