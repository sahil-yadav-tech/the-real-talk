const TypingMessage = () => {
  return (
    <div className="flex justify-start">

      <div className="bg-white rounded-3xl rounded-bl-md px-5 py-4 shadow-sm">

        <div className="flex gap-2">

          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>

          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: ".2s" }}
          ></span>

          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: ".4s" }}
          ></span>

        </div>

      </div>

    </div>
  );
};

export default TypingMessage;