import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const limit = 5;
  const searchInputRef = useRef(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:9080/api/course`, {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: limit,
        },
      });

      if (response.data && Array.isArray(response.data.courses)) {
        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages || 1);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch courses"
      );
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchCourses]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:9080/api/course/${id}`);
        fetchCourses();
      } catch (err) {
        setError("Failed to delete course");
      }
    }
  };

  const handleDeleteLecture = async (courseId, lectureId) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        await axios.delete(
          `http://localhost:9080/api/course/${courseId}/lecture/${lectureId}`
        );
        fetchCourses();
      } catch (err) {
        setError("Failed to delete lecture");
      }
    }
  };

  const toggleCourseExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format("MMM D, YYYY") : "N/A";
  };

  const formatTime = (timeString) => {
    return timeString ? moment(timeString, "HH:mm").format("h:mm A") : "N/A";
  };

  if (loading && currentPage === 1 && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700 text-lg">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-500">

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Course Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and organize your courses and lectures
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/admin/createcourse")}
            className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <FiPlus className="mr-2" />
            Create New Course
          </motion.button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearch}
              ref={searchInputRef}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>
        </motion.div>

        {/* Courses List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Course Card */}
                <div
                  className={`p-5 ${
                    expandedCourse === course._id
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center mb-4 sm:mb-0">
                      {course.image && (
                        <div className="flex-shrink-0 h-12 w-12 mr-4">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={course.image}
                            alt={course.name}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {course.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              course.level === "Beginner"
                                ? "bg-green-100 text-green-800"
                                : course.level === "Intermediate"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {course.level}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {course.lectures?.length || 0} lectures
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          navigate(`/admin/course/${course._id}/lecture/create`)
                        }
                        className="flex items-center px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
                      >
                        <FaChalkboardTeacher className="mr-1.5" />
                        Add Lecture
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/admin/course/${course._id}`)}
                        className="flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                      >
                        <FiEdit className="mr-1.5" />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteCourse(course._id)}
                        className="flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                      >
                        <FiTrash2 className="mr-1.5" />
                        Delete
                      </motion.button>
                      <button
                        onClick={() => toggleCourseExpand(course._id)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        {expandedCourse === course._id ? (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Lectures List */}
                <AnimatePresence>
                  {expandedCourse === course._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50"
                    >
                      {course.lectures?.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {course.lectures.map((lecture) => (
                            <div
                              key={lecture._id}
                              className="p-4 hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="mb-2 md:mb-0">
                                  <h4 className="font-medium text-gray-800">
                                    {lecture.title || "Untitled Lecture"}
                                  </h4>
                                  <div className="flex flex-wrap items-center mt-1 text-sm text-gray-600 gap-x-4 gap-y-1">
                                    <span className="flex items-center">
                                      <svg
                                        className="h-4 w-4 mr-1 text-blue-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      {formatDate(lecture.date)} at{" "}
                                      {formatTime(lecture.time)}
                                    </span>
                                    <span className="flex items-center">
                                      <svg
                                        className="h-4 w-4 mr-1 text-purple-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                      </svg>
                                      {lecture.instructor?.name ||
                                        "No instructor"}
                                    </span>
                                    <span
                                      className={`flex items-center ${
                                        lecture.attendanceStatus === "Attended"
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }`}
                                    >
                                      <svg
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      {lecture.attendanceStatus ||
                                        "Not Attended"}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      navigate(
                                        `/courses/${course._id}/lecture/${lecture._id}/edit`
                                      )
                                    }
                                    className="flex items-center px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                                  >
                                    <FiEdit className="mr-1" />
                                    Edit
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleDeleteLecture(
                                        course._id,
                                        lecture._id
                                      )
                                    }
                                    className="flex items-center px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                                  >
                                    <FiTrash2 className="mr-1" />
                                    Delete
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No lectures found for this course
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No courses found
              </h3>
              <p className="mt-1 text-gray-500">
                {searchTerm
                  ? "Try adjusting your search query"
                  : "Create a new course to get started"}
              </p>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/courses/create")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  New Course
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-between"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * limit, courses.length)}
                </span>{" "}
                of <span className="font-medium">{totalPages * limit}</span>{" "}
                courses
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft className="h-5 w-5" />
                Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <FiChevronRight className="h-5 w-5 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </div>

  );
};

export default Course;
