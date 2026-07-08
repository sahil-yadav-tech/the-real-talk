import { Phone, Video } from "lucide-react";
import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const CallMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>

      <div
        className={`rounded-3xl px-5 py-4 shadow flex items-center gap-4 ${
          isMe ? "bg-violet-600 text-white" : "bg-white"
        }`}
      >
        {message.callType === "video" ? (
          <Video size={26} />
        ) : (
          <Phone size={26} />
        )}

        <div>

          <h4 className="font-semibold">
            {message.statusText}
          </h4>

          <p className="text-sm opacity-80">
            {message.duration}
          </p>

        </div>

        <div className="ml-auto flex items-center gap-2">

          <MessageTime time={message.time} isMe={isMe} />

          {isMe && (
            <MessageStatus status={message.status} />
          )}

        </div>

      </div>

    </div>
  );
};

export default CallMessage;