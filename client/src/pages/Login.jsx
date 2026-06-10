import React from "react";
import { useState } from "react";
import { loginUser } from "../api/authApi";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleOnchange = (e) => {
    console.log(e.target.value, e.target.value);
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(user);

      console.log("Login Success:", data);
    } catch (error) {
      console.log(error, "error");

      console.error("Login Failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="min-h-screen bg-[#F6F3EB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={handleOnchange}
              value={user.email}
              name="email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              onChange={handleOnchange}
              value={user.password}
              name="password"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 cursor-pointer"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link   to="/register" className="text-blue-600 font-medium cursor-pointer hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
