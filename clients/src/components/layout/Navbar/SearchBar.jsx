// components/layout/Navbar/SearchBar.jsx
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex items-center bg-gray-100 rounded-full px-4 h-11 w-[320px]"
    >
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent outline-none ml-3 w-full text-sm"
        aria-label="Search"
      />
    </form>
  );
}