import { Plus, EllipsisVertical } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between py-6 px-4 ">
      <h1 className="text-[20px] font-bold text-gray-600">Chats</h1>

      <div className="flex items-center gap-2">
        <button className="w-6 h-6 rounded-full bg-violet-600 text-white flex justify-center items-center">
          <Plus size={16} />
        </button>

        <EllipsisVertical size={18} className="text-gray-500" />
      </div>
    </div>
  );
};

export default ChatHeader;
