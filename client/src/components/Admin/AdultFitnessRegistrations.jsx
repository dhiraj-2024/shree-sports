import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaCalendarAlt,
    FaEdit,
    FaTrash,
    FaInfoCircle,
    FaHome,
    FaIdCard,
} from "react-icons/fa";
import MobileOrientationAlert from "./MobileOrientationAlert";

const AdultFitnessRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        thisMonth: 0,
        today: 0,
    });
    const [mobileView, setMobileView] = useState(window.innerWidth < 768);
    const [expandedRow, setExpandedRow] = useState(null);

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
            const [registrationsRes, statsRes, monthlyRes, dailyRes] =
                await Promise.all([
                    axios.get(`${API_BASE_URL}/api/adult-fitness`),
                    axios.get(`${API_BASE_URL}/api/adult-fitness/count`),
                    axios.get(`${API_BASE_URL}/api/adult-fitness/monthly-count`),
                    axios.get(`${API_BASE_URL}/api/adult-fitness/daily-count`),
                ]);

            // Ensure registrations is always an array
            let registrationsData = [];
            if (registrationsRes.data) {
                if (Array.isArray(registrationsRes.data)) {
                    registrationsData = registrationsRes.data;
                } else if (Array.isArray(registrationsRes.data.data)) {
                    registrationsData = registrationsRes.data.data;
                }
            }

            setRegistrations(registrationsData);
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
            setRegistrations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const toggleRowExpand = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error)
        return <div className="text-red-500 text-center py-8">{error}</div>;

    return (
        <div className="p-4 md:p-6">
            <MobileOrientationAlert />

            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Adult Fitness Registrations
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 md:p-3 rounded-full bg-blue-100 text-blue-600 mr-3 md:mr-4">
                            <FaUser size={mobileView ? 16 : 20} />
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base text-gray-500">
                                Total Registrations
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

            {/* Registrations Table */}
            {!Array.isArray(registrations) || registrations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No registrations found
                </div>
            ) : mobileView ? (
                // Mobile Cards View
                <div className="space-y-4">
                    {registrations.map((reg) => (
                        <div key={reg._id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                    <FaUser className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {reg.name}
                                            </div>
                                            <div className="text-xs text-gray-500">{reg.email}</div>
                                        </div>
                                        <button
                                            onClick={() => toggleRowExpand(reg._id)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <FaInfoCircle />
                                        </button>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="font-medium">Age:</span> {reg.age}
                                        </div>
                                        <div>
                                            <span className="font-medium">Gender:</span> {reg.gender}
                                        </div>
                                        <div>
                                            <span className="font-medium">Phone:</span> {reg.mobile}
                                        </div>
                                        <div>
                                            <span className="font-medium">Aadhar:</span>{" "}
                                            {reg.aadharNumber}
                                        </div>
                                        <div>
                                            <span className="font-medium">Days:</span>{" "}
                                            {reg.selectedDays.join(", ")}
                                        </div>
                                        <div>
                                            <span className="font-medium">DOB:</span>{" "}
                                            {formatDate(reg.dob)}
                                        </div>
                                    </div>

                                    {expandedRow === reg._id && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                                            <div className="grid grid-cols-1 gap-2">
                                                <div>
                                                    <span className="font-medium">Address:</span>{" "}
                                                    {reg.address}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Joined:</span>{" "}
                                                    {formatDate(reg.joiningDate)}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Desktop Table View
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-r border-gray-200">
                                        Personal Info
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-r border-gray-200">
                                        Contact Details
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-r border-gray-200">
                                        Fitness Schedule
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-r border-gray-200">
                                        Important Dates
                                    </th>
                                    {/* <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                        Actions
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {registrations.map((reg) => (
                                    <tr key={reg._id} className="hover:bg-gray-50">
                                        {/* Personal Info Column */}
                                        <td className="px-4 py-4 whitespace-nowrap border-r border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FaUser className="text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {reg.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        <span className="font-medium">Age:</span> {reg.age}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        <span className="font-medium">Gender:</span>{" "}
                                                        {reg.gender}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        <span className="font-medium">DOB:</span>{" "}
                                                        {formatDate(reg.dob)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Contact Details Column */}
                                        <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                                            <div className="space-y-1">
                                                <div className="flex items-center">
                                                    <FaPhone className="mr-2 text-gray-400" />
                                                    {reg.mobile}
                                                </div>
                                                <div className="flex items-center">
                                                    <FaEnvelope className="mr-2 text-gray-400" />
                                                    {reg.email}
                                                </div>
                                                <div className="flex items-start">
                                                    <FaHome className="mr-2 mt-1 text-gray-400" />
                                                    <span>{reg.address}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaIdCard className="mr-2 text-gray-400" />
                                                    {reg.aadharNumber}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Fitness Schedule Column */}
                                        <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                                            <div className="flex flex-wrap gap-1">
                                                {reg.selectedDays.map((day) => (
                                                    <span
                                                        key={day}
                                                        className="px-2 py-1 text-xs rounded bg-green-100 text-green-800"
                                                    >
                                                        {day}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Important Dates Column */}
                                        <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                                            <div className="space-y-1">
                                                <div>
                                                    <span className="font-medium">Joined:</span>{" "}
                                                    {formatDate(reg.joiningDate)}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Created:</span>{" "}
                                                    {formatDate(reg.createdAt)}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Updated:</span>{" "}
                                                    {formatDate(reg.updatedAt)}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Actions Column */}
                                        {/* <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td> */}
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

export default AdultFitnessRegistrations;
