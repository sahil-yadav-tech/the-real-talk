import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="px-4 mt-2 ">
      <div className="bg-white rounded-xl h-14 flex items-center px-4 shadow-sm">
        <input
          type="text"
          placeholder="Search For Contacts or Messages"
          className="flex-1 outline-none bg-transparent"
        />

        <Search className="text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
