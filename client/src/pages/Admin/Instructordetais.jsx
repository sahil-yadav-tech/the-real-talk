import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InstructorDetails() {
  const [instructors, setInstructors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("http://localhost:9080/api/admin/instructors");
      setInstructors(response.data.instructors);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      setLoading(false);
    }
  };

  const handleAddInstructor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9080/api/admin/instructors",
        form
      );
      alert(response.data.message);
      setForm({ name: "", email: "", password: "" });
      setShowAddForm(false);
      fetchInstructors();
    } catch (error) {
      console.error("Error adding instructor:", error);
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  const handleDeleteInstructor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this instructor?")) return;
    try {
      await axios.delete(`http://localhost:9080/api/admin/instructors/${id}`);
      fetchInstructors();
      alert("Instructor deleted successfully");
    } catch (error) {
      console.error("Error deleting instructor:", error);
      alert(error.response?.data?.message || "Failed to delete instructor.");
    }
  };

  const handleEditInstructor = (id) => {
    navigate(`/admin/instructor/edit/${id}`);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Instructor Management</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 flex items-center"
          >
            <span className="mr-2">+</span> Add Instructor
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Instructor</h2>
            <form onSubmit={handleAddInstructor}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength="6"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition duration-200"
                >
                  Save Instructor
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p>Loading instructors...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {instructors.length > 0 ? (
                    instructors.map((instructor, index) => (
                      <tr key={instructor._id} className="hover:bg-gray-750 transition duration-150">
                        <td className="py-4 px-4">{index + 1}</td>
                        <td className="py-4 px-4 font-medium">{instructor.name}</td>
                        <td className="py-4 px-4 text-blue-400">{instructor.email}</td>
                        <td className="py-4 px-4">
                          <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm">
                            {instructor.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditInstructor(instructor._id)}
                            className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteInstructor(instructor._id)}
                            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-8 text-center text-gray-400" colSpan="5">
                        No instructors found. Add one to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructorDetails;