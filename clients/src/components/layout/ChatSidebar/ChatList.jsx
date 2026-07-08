import { Funnel } from "lucide-react";
import ChatCard from "./ChatCard";
import { ChatListData } from "./ChatData";

const ChatList = () => {
  return (
    <div className="flex-1 px-6 mt-6 overflow-y-auto mb-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[1rem] text-gray-800">All Chats</h2>

        <Funnel height={16} className="text-gray-500 font-light " />
      </div>

      <div className="mt-4 space-y-4">
        {ChatListData.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
