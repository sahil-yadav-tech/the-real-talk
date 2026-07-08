import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "../MessageInput";

const ChatWindow = () => {
  return (
    <section className="flex flex-col flex-1 h-screen bg-[#f5f7fb]">

      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <ChatBody />

      {/* Bottom Input */}
      <MessageInput />

    </section>
  );
};

export default ChatWindow;