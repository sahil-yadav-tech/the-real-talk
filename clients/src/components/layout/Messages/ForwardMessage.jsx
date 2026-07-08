import { Forward } from "lucide-react";
import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const ForwardMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>

      <div
        className={`rounded-3xl shadow-sm max-w-md p-4 ${
          isMe ? "bg-violet-600 text-white" : "bg-white"
        }`}
      >

        <div className="flex items-center gap-2 text-sm opacity-70 mb-3">

          <Forward size={15} />

          <span>Forwarded</span>

        </div>

        <p>{message.text}</p>

        <div className="flex justify-end gap-2 mt-3">

          <MessageTime time={message.time} isMe={isMe} />

          {isMe && (
            <MessageStatus status={message.status} />
          )}

        </div>

      </div>

    </div>
  );
};

export default ForwardMessage;