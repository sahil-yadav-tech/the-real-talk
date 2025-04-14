import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const EmptyState = ({ searchTerm, navigate }) => {
  return (
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
  );
};

export default EmptyState;