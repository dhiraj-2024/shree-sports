import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";

const ContactUsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:8080/api/contact/submit", data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Color scheme
  const colors = {
    primary: "#FF6000", // Orange
    secondary: "#090040", // Dark blue (for accents)
    dark: "#000000", // Black
    light: "#FFFFFF", // White
    background: "#FFE6C7", // Light orange/cream
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-12 mt-4"
      style={{ backgroundColor: colors.background }}
    >
      <h2
        className="text-4xl font-bold text-center mb-12"
        style={{ color: colors.primary }}
      >
        GET IN TOUCH
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div
            className="p-8 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.light }}
          >
            <h3
              className="text-2xl font-bold mb-6 flex items-center"
              style={{ color: colors.primary }}
            >
              <FaMapMarkerAlt className="mr-3" />
              OUR LOCATION
            </h3>
            <div className="space-y-4" style={{ color: colors.dark }}>
              <p className="text-lg">
                <strong>Shree Sports Academy</strong>
                <br />
                123 Sports Complex Road
                <br />
                Pune, Maharashtra 411041
                <br />
                India
              </p>

              <div className="pt-4 border-t border-gray-200">
                <h4
                  className="text-xl font-semibold mb-3 flex items-center"
                  style={{ color: colors.primary }}
                >
                  <FaClock className="mr-3" />
                  TRAINING HOURS
                </h4>
                <p>Monday - Saturday: 6:00 AM - 9:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div
            className="p-8 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.light }}
          >
            <h3
              className="text-2xl font-bold mb-6 flex items-center"
              style={{ color: colors.primary }}
            >
              <FaPhone className="mr-3" />
              CONTACT DETAILS
            </h3>
            <div className="space-y-4" style={{ color: colors.dark }}>
              <p className="text-lg">
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p className="text-lg">
                <strong>WhatsApp:</strong> +91 98765 43210
              </p>
              <p className="text-lg">
                <strong>Email:</strong> contact@shreesports.com
              </p>
              <p className="text-lg">
                <strong>For Admissions:</strong> admissions@shreesports.com
              </p>
            </div>
          </div>

          {/* Fast Loading Map */}
          <div className="h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.85573641541667!3d18.562061287384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c065144d8edf%3A0x3703b8095866c54b!2sShivaji%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628687236782!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="p-8 rounded-xl shadow-lg"
          style={{ backgroundColor: colors.light }}
        >
          <h3
            className="text-2xl font-bold mb-8"
            style={{ color: colors.primary }}
          >
            SEND US A MESSAGE
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.dark }}
              >
                <FaUser className="inline mr-2" />
                Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : `border-gray-300 focus:ring-${colors.primary} focus:border-${colors.primary}`
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.dark }}
              >
                <FaPhone className="inline mr-2" />
                Mobile Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : `border-gray-300 focus:ring-${colors.primary} focus:border-${colors.primary}`
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.dark }}
              >
                <FaEnvelope className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : `border-gray-300 focus:ring-${colors.primary} focus:border-${colors.primary}`
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.dark }}
              >
                <MdMessage className="inline mr-2" />
                Your Message
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message should be at least 10 characters",
                  },
                })}
                rows="5"
                className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.message
                    ? "border-red-500 focus:ring-red-200"
                    : `border-gray-300 focus:ring-${colors.primary} focus:border-${colors.primary}`
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-all ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:opacity-90"
                }`}
                style={{ backgroundColor: colors.primary }}
              >
                {isSubmitting ? (
                  "SENDING..."
                ) : (
                  <>
                    <FaPaperPlane className="inline mr-2" />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </div>

            {submitSuccess && (
              <div className="p-4 mt-4 rounded-lg text-center bg-green-100 text-green-800">
                Thank you! Your message has been sent successfully. We'll
                contact you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
