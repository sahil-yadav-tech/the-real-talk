// MessageList.jsx

import { conversation } from "./MessageData";

const MessageList = () => {
  return (
    <div className="flex flex-col gap-6">

      {conversation.messages.map((message) => {

        switch (message.type) {

          case "text":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md rounded-3xl px-5 py-4 shadow-sm ${
                    message.sender === "me"
                      ? "bg-violet-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 rounded-bl-md"
                  }`}
                >
                  <p>{message.text}</p>

                  <div
                    className={`mt-2 text-xs ${
                      message.sender === "me"
                        ? "text-violet-100"
                        : "text-gray-400"
                    }`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            );

          case "image":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-white rounded-3xl p-4 shadow-sm max-w-xl">

                  <div className="grid grid-cols-3 gap-2">

                    {message.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt=""
                        className="w-36 h-28 object-cover rounded-xl"
                      />
                    ))}

                  </div>

                  {message.caption && (
                    <p className="mt-3 text-gray-700">
                      {message.caption}
                    </p>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
                    {message.time}
                  </p>

                </div>
              </div>
            );

          case "video":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-white rounded-3xl p-3 shadow-sm w-[350px]">

                  <div className="relative">

                    <img
                      src={message.thumbnail}
                      alt=""
                      className="rounded-xl"
                    />

                    <button className="absolute inset-0 flex items-center justify-center">

                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-2xl">

                        ▶

                      </div>

                    </button>

                  </div>

                  <p className="text-xs text-gray-400 mt-3">
                    {message.time}
                  </p>

                </div>
              </div>
            );

          case "audio":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-white rounded-3xl px-5 py-4 shadow-sm flex items-center gap-4">

                  <button className="w-10 h-10 rounded-full bg-violet-600 text-white">
                    ▶
                  </button>

                  <div className="w-56 h-1 bg-gray-200 rounded-full"></div>

                  <span className="text-sm text-gray-500">
                    {message.duration}
                  </span>

                </div>
              </div>
            );

          case "file":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-white rounded-3xl px-5 py-4 shadow-sm flex items-center gap-4 w-[330px]">

                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center font-bold text-violet-700">
                    {message.extension}
                  </div>

                  <div className="flex-1">

                    <h4 className="font-semibold">
                      {message.fileName}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {message.fileSize}
                    </p>

                  </div>

                </div>
              </div>
            );

          case "link":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-white rounded-3xl shadow-sm overflow-hidden w-[420px]">

                  <img
                    src={message.image}
                    alt=""
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-4">

                    <h4 className="font-semibold">
                      {message.title}
                    </h4>

                    <p className="text-gray-500 text-sm mt-2">
                      {message.description}
                    </p>

                    <a
                      href={message.url}
                      className="text-violet-600 text-sm mt-3 inline-block"
                    >
                      {message.url}
                    </a>

                  </div>

                </div>
              </div>
            );

          case "call":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-white rounded-3xl shadow-sm px-5 py-4 flex items-center gap-4">

                  <div className="text-3xl">
                    {message.callType === "video" ? "📹" : "📞"}
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {message.statusText}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {message.duration}
                    </p>

                  </div>

                </div>
              </div>
            );

          case "reply":
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-white rounded-3xl shadow-sm max-w-md">

                  <div className="bg-violet-100 px-4 py-2 rounded-t-3xl text-sm">
                    {message.replyTo.text}
                  </div>

                  <div className="px-4 py-4">

                    <p>{message.text}</p>

                    <p className="text-xs text-gray-400 mt-2">
                      {message.time}
                    </p>

                  </div>

                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
export default MessageList;