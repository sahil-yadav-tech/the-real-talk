import ChatSidebar from "../components/layout/ChatSidebar/index";
import Sidebar from "../components/layout/Sidebar/Sidebar"
const Home = () => {
    return (
        <div className="flex gap-2">

            <Sidebar />
            <ChatSidebar />
         <div 
                className="flex-1 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ 
                    backgroundImage: `url('./bg2.jpg')`,
               
                }}
            >
                
            </div>

        </div>
    );
};

export default Home;