const MessageTime = ({ time, isMe }) => {
  return (
    <span
      className={`text-xs ${
        isMe
          ? "text-violet-100"
          : "text-gray-400"
      }`}
    >
      {time}
    </span>
  );
};

export default MessageTime;