import ChatHeader from "./ChatHeader";
import SearchBar from "./SearchBar";
import RecentChats from "./RecentChats";
import ChatList from "./ChatList";

const ChatSidebar = () => {
  return (
    <aside className="w-[440px] h-screen bg-[#f8f8fb] border-r border-gray-200 flex flex-col">
      <ChatHeader />
      <SearchBar />
      <RecentChats />
      <ChatList />
    </aside>
  );
};

export default ChatSidebar;
