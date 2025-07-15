import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBirthdayCake,
  FaSchool,
  FaCalendarAlt,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const GymnasticsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [showJoiningCalendar, setShowJoiningCalendar] = useState(false);
  const [showDobCalendar, setShowDobCalendar] = useState(false);

  // Watch the dob field
  const dob = watch("dob");

  // Calculate age from date of birth
  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;

    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Update age whenever dob changes
  useEffect(() => {
    if (dob) {
      const calculatedAge = calculateAge(dob);
      setValue("age", calculatedAge);
    }
  }, [dob, setValue]);

  // Color scheme
  const colors = {
    primary: "#7979ff",
    secondary: "#7f48f9",
    light: "#E6F0FF",
    dark: "#2C3E50",
    white: "#FFFFFF",
  };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/gymnastics/submit`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert(response.data.message || "Registration Successful!");
      reset();
    } catch (err) {
      console.error("Full error:", err);
      alert(`Submission Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDateChange = (date, field) => {
    const formattedDate = date.toISOString().split("T")[0];
    setValue(field, formattedDate);
    if (field === "joiningDate") setShowJoiningCalendar(false);
    if (field === "dob") setShowDobCalendar(false);
  };

  // Phone number validation
  const validatePhone = (value) => {
    return /^[0-9]{10}$/.test(value) || "Phone number must be 10 digits";
  };

  // Aadhar validation
  const validateAadhar = (value) => {
    return /^[0-9]{12}$/.test(value) || "Aadhar must be 12 digits";
  };

  // Email validation
  const validateEmail = (value) => {
    return (
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
      "Invalid email address"
    );
  };

  return (
    <div
      className="max-w-3xl mx-auto  rounded-xl mt-10 shadow-lg"
      style={{ backgroundColor: colors.light }}
    >
      <h2
        className="text-2xl font-bold text-center mb-6 py-2 rounded-lg"
        style={{ color: colors.black, backgroundColor: colors.primary }}
      >
        Gymnastics Class Registration
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 rounded-lg"
        style={{ backgroundColor: colors.white }}
      >
        {/* Name */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            <FaUser className="inline mr-2" />
            Name of Gymnast
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Date of Joining */}
        <div className="relative">
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            <FaCalendarAlt className="inline mr-2" />
            Date of Joining
          </label>
          <div className="flex">
            <input
              type="text"
              {...register("joiningDate", {
                required: "Joining date is required",
              })}
              readOnly
              onClick={() => setShowJoiningCalendar(!showJoiningCalendar)}
              className={`w-full p-2 border rounded-l focus:outline-none ${
                errors.joiningDate ? "border-red-500" : "border-gray-300"
              }`}
              style={{ borderColor: colors.secondary }}
            />
            <button
              type="button"
              onClick={() => setShowJoiningCalendar(!showJoiningCalendar)}
              className="px-3 rounded-r"
              style={{ backgroundColor: colors.secondary, color: colors.white }}
            >
              <FaCalendarAlt />
            </button>
          </div>
          {showJoiningCalendar && (
            <div className="absolute z-10 mt-1">
              <Calendar
                onChange={(date) => handleDateChange(date, "joiningDate")}
                value={
                  watch("joiningDate")
                    ? new Date(watch("joiningDate"))
                    : new Date()
                }
                className="border rounded shadow-lg p-4 -mr-10 "
              />
            </div>
          )}
          {errors.joiningDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.joiningDate.message}
            </p>
          )}
        </div>

        {/* DOB */}
        <div className="relative">
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            <FaBirthdayCake className="inline mr-2" />
            Date of Birth
          </label>
          <div className="flex">
            <input
              type="text"
              {...register("dob", { required: "Date of birth is required" })}
              readOnly
              onClick={() => setShowDobCalendar(!showDobCalendar)}
              className={`w-full p-2 border rounded-l focus:outline-none ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
              style={{ borderColor: colors.secondary }}
            />
            <button
              type="button"
              onClick={() => setShowDobCalendar(!showDobCalendar)}
              className="px-3 rounded-r"
              style={{ backgroundColor: colors.secondary, color: colors.white }}
            >
              <FaCalendarAlt />
            </button>
          </div>
          {showDobCalendar && (
            <div className="absolute z-10 mt-1">
              <Calendar
                onChange={(date) => handleDateChange(date, "dob")}
                value={watch("dob") ? new Date(watch("dob")) : new Date()}
                maxDate={new Date()}
                className="border rounded shadow-lg p-4 -mr-10"
              />
            </div>
          )}
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Age
          </label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 3, message: "Minimum age is 3" },
              max: { value: 18, message: "Maximum age is 18" },
            })}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.age
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Gender
          </label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.gender
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            <FaPhone className="inline mr-2" />
            Mobile Number
          </label>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              validate: validatePhone,
            })}
            maxLength="10"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.mobile
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            <FaEnvelope className="inline mr-2" />
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              validate: validateEmail,
            })}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Address
          </label>
          <textarea
            {...register("address", { required: "Address is required" })}
            rows="3"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Guardian's Name */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Guardian's Name
          </label>
          <input
            type="text"
            {...register("guardianName", {
              required: "Guardian name is required",
            })}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.guardianName
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          />
          {errors.guardianName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.guardianName.message}
            </p>
          )}
        </div>

        {/* Emergency Contact */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Emergency Contact
          </label>
          <input
            type="tel"
            {...register("emergencyContact", {
              required: "Emergency contact is required",
              validate: validatePhone,
            })}
            maxLength="10"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.emergencyContact
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          />
          {errors.emergencyContact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.emergencyContact.message}
            </p>
          )}
        </div>

        {/* Class Type */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Class Type
          </label>
          <select
            {...register("classType", { required: "Class type is required" })}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.classType
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          >
            <option value="">Select Class</option>
            <option value="Beginner">Beginner</option>
            {/* <option value="Competitive">Competitive</option> */}
            <option value="Toddler">Toddler</option>
          </select>
          {errors.classType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classType.message}
            </p>
          )}
        </div>

        {/* Class Days */}
        <div>
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Class Days
          </label>
          <select
            {...register("classDays", { required: "Class days are required" })}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.classDays
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          >
            <option value="">Select Days</option>
            <option value="6 Days">6 Days</option>
            <option value="3 Days (Mon/Wed/Fri)">3 Days (Mon/Wed/Fri)</option>
            <option value="3 Days (Tue/Thu/Sat)">3 Days (Tue/Thu/Sat)</option>
            <option value="Toddler (Tue/Thu/Sat)">Toddler (Tue/Thu/Sat)</option>
          </select>
          {errors.classDays && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classDays.message}
            </p>
          )}
        </div>

        {/* School Name */}
        <div className="md:col-span-2">
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            <FaSchool className="inline mr-2" />
            School Name
          </label>
          <input
            type="text"
            {...register("schoolName")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
            style={{ borderColor: colors.secondary }}
          />
        </div>

        {/* Medical Conditions */}
        <div className="md:col-span-2">
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Medical Conditions
          </label>
          <textarea
            {...register("medicalConditions")}
            rows="3"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
            style={{ borderColor: colors.secondary }}
          ></textarea>
        </div>

        {/* Aadhar */}
        <div className="md:col-span-2">
          <label
            className="block mb-1 font-medium"
            style={{ color: colors.dark }}
          >
            Aadhar Number
          </label>
          <input
            type="text"
            {...register("aadharNumber", {
              required: "Aadhar number is required",
              validate: validateAadhar,
            })}
            maxLength="12"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.aadharNumber
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            style={{ borderColor: colors.secondary }}
          />
          {errors.aadharNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.aadharNumber.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg font-bold transition-colors duration-300"
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              ":hover": { backgroundColor: colors.secondary },
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = colors.secondary)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = colors.primary)
            }
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default GymnasticsForm;
