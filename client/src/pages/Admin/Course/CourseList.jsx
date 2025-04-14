import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import SearchBar from "./SearchBar";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import { FiPlus } from "react-icons/fi";

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  if (loading && currentPage === 1 && courses.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header navigate={navigate} />
        
        <ErrorMessage error={error} />
        
        <SearchBar 
          searchTerm={searchTerm} 
          handleSearch={handleSearch} 
          searchInputRef={searchInputRef} 
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                navigate={navigate}
                handleDeleteCourse={handleDeleteCourse}
                fetchCourses={fetchCourses}
              />
            ))
          ) : (
            <EmptyState searchTerm={searchTerm} navigate={navigate} />
          )}
        </motion.div>

        {courses.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            limit={limit}
            courses={courses}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

const Header = ({ navigate }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
  >
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
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
);

export default CourseList;