// server/utils/createAdmin.js
const Admin = require("../models/Admin");

const createInitialAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({
      email: "rajputdhiraj1852@gmail.com",
    });

    if (!adminExists) {
      await Admin.create({
        name: "Dhiraj Rajput",
        email: "rajputdhiraj1852@gmail.com",
        password: "Admin@123",
        role: "admin",
      });
      console.log("Initial admin created successfully");
    }
  } catch (err) {
    console.error("Error creating initial admin:", err);
  }
};

module.exports = createInitialAdmin;
