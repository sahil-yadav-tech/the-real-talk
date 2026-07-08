import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const ReplyMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>

      <div
        className={`rounded-3xl overflow-hidden max-w-md shadow ${
          isMe ? "bg-violet-600 text-white" : "bg-white"
        }`}
      >
        <div className="bg-black/10 px-4 py-3 text-sm">
          {message.replyTo.text}
        </div>

        <div className="p-4">

          <p>{message.text}</p>

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

export default ReplyMessage;