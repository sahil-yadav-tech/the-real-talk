import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [courseData, setCourseData] = useState({
    name: '',
    level: 'Beginner',
    description: '',
    lectures: [{
      title: '',
      instructor: '',
      date: '',
      time: '',
    }]
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:9080/api/admin/instructors');
        setInstructors(response.data.instructors);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch instructors');
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleLectureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLectures = [...courseData.lectures];
    updatedLectures[index][name] = value;
    
    setCourseData(prev => ({
      ...prev,
      lectures: updatedLectures
    }));
  };

  const addLecture = () => {
    setCourseData(prev => ({
      ...prev,
      lectures: [
        ...prev.lectures,
        {
          title: '',
          instructor: '',
          date: '',
          time: '',
        }
      ]
    }));
  };

  const removeLecture = (index) => {
    if (courseData.lectures.length <= 1) {
      setError('At least one lecture is required');
      return;
    }
    
    const updatedLectures = [...courseData.lectures];
    updatedLectures.splice(index, 1);
    
    setCourseData(prev => ({
      ...prev,
      lectures: updatedLectures
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    // Validate course data
    if (!courseData.name || !courseData.level || !courseData.description || !imageFile) {
      setError('All course fields are required');
      setIsSubmitting(false);
      return;
    }

    // Validate lectures
    for (const lecture of courseData.lectures) {
      if (!lecture.title || !lecture.instructor || !lecture.date || !lecture.time) {
        setError('All lecture fields are required for each lecture');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('name', courseData.name);
      formData.append('level', courseData.level);
      formData.append('description', courseData.description);
      formData.append('image', imageFile);
      formData.append('lectures', JSON.stringify(courseData.lectures));

      // Send request
      const response = await axios.post('http://localhost:9080/api/course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Course created successfully!');
      // setTimeout(() => {
      //   navigate('/courses');
      // }, 1500);
    } catch (err) {
      console.error('Error creating course:', err);
      setError(err.response?.data?.message || 'Failed to create course');
      
      // Handle lecture conflict errors specifically
      if (err.response?.data?.message?.includes('Instructor already has a lecture')) {
        setError(err.response.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-black">Loading instructors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Create New Course</h1>
          <p className="mt-2 text-sm text-black">
            Fill in the details below to create a new course
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="text-black">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p className="text-black">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          {/* Course Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Course Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={courseData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Level</label>
                <select
                  name="level"
                  value={courseData.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-1">Description</label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-1">Course Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                />
              </div>
            </div>
          </div>

          {/* Lectures */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Lectures</h2>
              <button
                type="button"
                onClick={addLecture}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Lecture
              </button>
            </div>

            {courseData.lectures.map((lecture, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 relative">
                <button
                  type="button"
                  onClick={() => removeLecture(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  title="Remove lecture"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Lecture Title</label>
                    <input
                      type="text"
                      name="title"
                      value={lecture.title}
                      onChange={(e) => handleLectureChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Instructor</label>
                    <select
                      name="instructor"
                      value={lecture.instructor}
                      onChange={(e) => handleLectureChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    >
                      <option value="">Select Instructor</option>
                      {instructors.map((instructor) => (
                        <option key={instructor._id} value={instructor._id}>
                          {instructor.name} ({instructor.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={lecture.date}
                      onChange={(e) => handleLectureChange(index, e)}
                      min={moment().format('YYYY-MM-DD')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={lecture.time}
                      onChange={(e) => handleLectureChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Course'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;