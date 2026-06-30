// components/layout/Navbar/MobileToggleButton.jsx
import { Menu, X } from "lucide-react";

export default function MobileToggleButton({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}