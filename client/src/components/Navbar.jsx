import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  console.log(user?.role, "-------------------------------------");

  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    // Optionally clear token from cookie/server
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeMobileMenu = () => setIsMobileMenuOpen(false); // Function to close the mobile menu when a link is clicked

  return (
    <nav className="text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Course
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="font-semibold hover:text-blue-300"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                >
                  <FaSignInAlt className="inline mr-2" /> Login
                </Link>
              </>
            ) : (
              <>
                {user?.role === "admin" && (
                  <Link to="/admin" className="hover:text-purple-300">
                    <FaUserCog className="inline mr-2" /> Admin Panel
                  </Link>
                )}
                {user?.role === "instructor" && (
                  <Link to="/dashboard" className="hover:text-purple-300">
                    <FaUserCog className="inline mr-2" /> Dashboard
                  </Link>
                )}
                {user?.role === "user" && (
                  <Link to="/dashboard" className="hover:text-purple-300">
                    <FaUserCog className="inline mr-2" /> Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="hover:text-red-400">
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {!user ? (
              <>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 hover:text-blue-300"
                >
                  <FaUserPlus className="mr-2" /> Register
                </Link>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 bg-blue-600 hover:bg-blue-700"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              </>
            ) : (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="block px-3 py-3 hover:text-purple-300"
                  >
                    <FaUserCog className="mr-2" /> Admin Panel
                  </Link>
                )}
                {user?.role === "instructor" && (
                  <Link
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="block px-3 py-3 hover:text-purple-300"
                  >
                    <FaUserCog className="mr-2" /> Dashboard
                  </Link>
                )}
                {user?.role === "user" && (
                  <Link
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="block px-3 py-3 hover:text-purple-300"
                  >
                    <FaUserCog className="mr-2" /> Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu(); // Close the mobile menu after logout
                  }}
                  className="w-full text-left px-3 py-3 hover:text-red-400"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
