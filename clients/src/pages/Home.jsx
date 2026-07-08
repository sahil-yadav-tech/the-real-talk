import ChatSidebar from "../components/layout/ChatSidebar/index";
import Sidebar from "../components/layout/Sidebar/Sidebar"
const Home = () => {
    return (
        <div className="flex">

            <Sidebar />
            <ChatSidebar />
            <div className="flex-1 bg-gray-50">
                
            </div>

        </div>
    );
};

export default Home;