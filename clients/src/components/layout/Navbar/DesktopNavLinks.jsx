// components/layout/Navbar/DesktopNavLinks.jsx
import { NavLink } from "react-router-dom";

export default function DesktopNavLinks({ links }) {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            `text-gray-600 hover:text-black transition font-medium ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}