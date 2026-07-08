import ChatSidebar from "../components/layout/ChatSidebar/index";
import ChatWindow from "../components/layout/ChatWindow";
import Sidebar from "../components/layout/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="flex gap-2">
      <Sidebar />
      <ChatSidebar />
      <div
        className="flex-1  "
      >
        <ChatWindow />
      </div>
    </div>
  );
};

export default Home;
