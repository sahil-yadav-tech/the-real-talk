import React from "react";
import { Link, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-8">User Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/dashboard"
            className="hover:bg-blue-700 p-2 rounded text-1xl"
          >
            Home
          </Link>
          <Link
            to="/dashboard/Detailsof"
            className="hover:bg-blue-700 p-2 rounded text-1xl"
          >
            Details OF Instructor
          </Link>
          <Link
            to="/dashboard/content"
            className="hover:bg-blue-700 p-2 rounded text-1xl"
          >
            Add Instructor
          </Link>
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-8 ">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
