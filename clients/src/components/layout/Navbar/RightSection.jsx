// components/layout/Navbar/RightSection.jsx
import { Bell, MessageCircleMore, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function RightSection({ isAuthenticated, user }) {
  if (isAuthenticated) {
    return (
      <div className="hidden md:flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="relative w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Message Button */}
        <button
          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
          aria-label="Messages"
        >
          <MessageCircleMore size={20} className="text-gray-600" />
        </button>

        {/* Profile Button */}
        <Link
          to="/profile"
          className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition"
        >
          <User size={18} />
          <span className="font-medium">Profile</span>
        </Link>

        {/* Avatar */}
        <img
          src={user?.avatar || "https://i.pravatar.cc/100"}
          alt={user?.name || "User"}
          className="w-11 h-11 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-orange-500 transition"
        />
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-4">
      <Link
        to="/login"
        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-900 transition"
      >
        <LogIn size={18} />
        Login
      </Link>
    </div>
  );
}