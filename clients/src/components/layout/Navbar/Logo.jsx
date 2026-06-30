// components/layout/Navbar/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center font-bold text-orange-500">
        S
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Sunday</h1>
    </Link>
  );
}