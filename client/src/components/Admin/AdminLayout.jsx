// /Users/rajputdhiraj/Desktop/shree-sports-academy/client/src/components/Admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaTimes,
  FaNewspaper
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-blue-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Shree Sports Admin</h1>
        <button onClick={toggleMobileMenu} className="text-white">
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      {/* Sidebar - Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-800 text-white">
          <nav className="flex flex-col p-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
            <Link
              to="/admin/gymnastics"
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUsers className="mr-3" />
              Gymnastics
            </Link>
            <Link
              to="/admin/adult-fitness"
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUsers className="mr-3" />
              Fitness
            </Link>
            <Link
              to="/admin/cantact-data"
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaEnvelope className="mr-3" />
              Messages
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition text-left"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <div
        className={`hidden md:block w-64 bg-blue-900 text-white ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Shree Sports Admin</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/gymnastics"
            className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
          >
            <FaUsers className="mr-3" />
            Gymnastics
          </Link>
          <Link
            to="/admin/adult-fitness"
            className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
          >
            <FaUsers className="mr-3" />
            Fitness
          </Link>
          <Link
            to="/admin/cantact-data"
            className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
          >
            <FaEnvelope className="mr-3" />
            Messages
          </Link>
          <Link
            to="/admin/news"
            className="flex items-center px-4 py-3 text-white hover:bg-blue-700 transition"
          >
            <FaNewspaper className="mr-3" />
            News Management
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation - Desktop */}
        <header className="hidden md:block bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-600 hover:text-gray-900">
                  <FaBell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
