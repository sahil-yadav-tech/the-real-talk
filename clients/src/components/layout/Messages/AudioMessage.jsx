import { Play } from "lucide-react";
import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const AudioMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-3xl px-5 py-4 shadow-sm flex items-center gap-4 ${
          isMe ? "bg-violet-600 text-white" : "bg-white"
        }`}
      >
        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
          <Play size={16} fill="black" />
        </button>

        <div className="w-52 h-1 bg-gray-300 rounded-full"></div>

        <span>{message.duration}</span>

        <MessageTime time={message.time} isMe={isMe} />

        {isMe && <MessageStatus status={message.status} />}
      </div>
    </div>
  );
};

export default AudioMessage;
