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

  return (
    <div className="bg-[#090040] py-16 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
          GET IN TOUCH
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-orange-500 flex items-center mb-4">
                <FaMapMarkerAlt className="mr-2" /> OUR LOCATION
              </h3>
              <p className="text-black text-lg leading-relaxed">
                <strong>Shree Sports Academy</strong>
                <br />
                123 Sports Complex Road, Pune, Maharashtra 411041
                <br />
                India
              </p>
              <div className="mt-6 border-t pt-4">
                <h4 className="text-xl font-semibold text-orange-500 flex items-center mb-2">
                  <FaClock className="mr-2" /> TRAINING HOURS
                </h4>
                <p className="text-black">Mon - Sat: 6:00 AM - 9:00 PM</p>
                <p className="text-black">Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-orange-500 flex items-center mb-4">
                <FaPhone className="mr-2" /> CONTACT DETAILS
              </h3>
              <p className="text-black text-lg">
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p className="text-black text-lg">
                <strong>WhatsApp:</strong> +91 98765 43210
              </p>
              <p className="text-black text-lg">
                <strong>Email:</strong> contact@shreesports.com
              </p>
              <p className="text-black text-lg">
                <strong>Admissions:</strong> admissions@shreesports.com
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md h-72">
              <iframe
                src="https://www.google.com/maps/embed?..."
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">
              SEND US A MESSAGE
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block mb-1 font-semibold text-black">
                  <FaUser className="inline mr-2" /> Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-black">
                  <FaPhone className="inline mr-2" /> Phone
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter valid 10-digit phone number",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-black">
                  <FaEnvelope className="inline mr-2" /> Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-black">
                  <MdMessage className="inline mr-2" /> Message
                </label>
                <textarea
                  rows="5"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "At least 10 characters",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-60"
              >
                {isSubmitting ? (
                  "SENDING..."
                ) : (
                  <>
                    <FaPaperPlane className="inline mr-2" /> SEND MESSAGE
                  </>
                )}
              </button>

              {submitSuccess && (
                <div className="p-4 mt-4 bg-green-100 text-green-800 rounded-lg text-center">
                  Thank you! Your message has been sent.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;