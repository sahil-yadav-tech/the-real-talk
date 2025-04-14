import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import LectureList from "./LectureList";

const CourseCard = ({ course, navigate, handleDeleteCourse, fetchCourses }) => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const toggleCourseExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        className={`p-5 ${
          expandedCourse === course._id ? "border-b border-gray-200" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <CourseInfo course={course} />
          
          <CourseActions 
            course={course}
            navigate={navigate}
            handleDeleteCourse={handleDeleteCourse}
            expandedCourse={expandedCourse}
            toggleCourseExpand={toggleCourseExpand}
          />
        </div>
        <p className="mt-3 text-gray-600 line-clamp-2">
          {course.description}
        </p>
      </div>

      <AnimatePresence>
        {expandedCourse === course._id && (
          <LectureList 
            course={course} 
            navigate={navigate} 
            fetchCourses={fetchCourses} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const CourseInfo = ({ course }) => (
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
      <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
      <div className="flex items-center mt-1">
        <LevelBadge level={course.level} />
        <span className="ml-2 text-sm text-gray-500">
          {course.lectures?.length || 0} lectures
        </span>
      </div>
    </div>
  </div>
);

const LevelBadge = ({ level }) => (
  <span
    className={`text-xs px-2 py-1 rounded-full ${
      level === "Beginner"
        ? "bg-green-100 text-green-800"
        : level === "Intermediate"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {level}
  </span>
);

const CourseActions = ({
  course,
  navigate,
  handleDeleteCourse,
  expandedCourse,
  toggleCourseExpand
}) => (
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
    <ExpandButton 
      expanded={expandedCourse === course._id}
      onClick={() => toggleCourseExpand(course._id)}
    />
  </div>
);

const ExpandButton = ({ expanded, onClick }) => (
  <button
    onClick={onClick}
    className="ml-2 text-gray-500 hover:text-gray-700"
  >
    {expanded ? (
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
);

export default CourseCard;