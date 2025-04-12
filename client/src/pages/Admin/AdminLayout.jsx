import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900  p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin" className="hover:bg-gray-800 p-2 rounded">Dashboard</Link>
          <Link to="/admin/instructordetais" className="hover:bg-gray-800 p-2 rounded">Instructor Detais</Link>
          <Link to="/admin/createcourse" className="hover:bg-gray-800 p-2 rounded">Create Course</Link>
          <Link to="/admin/allcourse" className="hover:bg-gray-800 p-2 rounded">All Course</Link>
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-8 ">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
