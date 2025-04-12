import React from "react";

function Index() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the Admin Dashboard. Here you can manage the instructors,
        courses, and assignments efficiently.
      </p>

      <div className="bg-[#0b1019] p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Instructor Management
        </h2>
        <p className="text-gray-700">
          - Add new instructors and assign courses to them.
        </p>
        <p className="text-gray-700">
          - View a list of all instructors, their assigned courses, and the status of each course.
        </p>
      </div>

      <div className="bg-[#0b1019] p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Course Assignments
        </h2>
        <p className="text-gray-700">
          - Assign courses to instructors and track the status of each course.
        </p>
        <p className="text-gray-700">
          - Monitor the deadline and completion of each course.
        </p>
      </div>

      <div className="bg-[#0b1019] p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Task Management
        </h2>
        <p className="text-gray-700">
          - Assign lectures to instructors and ensure no one is double-assigned at the same time.
        </p>
        <p className="text-gray-700">
          - Manage and view tasks with specific dates and deadlines to avoid conflicts.
        </p>
      </div>

      <div className="bg-[#0b1019] p-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Instructor and Course Tracking
        </h2>
        <p className="text-gray-700">
          - Track the instructors' performance, courses, and progress over time.
        </p>
        <p className="text-gray-700">
          - Ensure that instructors are only assigned tasks during available time slots, avoiding double tasks at the same time.
        </p>
      </div>
    </div>
  );
}

export default Index;
