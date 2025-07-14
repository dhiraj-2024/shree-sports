// /Users/rajputdhiraj/Desktop/shree-sports-academy/client/src/components/Admin/FeedbackManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";


  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/feedback`);
        setFeedback(res.data);
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Failed to fetch feedback"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/feedback/${id}`, {
        status,
      });
      setFeedback((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
      toast.success(`Feedback ${status}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update feedback");
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={
            i < rating ? "text-yellow-400 inline" : "text-gray-300 inline"
          }
        />
      ));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Feedback Management
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedback.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 max-h-32 overflow-y-auto whitespace-pre-line">
                      {item.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {renderStars(item.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {item.status !== "approved" && (
                        <button
                          onClick={() => updateStatus(item._id, "approved")}
                          className="text-green-600 hover:text-green-900 p-2 rounded"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                      )}
                      {item.status !== "rejected" && (
                        <button
                          onClick={() => updateStatus(item._id, "rejected")}
                          className="text-red-600 hover:text-red-900 p-2 rounded"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      )}
                      {/* Delete button removed */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
