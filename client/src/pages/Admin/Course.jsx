import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const searchInputRef = useRef(null);

  // Memoized fetch function with proper dependencies
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:9080/api/course`, {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: limit
        }
      });
      
      if (response.data && Array.isArray(response.data.courses)) {
        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages || 1);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, limit]);

  // Debounced effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [fetchCourses]);

  // Stable search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Maintain input focus
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:9080/api/course/${id}`);
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  const handleDeleteLecture = async (courseId, lectureId) => {
    try {
      await axios.delete(`http://localhost:9080/api/course/${courseId}/lecture/${lectureId}`);
      fetchCourses();
    } catch (err) {
      setError('Failed to delete lecture');
    }
  };

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format('MMM D, YYYY') : 'N/A';
  };

  const formatTime = (timeString) => {
    return timeString ? moment(timeString, 'HH:mm').format('h:mm A') : 'N/A';
  };

  if (loading && currentPage === 1 && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-black">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Course Management</h1>
          <button
            onClick={() => navigate('/courses/create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Course
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-black px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search courses by name, description or level..."
                value={searchTerm}
                onChange={handleSearch}
                ref={searchInputRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Lectures</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <React.Fragment key={course._id}>
                      <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {course.image && (
                              <div className="flex-shrink-0 h-10 w-10 mr-4">
                                <img className="h-10 w-10 rounded-full" src={course.image} alt={course.name} />
                              </div>
                            )}
                            <div className="text-sm font-medium text-black">{course.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.level}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-black line-clamp-2">{course.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{course.lectures?.length || 0}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => navigate(`/courses/edit/${course._id}`)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => navigate(`/courses/${course._id}/lecture/create`)}
                            className="text-green-600 hover:text-green-900 ml-4"
                          >
                            Add Lecture
                          </button>
                        </td>
                      </tr>
                      {course.lectures?.map((lecture, lectureIndex) => (
                        <tr 
                          key={lecture._id} 
                          className={`${lectureIndex % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gray-200`}
                        >
                          <td colSpan="5" className="px-6 py-4">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-black">
                                <span className="font-medium">Lecture: </span>
                                <span className="text-blue-600">{lecture.title || 'Untitled'}</span> | 
                                <span className="ml-2">Instructor: <span className="font-semibold">{lecture.instructor?.name || 'N/A'}</span></span> | 
                                <span className="ml-2">Date: <span className="font-semibold">{formatDate(lecture.date)}</span></span> | 
                                <span className="ml-2">Time: <span className="font-semibold">{formatTime(lecture.time)}</span></span> | 
                                <span className={`ml-2 ${
                                  lecture.attendanceStatus === 'Attended' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
                                }`}>
                                  Status: {lecture.attendanceStatus || 'Not Attended'}
                                </span>
                              </div>
                              <div>
                                <button
                                  onClick={() => navigate(`/courses/${course._id}/lecture/${lecture._id}/edit`)}
                                  className="text-blue-600 hover:text-blue-900 mr-4 text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteLecture(course._id, lecture._id)}
                                  className="text-red-600 hover:text-red-900 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-black">
                      {loading ? 'Loading courses...' : 'No courses found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {courses.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-black">
                    Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * limit, courses.length)}</span> of{' '}
                    <span className="font-medium">{totalPages * limit}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-black hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      &gt;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;