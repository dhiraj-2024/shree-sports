// /Users/rajputdhiraj/Desktop/shree-sports-academy/client/src/pages/News.jsx
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
        const [featuredRes, newsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/news/featured'),
          axios.get(`http://localhost:8080/api/news?page=${page}`)
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Featured News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <div className="prose max-w-none line-clamp-3" dangerouslySetInnerHTML={{ __html: item.content }} />
                  <Link
                    to={`/news/${item._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4"
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
        {news.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No news articles found.
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {news.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaCalendarAlt className="mr-1" />
                      <span className="mr-4">{formatDate(item.publishedAt)}</span>
                      <FaUser className="mr-1" />
                      <span>{item.author}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  {page > 1 && (
                    <button
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`px-4 py-2 border rounded-md ${
                        page === num ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  {page < totalPages && (
                    <button
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  )}
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;