const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // ✅ Make sure the path is correct
require("dotenv").config(); // ✅ Load environment variables from .env file

async function recreateAdmin() {
  try {
    // ✅ Connect to MongoDB using MONGODB_URI from .env
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      name: "Dhiraj Rajput",
      email: "nashikexplore1@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin recreated with hashed password");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await mongoose.disconnect(); // ✅ Ensure disconnection is awaited
  }
}

recreateAdmin();
