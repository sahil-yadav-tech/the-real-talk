import { Play } from "lucide-react";
import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const VideoMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-3xl overflow-hidden shadow-sm w-[360px] ${
          isMe ? "bg-violet-600" : "bg-white"
        }`}
      >
        <div className="relative">

          <img
            src={message.thumbnail}
            alt=""
            className="w-full h-56 object-cover"
          />

          <button className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <Play size={22} fill="black" />
            </div>
          </button>

        </div>

        <div className="flex justify-end items-center gap-2 p-4">

          <MessageTime time={message.time} isMe={isMe} />

          {isMe && (
            <MessageStatus status={message.status} />
          )}

        </div>

      </div>
    </div>
  );
};

export default VideoMessage;