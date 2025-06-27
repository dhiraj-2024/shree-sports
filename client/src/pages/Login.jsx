// /Users/rajputdhiraj/Desktop/shree-sports-academy/client/src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaLock, FaEnvelope } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await axios.post(
//                 "http://localhost:8080/api/admin/login",
//                 { email, password },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     withCredentials: true,
//                 }
//             );

//             if (response.data.token) {
//                 localStorage.setItem("adminToken", response.data.token);
//                 localStorage.setItem("adminUser", JSON.stringify(response.data.user));
//                 toast.success("Login successful");
//                 navigate("/admin/dashboard", { replace: true });
//             } else {
//                 throw new Error("No token received");
//             }
//         } catch (err) {
//             const errorMessage =
//                 err.response?.data?.message || "Login failed. Please check credentials";
//             setError(errorMessage);
//             toast.error(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
//                     Admin Login
//                 </h2>

//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block mb-1 font-medium">Email</label>
//                         <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <FaEnvelope className="text-gray-400" />
//                             </div>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block mb-1 font-medium">Password</label>
//                         <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <FaLock className="text-gray-400" />
//                             </div>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""
//                             }`}
//                     >
//                         {loading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (
                email === "rajputdhiraj1852@gmail.com" &&
                password === "Admin@123"
            ) {
                localStorage.setItem("adminToken", "authenticated");
                navigate("/admin/dashboard", { replace: true });
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    Admin Login
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

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
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
