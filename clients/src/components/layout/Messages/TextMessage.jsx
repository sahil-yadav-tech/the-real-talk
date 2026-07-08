import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";
import ReactionBar from "./ReactionBar";

const TextMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>

      <div className="relative max-w-[420px]">

        <div
          className={`
            px-5
            py-4
            rounded-3xl
            shadow-sm
            ${
              isMe
                ? "bg-violet-600 text-white rounded-br-md"
                : "bg-white text-gray-800 rounded-bl-md"
            }
          `}
        >
          <p className="leading-7 text-[15px]">
            {message.text}
          </p>

          <div className="flex justify-end items-center gap-2 mt-3">

            <MessageTime time={message.time} isMe={isMe} />

            {isMe && (
              <MessageStatus status={message.status} />
            )}

          </div>

        </div>

        {message.reactions && (
          <ReactionBar
            reactions={message.reactions}
          />
        )}

      </div>

    </div>
  );
};

export default TextMessage;