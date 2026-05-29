import React from "react";
import { Link } from "react-router-dom";

export default function RegisterCom({
  handleSubmit,
  apiError,
  user,
  handleChange,
  error,
  loading,
  handleImageChange,
}) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

            <p className="text-gray-500 mt-2 text-sm">
              Join our platform and start your journey.
            </p>
          </div>

          {apiError && (
            <p className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
              {apiError}
            </p>
          )}

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <span className="text-red-500 text-sm">{error.name}</span>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <span className="text-red-500 text-sm">{error.email}</span>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

            <span className="text-red-500 text-sm">{error.password}</span>
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

            <span className="text-red-500 text-sm">
              {error.confirmPassword}
            </span>
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              name="address"
              value={user.address}
              onChange={handleChange}
              placeholder="Enter address"
            />

            <span className="text-red-500 text-sm">{error.address}</span>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>

            <input
              className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              type="file"
              onChange={handleImageChange}
            />

            <span className="text-red-500 text-sm">{error.profileImage}</span>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-300">
            {loading ? "Loading..." : "Register"}
          </button>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
