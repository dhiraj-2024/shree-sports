import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const News = () => {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
        const [featuredRes, newsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/news/featured`),
          axios.get(`${API_BASE_URL}/api/news?page=${page}`)
        ]);

        setFeaturedNews(featuredRes.data.data || []);
        setNews(newsRes.data.data || []);
        setTotalPages(newsRes.data.pages || 1);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch news');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <section className="bg-[#090040] text-white py-20 px-4 sm:px-8 lg:px-16 mt-10 min-h-screen">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Latest <span className="text-orange-500">News & Updates</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Stay up-to-date with everything happening at Shree Sports Academy — events, achievements, announcements, and more.
        </p>
      </div>

      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-orange-500 border-b border-gray-600 pb-2">🌟 Featured News</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredNews.map((item) => (
              <div key={item._id} className="bg-[white] rounded-xl shadow-xl hover:shadow-2xl overflow-hidden transition">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2">{item.title}</h4>
                  <div className="text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.content }} />
                  {/* <Link
                    to={`/news/${item._id}`}
                    className="inline-flex items-center text-orange-500 hover:text-orange-400 mt-4"
                  >
                    Read More <FaArrowRight className="ml-2" />
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All News Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-orange-500 border-b border-gray-600 pb-2">📰 All News</h3>

        {news.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No news articles available.</div>
        ) : (
          <div className="space-y-10">
            {news.map((item) => (
              <div key={item._id} className="bg-[#7979ff99] rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <FaCalendarAlt className="mr-1" />
                    <span className="mr-4">{formatDate(item.publishedAt)}</span>
                    <FaUser className="mr-1" />
                    <span>{item.author}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                  <div className="text-gray-300 prose max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
                  {item.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              {page > 1 && (
                <button
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-white text-[#090040] font-semibold rounded-md hover:bg-gray-100"
                >
                  Previous
                </button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-4 py-2 rounded-md font-medium ${
                    page === num
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-[#090040] hover:bg-gray-100'
                  }`}
                >
                  {num}
                </button>
              ))}
              {page < totalPages && (
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-white text-[#090040] font-semibold rounded-md hover:bg-gray-100"
                >
                  Next
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
