import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://blogpost-g0z2.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-950 to-black">

            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-6 text-white">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg transition duration-200 font-semibold shadow-lg shadow-green-900/30"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-5">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-green-400 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    )
}

export default Register;