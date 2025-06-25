import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch,
    FaCalendarAlt,
    FaUser,
    FaEye,
    FaEyeSlash,
    FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import NewsModal from "../NewsModal";

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:8080/api/news/admin",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "adminToken"
                            )}`,
                        },
                    }
                );

                if (Array.isArray(res.data)) {
                    setNews(res.data);
                    setFilteredNews(res.data);
                } else {
                    setNews([]);
                    setFilteredNews([]);
                }

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

    useEffect(() => {
        const filtered = news.filter(
            (item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.tags &&
                    item.tags.some((tag) =>
                        tag.toLowerCase().includes(searchTerm.toLowerCase())
                    ))
        );
        setFilteredNews(filtered);
    }, [searchTerm, news]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this news item?")) {
            try {
                await axios.delete(`/api/news/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                });
                setNews(news.filter((item) => item._id !== id));
                toast.success("News deleted successfully");
            } catch (err) {
                toast.error(err.response?.data?.error || "Failed to delete news");
            }
        }
    };

    const toggleFeatured = async (id, currentStatus) => {
        try {
            const res = await axios.put(
                `/api/news/${id}`,
                { isFeatured: !currentStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                }
            );
            setNews(news.map((item) => (item._id === id ? res.data : item)));
            toast.success(
                `News ${!currentStatus ? "added to" : "removed from"} featured`
            );
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to update news");
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "published" ? "draft" : "published";
        try {
            const res = await axios.put(
                `/api/news/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                }
            );
            setNews(news.map((item) => (item._id === id ? res.data : item)));
            toast.success(`News marked as ${newStatus}`);
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to update news");
        }
    };

    const handleEdit = (newsItem) => {
        setCurrentNews(newsItem);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setCurrentNews(null);
        setShowModal(true);
    };

    const handleModalSubmit = async (formData) => {
        try {
            let res;
            if (currentNews) {
                res = await axios.put(`/api/news/${currentNews._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                });
                setNews(
                    news.map((item) => (item._id === currentNews._id ? res.data : item))
                );
                toast.success("News updated successfully");
            } else {
                res = await axios.post("/api/news",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "adminToken"
                            )}`,
                        },
                    }
                );
                setNews([res.data, ...news]);
                toast.success("News created successfully");
            }
            setShowModal(false);
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to save news");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    // if (loading) return <LoadingSpinner />;
    if (error)
        return <div className="text-red-500 text-center py-8">{error}</div>;

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">
                    News Management
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="pl-10 pr-4 py-2 border rounded-lg w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                    >
                        <FaPlus className="mr-2" />
                        Add News
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
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
                            {filteredNews.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {item.imageUrl ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <FaUser className="text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {item.title}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-1">
                                                    {item.content.substring(0, 60)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.author}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-2 text-gray-400" />
                                            {formatDate(item.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === "published"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    toggleFeatured(item._id, item.isFeatured)
                                                }
                                                className={`p-2 rounded ${item.isFeatured
                                                    ? "text-yellow-500 hover:text-yellow-700"
                                                    : "text-gray-400 hover:text-gray-600"
                                                    }`}
                                                title={
                                                    item.isFeatured
                                                        ? "Remove from featured"
                                                        : "Add to featured"
                                                }
                                            >
                                                <FaStar />
                                            </button>
                                            <button
                                                onClick={() => toggleStatus(item._id, item.status)}
                                                className={`p-2 rounded ${item.status === "published"
                                                    ? "text-blue-500 hover:text-blue-700"
                                                    : "text-gray-500 hover:text-gray-700"
                                                    }`}
                                                title={
                                                    item.status === "published"
                                                        ? "Mark as draft"
                                                        : "Publish"
                                                }
                                            >
                                                {item.status === "published" ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-900 p-2 rounded"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-600 hover:text-red-900 p-2 rounded"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <NewsModal
                    newsItem={currentNews}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleModalSubmit}
                />
            )}
        </div>
    );
};

export default AdminNews;
