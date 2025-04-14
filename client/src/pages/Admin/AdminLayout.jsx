import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiUsers, 
  FiBook, 
  FiList, 
  FiSettings,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";

function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const navItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      exact: true
    },
    {
      path: "/admin/instructordetails",
      name: "Instructors",
      icon: <FaChalkboardTeacher className="w-5 h-5" />,
      submenu: [
        { path: "/admin/instructordetais", name: "All Instructors" },
        { path: "/admin/instructordetails/add", name: "Add Instructor" }
      ]
    },
    {
      path: "/admin/courses",
      name: "Courses",
      icon: <FiBook className="w-5 h-5" />,
      submenu: [
        { path: "/admin/allcourse", name: "All Courses" },
        { path: "/admin/createcourse", name: "Create Course" }
      ]
    },
    {
      path: "/admin/lectures",
      name: "Lectures",
      icon: <FiList className="w-5 h-5" />,
      submenu: [
        { path: "/admin/lectures/schedule", name: "Schedule Lecture" },
        { path: "/admin/lectures/conflicts", name: "Check Conflicts" }
      ]
    },
    {
      path: "/admin/settings",
      name: "Settings",
      icon: <FiSettings className="w-5 h-5" />,
      exact: true
    }
  ];

  const isActive = (path, exact = false) => {
    return exact 
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 focus:outline-none"
        >
          {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-gray-900 text-gray-200 flex-shrink-0 transition-all duration-300`}
      >
        <div className="p-5 h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.path)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg ${isActive(item.path) ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'}`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {openSubmenu === item.path ? (
                        <FiChevronUp className="w-4 h-4" />
                      ) : (
                        <FiChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {openSubmenu === item.path && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block p-2 rounded-lg ${isActive(subItem.path, true) ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg ${isActive(item.path, item.exact) ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User/Settings */}
          <div className="mt-auto pt-4 border-t border-gray-700">
            <Link
              to="/admin/settings"
              className="flex items-center p-3 rounded-lg hover:bg-gray-800"
            >
              <FiSettings className="mr-3" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;