const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [100, "Name cannot be more than 100 characters"],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Rating is required"],
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
