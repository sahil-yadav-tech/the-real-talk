import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCog,
  FaBars,
  FaTimes,
  FaHome,
  FaChalkboardTeacher,
  FaBook
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Navbar variants for animation
  const navbarVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const navItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={` w-full z-50 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            CourseHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium hover:text-blue-300 transition-colors ${location.pathname === '/' ? 'text-blue-400' : 'text-gray-300'}`}
            >
              <FaHome className="inline mr-1" /> Home
            </Link>
            
            <Link 
              to="/courses" 
              className={`font-medium hover:text-purple-300 transition-colors ${location.pathname === '/courses' ? 'text-purple-400' : 'text-gray-300'}`}
            >
              <FaBook className="inline mr-1" /> Courses
            </Link>
            
            <Link 
              to="/instructors" 
              className={`font-medium hover:text-indigo-300 transition-colors ${location.pathname === '/instructors' ? 'text-indigo-400' : 'text-gray-300'}`}
            >
              <FaChalkboardTeacher className="inline mr-1" /> Instructors
            </Link>

            {!user ? (
              <>
                <Link
                  to="/register"
                  className="font-medium hover:text-blue-300 transition-colors"
                >
                  <FaUserPlus className="inline mr-1" /> Register
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                  >
                    <FaSignInAlt className="inline mr-2" /> Login
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to={user?.role === "admin" ? "/admin" : "/dashboard"} 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-lg text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
                  >
                    <RiDashboardFill className="inline mr-2" /> 
                    {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <button 
                    onClick={handleLogout} 
                    className="text-gray-300 hover:text-red-400 transition-colors flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-gray-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <motion.div 
                custom={0}
                variants={navItemVariants}
                className="border-b border-gray-700"
              >
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg ${location.pathname === '/' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FaHome className="inline mr-3" /> Home
                </Link>
              </motion.div>
              
              <motion.div 
                custom={1}
                variants={navItemVariants}
                className="border-b border-gray-700"
              >
                <Link
                  to="/courses"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg ${location.pathname === '/courses' ? 'bg-gray-700 text-purple-400' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FaBook className="inline mr-3" /> Courses
                </Link>
              </motion.div>
              
              <motion.div 
                custom={2}
                variants={navItemVariants}
                className="border-b border-gray-700"
              >
                <Link
                  to="/instructors"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg ${location.pathname === '/instructors' ? 'bg-gray-700 text-indigo-400' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FaChalkboardTeacher className="inline mr-3" /> Instructors
                </Link>
              </motion.div>

              {!user ? (
                <>
                  <motion.div 
                    custom={3}
                    variants={navItemVariants}
                    className="border-b border-gray-700"
                  >
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700"
                    >
                      <FaUserPlus className="inline mr-3" /> Register
                    </Link>
                  </motion.div>
                  <motion.div 
                    custom={4}
                    variants={navItemVariants}
                  >
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-medium"
                    >
                      <FaSignInAlt className="inline mr-3" /> Login
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div 
                    custom={3}
                    variants={navItemVariants}
                    className="border-b border-gray-700"
                  >
                    <Link
                      to={user?.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-medium"
                    >
                      <RiDashboardFill className="inline mr-3" /> 
                      {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                    </Link>
                  </motion.div>
                  <motion.div 
                    custom={4}
                    variants={navItemVariants}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-red-400"
                    >
                      <FaSignOutAlt className="inline mr-3" /> Logout
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;