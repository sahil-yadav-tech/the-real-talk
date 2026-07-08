import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const LinkMessage = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>

      <div className="bg-white rounded-3xl overflow-hidden shadow w-[420px]">

        <img
          src={message.image}
          alt=""
          className="w-full h-48 object-cover"
        />

        <div className="p-4">

          <h3 className="font-semibold">
            {message.title}
          </h3>

          <p className="text-gray-500 mt-2">
            {message.description}
          </p>

          <a
            href={message.url}
            className="text-violet-600 mt-3 block"
          >
            {message.url}
          </a>

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

export default LinkMessage;