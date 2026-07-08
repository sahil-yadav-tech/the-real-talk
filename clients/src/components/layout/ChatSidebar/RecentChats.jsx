import { MoreVertical } from "lucide-react";
import RecentChatItem from "./RecentChatItem";
import { RecentChatsData } from "./ChatData";

const RecentChats = () => {
  return (
    <div className="px-6 mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-800 font-bold text-[1.2rem]">Recent Chats</h2>

        <MoreVertical className="text-gray-500 h-4" />
      </div>

      <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-hide">
        {RecentChatsData.map((chat) => (
          <RecentChatItem
            key={chat.id}
            chat={chat}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentChats;
