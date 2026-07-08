// ChatHeader.jsx

import {
  Search,
  Phone,
  Video,
  EllipsisVertical,
} from "lucide-react";

import { conversation } from "./MessageData";

const ChatHeader = () => {
  const { user } = conversation;

  return (
    <header className="h-24 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="relative">

          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover"
          />

          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-[3px] border-white"></span>

        </div>

        <div>

          <h2 className="text-lg font-semibold text-gray-900">
            {user.name}
          </h2>

          <p className="text-sm text-green-500">
            {user.status}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-2">

        <button className="w-11 h-11 rounded-full hover:bg-gray-100 transition flex items-center justify-center">
          <Search size={20} />
        </button>

        <button className="w-11 h-11 rounded-full hover:bg-gray-100 transition flex items-center justify-center">
          <Phone size={20} />
        </button>

        <button className="w-11 h-11 rounded-full hover:bg-gray-100 transition flex items-center justify-center">
          <Video size={20} />
        </button>

        <button className="w-11 h-11 rounded-full hover:bg-gray-100 transition flex items-center justify-center">
          <EllipsisVertical size={20} />
        </button>

      </div>

    </header>
  );
};

export default ChatHeader;