import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const InstructorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9080/api/admin/instructors/${id}`
        );
        setInstructor({
          name: response.data.instructor.name,
          email: response.data.instructor.email,
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch instructor details");
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `http://localhost:9080/api/admin/instructors/${id}`,
        instructor
      );
      setSuccess(response.data.message);
      // setTimeout(() => {
      //   navigate("/admin/instructors");
      // }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update instructor details"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading instructor details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Instructor</h1>
          <p className="text-gray-400">
            Update the details of the instructor below
          </p>
        </div>

        {error && (
          <div className="bg-red-800/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-800/30 border border-green-700 text-green-200 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={instructor.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={instructor.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-8 space-x-3">
              <button
                type="button"
                onClick={() => navigate("/admin/instructordetais")}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition duration-200"
              >
                Update Instructor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorEdit;