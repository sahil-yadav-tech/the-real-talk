import { MoreVertical } from "lucide-react";
import RecentChatItem from "./RecentChatItem";
import  {RecentChatsData}  from "./ChatData";

const RecentChats = () => {
  return (
    <div className="px-6 mt-8">

      <div className="flex justify-between items-center">

        <h2 className="font-bold text-4xl">
          Recent Chats
        </h2>

        <MoreVertical className="text-gray-500" />

      </div>

      <div className="flex gap-8 mt-8 overflow-x-auto scrollbar-hide">

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