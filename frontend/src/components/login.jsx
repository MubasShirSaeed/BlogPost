import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://blogpost-g0z2.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                // 👇 THIS is the important part
                setError(data.message || "Something went wrong");
                return;
            }

            if (response.ok) {
                navigate("/posts");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">

            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-6 text-white">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-10 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {error && (
                        <p className="text-red-400 text-sm text-center mb-3">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition duration-200 font-semibold shadow-lg shadow-blue-900/30"
                    >
                        Login
                    </button>

                    <p className="text-sm text-center mt-4 text-gray-400">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/")}
                            className="text-blue-400 cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login;