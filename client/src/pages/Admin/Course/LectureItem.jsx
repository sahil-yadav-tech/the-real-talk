import React from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const LectureItem = ({
  lecture,
  courseId,
  navigate,
  handleDeleteLecture,
  formatDate,
  formatTime
}) => (
  <div className="p-4 hover:bg-gray-100 transition-colors">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <LectureInfo 
        lecture={lecture} 
        formatDate={formatDate} 
        formatTime={formatTime} 
      />
      <LectureActions 
        lecture={lecture}
        courseId={courseId}
        navigate={navigate}
        handleDeleteLecture={handleDeleteLecture}
      />
    </div>
  </div>
);

const LectureInfo = ({ lecture, formatDate, formatTime }) => (
  <div className="mb-2 md:mb-0">
    <h4 className="font-medium text-gray-800">
      {lecture.title || "Untitled Lecture"}
    </h4>
    <div className="flex flex-wrap items-center mt-1 text-sm text-gray-600 gap-x-4 gap-y-1">
      <LectureDetail 
        icon="time" 
        text={`${formatDate(lecture.date)} at ${formatTime(lecture.time)}`} 
      />
      <LectureDetail 
        icon="instructor" 
        text={lecture.instructor?.name || "No instructor"} 
      />
      <AttendanceStatus status={lecture.attendanceStatus} />
    </div>
  </div>
);

const LectureDetail = ({ icon, text }) => {
  const iconProps = {
    time: {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "text-blue-500"
    },
    instructor: {
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      color: "text-purple-500"
    }
  };

  return (
    <span className="flex items-center">
      <svg
        className={`h-4 w-4 mr-1 ${iconProps[icon].color}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={iconProps[icon].icon}
        />
      </svg>
      {text}
    </span>
  );
};

const AttendanceStatus = ({ status }) => (
  <span
    className={`flex items-center ${
      status === "Attended" ? "text-green-600" : "text-red-600"
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
    {status || "Not Attended"}
  </span>
);

const LectureActions = ({ lecture, courseId, navigate, handleDeleteLecture }) => (
  <div className="flex space-x-2">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() =>
        // navigate(`/admin/courses/${courseId}/lecture/${lecture._id}/edit`)
        navigate(`/admin/courses/${courseId}/lecture/${lecture._id}/edit`)
      }
      className="flex items-center px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
    >
      <FiEdit className="mr-1" />
      Edit
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleDeleteLecture(courseId, lecture._id)}
      className="flex items-center px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
    >
      <FiTrash2 className="mr-1" />
      Delete
    </motion.button>
  </div>
);

export default LectureItem;

