import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
// import LoadingSpinner from "../components/LoadingSpinner";

const News = () => {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const [newsRes, featuredRes] = await Promise.all([
          axios.get("/api/news"),
          axios.get("/api/news/featured"),
        ]);
        setNews(newsRes.data);
        setFeaturedNews(featuredRes.data);
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Failed to fetch news"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Featured News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaUser className="mr-1" />
                    <span className="mr-4">{item.author}</span>
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  <Link
                    to={`/news/${item._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read More <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All News Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Latest News
        </h2>
        <div className="space-y-6">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaUser className="mr-1" />
                  <span className="mr-4">{item.author}</span>
                  <FaCalendarAlt className="mr-1" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover mb-4 rounded"
                  />
                )}
                <p className="text-gray-600 mb-4">{item.content}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
