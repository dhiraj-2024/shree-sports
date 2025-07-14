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
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Get API endpoint from environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  const CONTACT_API_ENDPOINT = `${API_BASE_URL}/api/contact/submit`;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await axios.post(CONTACT_API_ENDPOINT, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      setSubmitError(
        error.response?.data?.message || 
        "Failed to submit form. Please try again later."
      );
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
                infront new TCS Maan, Shree Sports Academy, Phase 3, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Pune, Maharashtra 411057
                <br />
                India
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-orange-500 flex items-center mb-4">
                <FaPhone className="mr-2" /> CONTACT DETAILS
              </h3>
              <p className="text-black text-lg">
                <strong>Phone:</strong> 84850 29797  || 94207 03934
              </p>
              <p className="text-black text-lg">
                <strong>WhatsApp:</strong> 84850 29797  ||  94207 03934
              </p>
              <p className="text-black text-lg">
                <strong>Email:</strong> shreesportsa@gmail.com
              </p>
              <p className="text-black text-lg">
                <strong>Admissions:</strong> shreesportsa@gmail.com
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.7607679508305!2d73.68421247430514!3d18.586103367170914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb6195ffadff%3A0x857aaf40e741422e!2sShree%20Sports%20Academy!5e1!3m2!1sen!2sin!4v1752485738386!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
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
                  {...register("name", { 
                    required: "Name is required",
                    maxLength: {
                      value: 100,
                      message: "Name should not exceed 100 characters"
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-black">
                  <FaPhone className="inline mr-2" /> Phone
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter valid 10-digit phone number",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                      message: "Message should be at least 10 characters",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Message should not exceed 1000 characters"
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-invalid={errors.message ? "true" : "false"}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-60 flex items-center justify-center"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span>SENDING...</span>
                ) : (
                  <>
                    <FaPaperPlane className="inline mr-2" /> SEND MESSAGE
                  </>
                )}
              </button>

              {submitSuccess && (
                <div className="p-4 mt-4 bg-green-100 text-green-800 rounded-lg text-center">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitError && (
                <div className="p-4 mt-4 bg-red-100 text-red-800 rounded-lg text-center">
                  {submitError}
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