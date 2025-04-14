import React from "react";
import { motion } from "framer-motion";
import LectureItem from "./LectureItem";
import { formatDate, formatTime } from "./formatUtils.js";

const LectureList = ({ course, navigate, fetchCourses }) => {
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

  return (
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
            <LectureItem
              key={lecture._id}
              lecture={lecture}
              courseId={course._id}
              navigate={navigate}
              handleDeleteLecture={handleDeleteLecture}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          No lectures found for this course
        </div>
      )}
    </motion.div>
  );
};

export default LectureList;