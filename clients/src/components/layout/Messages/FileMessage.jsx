import { FileText } from "lucide-react";
import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const FileMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>

      <div
        className={`rounded-3xl p-5 shadow-sm flex gap-4 w-[340px] ${
          isMe ? "bg-violet-600 text-white" : "bg-white"
        }`}
      >
        <FileText size={34} />

        <div className="flex-1">

          <h3 className="font-semibold">
            {message.fileName}
          </h3>

          <p className="text-sm opacity-80">
            {message.fileSize}
          </p>

          <div className="flex justify-end gap-2 mt-4">

            <MessageTime time={message.time} isMe={isMe} />

            {isMe && (
              <MessageStatus status={message.status} />
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default FileMessage;