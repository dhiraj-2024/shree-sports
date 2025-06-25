// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const gymnasticsRoutes = require("./routes/gymnasticsRoutes");
const adultFitnessRoutes = require("./routes/adultFitnessRoutes");
const contactRoutes = require("./routes/contactRoutes");
const newsRoutes = require("./routes/newsRoutes");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Explicit OPTIONS handler
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", corsOptions.origin);
  res.header("Access-Control-Allow-Methods", corsOptions.methods.join(","));
  res.header(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(",")
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).send();
});

// Database connection
connectDB();

// Routes
app.use("/api/gymnastics", gymnasticsRoutes);
app.use("/api/adult-fitness", adultFitnessRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/news", newsRoutes);


// for admin
// Add these routes after your existing routes
app.get('/api/gymnastics/count', async (req, res) => {
  try {
    const count = await Gymnastics.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/adult-fitness/count', async (req, res) => {
  try {
    const count = await AdultFitness.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/contact/count', async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS-enabled for origin: ${corsOptions.origin}`);
});
