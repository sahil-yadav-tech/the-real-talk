import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const ImageMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-3xl p-3 shadow-sm max-w-[480px] ${
          isMe ? "bg-violet-600" : "bg-white"
        }`}
      >
        <div
          className={`grid gap-2 ${
            message.images.length === 1
              ? "grid-cols-1"
              : message.images.length === 2
              ? "grid-cols-2"
              : "grid-cols-2"
          }`}
        >
          {message.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="rounded-xl object-cover w-full h-44"
            />
          ))}
        </div>

        {message.caption && (
          <p
            className={`mt-3 ${
              isMe ? "text-white" : "text-gray-700"
            }`}
          >
            {message.caption}
          </p>
        )}

        <div className="flex justify-end items-center gap-2 mt-3">
          <MessageTime time={message.time} isMe={isMe} />
          {isMe && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
};

export default ImageMessage;