import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaStar,
  FaRegStar,
  FaQuoteLeft,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import FeedbackModal from "./FeedbackModal";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedMessages, setExpandedMessages] = useState({});

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/api/feedback/approved");
        setFeedback(res.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) =>
        i < rating ? (
          <FaStar key={i} className="text-orange-500 inline" />
        ) : (
          <FaRegStar key={i} className="text-orange-300 inline" />
        )
      );
  };

  const toggleReadMore = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(feedback.length / itemsPerSlide);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const visibleFeedback = feedback.slice(
    currentSlide * itemsPerSlide,
    currentSlide * itemsPerSlide + itemsPerSlide
  );

  if (loading) return <div className="text-center py-8">Loading feedback...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div className="flex items-center mb-6 lg:mb-0">
            <FaQuoteLeft className="text-4xl text-gray-300 mr-4" />
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              What our customers are saying
            </h2>
          </div>
          {feedback.length > itemsPerSlide && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-gray-300 hover:bg-orange-500 hover:text-white"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-gray-300 hover:bg-orange-500 hover:text-white"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all">
          {visibleFeedback.map((item) => (
            <div
              key={item._id}
              className="relative bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <p
                className={`text-gray-800 mb-4 leading-relaxed ${
                  expandedMessages[item._id]
                    ? "max-h-96 overflow-y-auto"
                    : "line-clamp-5"
                }`}
              >
                {item.message}
              </p>

              {item.message.length > 200 && (
                <button
                  className="text-sm text-orange-600 font-medium underline mb-4"
                  onClick={() => toggleReadMore(item._id)}
                >
                  {expandedMessages[item._id] ? "Read less" : "Read more"}
                </button>
              )}

              <div className="text-green-500 mb-4">{renderStars(item.rating)}</div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={`https://ui-avatars.com/api/?name=${item.name}&background=f97316&color=fff`}
                  alt={item.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {Math.floor(Math.random() * 10 + 1)} days ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-6 py-3 rounded-md text-white bg-black hover:bg-orange-600 transition"
          >
            <FaPlus className="mr-2" />
            Share Your Feedback
          </button>
        </div>

        {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
      </div>
    </section>
  );
};

export default Feedback;
