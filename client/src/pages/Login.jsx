
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get admin credentials from environment variables
    const ADMIN_EMAIL = import.meta.env.VITE_APP_ADMIN_EMAIL;
    const ADMIN_PASSWORD = import.meta.env.VITE_APP_ADMIN_PASSWORD;

    useEffect(() => {
        // Clear any existing auth data when loading login page
        localStorage.removeItem('adminToken');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Basic validation
            if (!email || !password) {
                throw new Error("Please enter both email and password");
            }

            // Check credentials
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                // Generate a simple token (in production, use JWT from backend)
                const token = btoa(`${email}:${Date.now()}`);
                localStorage.setItem('adminToken', token);
                
                // Set expiration (8 hours)
                localStorage.setItem('adminTokenExpiry', Date.now() + 8 * 60 * 60 * 1000);
                
                // Redirect to dashboard or intended path
                const redirectTo = location.state?.from?.pathname || "/ZyH1W3pfRJ4O70JO32KEcYlA9yKELWFfNGovBVxJFcE=/dashboard";
                navigate(redirectTo, { replace: true });
                
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-70 flex justify-center items-center"
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
    );
};

export default Login;