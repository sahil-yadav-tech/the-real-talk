// components/layout/Navbar/MobileMenu.jsx
import { NavLink } from "react-router-dom";

export default function MobileMenu({ isOpen, links, isAuthenticated=true, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white rounded-2xl shadow-lg mt-3 p-5 space-y-5 border border-gray-100">
      {/* Navigation Links */}
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          onClick={onClose}
          className={({ isActive }) =>
            `block text-gray-700 font-medium text-lg ${
              isActive ? "text-orange-500" : "hover:text-black"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}

      {/* Auth Section */}
      <div className="border-t pt-4">
        {isAuthenticated ? (
          <NavLink
            to="/profile"
            onClick={onClose}
            className="w-full border border-gray-200 rounded-xl py-3 text-center block hover:bg-gray-50 transition"
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            onClick={onClose}
            className="w-full bg-black text-white rounded-xl py-3 text-center block hover:bg-gray-900 transition"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}