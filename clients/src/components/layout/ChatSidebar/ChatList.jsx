import { SlidersHorizontal } from "lucide-react";
import ChatCard from "./ChatCard";
import { ChatListData } from "./ChatData";

const ChatList = () => {
  return (
    <div className="flex-1 px-6 mt-10 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">All Chats</h2>

        <SlidersHorizontal className="text-gray-500" />
      </div>

      <div className="mt-8 space-y-5">
        {ChatListData.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
