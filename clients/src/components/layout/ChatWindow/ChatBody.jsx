// ChatBody.jsx

import MessageList from "./MessageList";

const ChatBody = () => {
  return (
    <main
      className="flex-1 overflow-y-auto bg-[#f5f7fb] bg-cover bg-center px-8 py-6"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
      }}
    >
      <MessageList />
    </main>
  );
};

export default ChatBody;