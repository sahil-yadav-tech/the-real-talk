const ReactionBar = ({ reactions }) => {
  return (
    <div className="absolute -bottom-4 right-4 bg-white rounded-full shadow px-2 py-1 flex gap-1">

      {reactions.map((emoji, index) => (
        <span
          key={index}
          className="text-sm"
        >
          {emoji}
        </span>
      ))}

    </div>
  );
};

export default ReactionBar;