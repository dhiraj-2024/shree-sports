// /Users/rajputdhiraj/Desktop/shree-sports-academy/server/models/AdultFitness.js
const mongoose = require("mongoose");

const AdultFitnessSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Minimum age is 18"],
      max: [70, "Maximum age is 70"],
    },
    dob: { type: Date, required: [true, "Date of birth is required"] },
    joiningDate: { type: Date, required: [true, "Joining date is required"] },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    mobile: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    address: { type: String, required: [true, "Address is required"] },
    selectedDays: {
      type: [String],
      required: [true, "At least one day must be selected"],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one day must be selected",
      },
    },
    aadharNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{12}/.test(v);
        },
        message: (props) => `${props.value} is not a valid Aadhar number!`,
      },
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

module.exports = mongoose.model("AdultFitness", AdultFitnessSchema);