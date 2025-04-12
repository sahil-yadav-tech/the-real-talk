import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ links }) {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Dashboard</h2>
      <nav className="flex flex-col mt-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-3 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
