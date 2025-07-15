import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Get admin credentials from environment variables
    const ADMIN_EMAIL = import.meta.env.VITE_APP_ADMIN_EMAIL;
    const ADMIN_PASSWORD = import.meta.env.VITE_APP_ADMIN_PASSWORD;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate inputs
            if (!formData.email || !formData.password) {
                throw new Error("Both email and password are required");
            }

            // Check credentials
            if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
                // Create a simple token
                const token = btoa(`${formData.email}:${Date.now()}`);
                const expiryTime = Date.now() + 8 * 60 * 60 * 1000; // 8 hours

                localStorage.setItem('adminToken', token);
                localStorage.setItem('adminTokenExpiry', expiryTime.toString());

                // Close modal and redirect to dashboard
                onClose();
                navigate("/shreeadmin/dashboard");

                toast.success("Login successful!");
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    <FaTimes size={20} />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    autoComplete="username"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1 font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                            aria-label={isLoading ? "Authenticating" : "Login"}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </>
                            ) : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;