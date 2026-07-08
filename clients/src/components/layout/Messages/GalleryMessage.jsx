import MessageTime from "./MessageTime";
import MessageStatus from "./MessageStatus";

const GalleryMessage = ({ message }) => {
  const isMe = message.sender === "me";

  const visibleImages = message.images.slice(0, 4);
  const remaining = message.images.length - 4;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-3xl p-3 shadow-sm w-[360px] ${
          isMe ? "bg-violet-600" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-2 gap-2">
          {visibleImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt=""
                className="w-full h-36 rounded-xl object-cover"
              />

              {index === 3 && remaining > 0 && (
                <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  +{remaining}
                </div>
              )}
            </div>
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

        <div className="flex justify-end gap-2 mt-3">
          <MessageTime time={message.time} isMe={isMe} />
          {isMe && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
};

export default GalleryMessage;