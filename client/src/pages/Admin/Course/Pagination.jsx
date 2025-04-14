import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, limit, courses, handlePageChange }) => {
  return (
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
        <PaginationButton
          direction="previous"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <PaginationButton
          direction="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </motion.div>
  );
};

const PaginationButton = ({ direction, onClick, disabled }) => {
  const isPrevious = direction === "previous";
  const text = isPrevious ? "Previous" : "Next";
  const Icon = isPrevious ? FiChevronLeft : FiChevronRight;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isPrevious && <Icon className="h-5 w-5" />}
      {text}
      {!isPrevious && <Icon className="h-5 w-5 ml-1" />}
    </motion.button>
  );
};

export default Pagination;