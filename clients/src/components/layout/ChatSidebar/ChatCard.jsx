import {
  Pin,
  CheckCheck,
  Image
} from "lucide-react";

const ChatCard = ({ chat }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between hover:shadow-md transition cursor-pointer">

      <div className="flex">

        <div className="relative">

          {chat.group ? (
            <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xl">
              {chat.initials}
            </div>
          ) : (
            <img
              src={chat.image}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}

          {chat.online && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></span>
          )}

        </div>

        <div className="ml-4">

          <h3 className="font-bold text-2xl">
            {chat.name}
          </h3>

          <div className="flex items-center gap-2 mt-1">

            {chat.group && (
              <Image
                size={16}
                className="text-gray-500"
              />
            )}

            <p className="text-gray-500 text-lg">
              {chat.message}
            </p>

          </div>

        </div>

      </div>

      <div className="flex flex-col items-end">

        <span className="text-gray-500">
          {chat.time}
        </span>

        <div className="flex items-center gap-2 mt-3">

          {chat.pin && (
            <Pin
              size={15}
              className="text-gray-400"
            />
          )}

          {chat.delivered && (
            <CheckCheck
              size={18}
              className="text-emerald-500"
            />
          )}

          {chat.unread > 0 && (
            <div className="bg-pink-500 text-white rounded-full px-3 py-1 text-sm font-bold">
              {chat.unread}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ChatCard;