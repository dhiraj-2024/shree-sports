import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaCalendarAlt,
    FaComment,
    FaCheck,
    FaSpinner,
    FaTimes,
} from "react-icons/fa";

const ContactRegistrations = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        thisMonth: 0,
        today: 0,
    });
    const [mobileView, setMobileView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

    const fetchData = async () => {
        try {
            setLoading(true);
            const [contactsRes, statsRes, monthlyRes, dailyRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/contact`),
                axios.get(`${API_BASE_URL}/api/contact/count`),
                axios.get(`${API_BASE_URL}/api/contact/monthly-count`),
                axios.get(`${API_BASE_URL}/api/contact/daily-count`),
            ]);

            setContacts(contactsRes.data?.data || contactsRes.data || []);
            setStats({
                total: statsRes.data?.count || 0,
                thisMonth: monthlyRes.data?.count || 0,
                today: dailyRes.data?.count || 0,
            });
        } catch (err) {
            console.error("Fetch error:", err);
            setError(
                err.response?.data?.error || err.message || "Failed to fetch data"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE_URL}/api/contact/${id}/status`, {
                status,
            });
            fetchData();
        } catch (err) {
            console.error("Update error:", err);
            setError("Failed to update status");
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            new: "bg-blue-100 text-blue-800",
            "in-progress": "bg-yellow-100 text-yellow-800",
            resolved: "bg-green-100 text-green-800",
        };
        return (
            <span
                className={`px-2 py-1 text-xs rounded-full ${statusClasses[status]}`}
            >
                {status}
            </span>
        );
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error)
        return <div className="text-red-500 text-center py-8">{error}</div>;

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Contact Form Submissions
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 md:p-3 rounded-full bg-blue-100 text-blue-600 mr-3 md:mr-4">
                            <FaEnvelope size={mobileView ? 16 : 20} />
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base text-gray-500">
                                Total Messages
                            </h3>
                            <p className="text-xl md:text-2xl font-bold">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 md:p-3 rounded-full bg-green-100 text-green-600 mr-3 md:mr-4">
                            <FaCalendarAlt size={mobileView ? 16 : 20} />
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base text-gray-500">This Month</h3>
                            <p className="text-xl md:text-2xl font-bold">{stats.thisMonth}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 md:p-3 rounded-full bg-purple-100 text-purple-600 mr-3 md:mr-4">
                            <FaCalendarAlt size={mobileView ? 16 : 20} />
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base text-gray-500">Today</h3>
                            <p className="text-xl md:text-2xl font-bold">{stats.today}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contacts Table */}
            {mobileView ? (
                // Mobile Cards View
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                    <FaUser className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="text-sm font-medium text-gray-900">
                                            {contact.name}
                                        </div>
                                        <div className="ml-2">{getStatusBadge(contact.status)}</div>
                                    </div>
                                    <div className="text-xs text-gray-500">{contact.email}</div>
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                        <div className="flex items-center">
                                            <FaPhone className="mr-1 text-gray-400" />
                                            {contact.phone}
                                        </div>
                                        <div className="col-span-2">
                                            <div className="font-medium">Message:</div>
                                            <div className="text-gray-600">{contact.message}</div>
                                        </div>
                                        <div>
                                            <span className="font-medium">Date:</span>{" "}
                                            {formatDate(contact.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex space-x-2">
                                <button
                                    onClick={() => updateStatus(contact._id, "in-progress")}
                                    className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded flex items-center"
                                >
                                    <FaSpinner className="mr-1" /> In Progress
                                </button>
                                <button
                                    onClick={() => updateStatus(contact._id, "resolved")}
                                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded flex items-center"
                                >
                                    <FaCheck className="mr-1" /> Resolve
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Desktop Table View
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contacts.map((contact) => (
                                    <tr key={contact._id} className="hover:bg-gray-50">
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FaUser className="text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {contact.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {contact.email}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <FaPhone className="mr-1 text-gray-400" />
                                                        {contact.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4">
                                            <div className="text-sm text-gray-900 break-words max-w-2xl">
                                                {contact.message}
                                            </div>
                                        </td>

                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(contact.status)}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(contact.createdAt)}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        updateStatus(contact._id, "in-progress")
                                                    }
                                                    className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded flex items-center"
                                                    title="Mark as In Progress"
                                                >
                                                    <FaSpinner className="mr-1" />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(contact._id, "resolved")}
                                                    className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded flex items-center"
                                                    title="Mark as Resolved"
                                                >
                                                    <FaCheck className="mr-1" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactRegistrations;
