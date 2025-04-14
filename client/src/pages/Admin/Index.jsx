import React from "react";
import { FiUsers, FiBook, FiCalendar, FiBarChart2, FiClock } from "react-icons/fi";

function Index() {
  // Sample data for demonstration
  const stats = [
    { title: "Total Instructors", value: "24", icon: <FiUsers className="text-2xl" />, color: "bg-blue-100 text-blue-600" },
    { title: "Active Courses", value: "18", icon: <FiBook className="text-2xl" />, color: "bg-green-100 text-green-600" },
    { title: "Upcoming Lectures", value: "32", icon: <FiCalendar className="text-2xl" />, color: "bg-purple-100 text-purple-600" },
    { title: "Completion Rate", value: "89%", icon: <FiBarChart2 className="text-2xl" />, color: "bg-orange-100 text-orange-600" }
  ];

  const recentActivities = [
    { id: 1, action: "New instructor added", time: "10 min ago", icon: <FiUsers /> },
    { id: 2, action: "Course 'Advanced React' updated", time: "25 min ago", icon: <FiBook /> },
    { id: 3, action: "Lecture schedule conflict resolved", time: "1 hour ago", icon: <FiClock /> },
    { id: 4, action: "New course assignment created", time: "2 hours ago", icon: <FiCalendar /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">
            Welcome back! Manage instructors, courses, and assignments efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className={`rounded-lg p-3 mr-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instructor Management */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiUsers className="mr-2" /> Instructor Management
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-black">Add new instructors and assign courses to them</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-black">View all instructors with their assigned courses and status</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-black">Monitor instructor availability and workload</span>
                  </li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Manage Instructors
                </button>
              </div>
            </div>

            {/* Course Management */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiBook className="mr-2" /> Course Management
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-black">Create and organize courses with detailed information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-900">Track course progress and completion status</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-black">Monitor deadlines and send reminders</span>
                  </li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Manage Courses
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Recent Activities</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {recentActivities.map(activity => (
                    <li key={activity.id} className="flex items-start">
                      <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  View All Activities
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <FiUsers className="text-xl mb-2" />
                  <span className="text-sm">Add Instructor</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                  <FiBook className="text-xl mb-2" />
                  <span className="text-sm">Create Course</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                  <FiCalendar className="text-xl mb-2" />
                  <span className="text-sm">Schedule Lecture</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                  <FiBarChart2 className="text-xl mb-2" />
                  <span className="text-sm">View Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;