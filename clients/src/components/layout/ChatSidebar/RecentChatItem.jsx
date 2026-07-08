const RecentChatItem = ({ chat }) => {
  return (
    <div className="flex flex-col items-center min-w-[75px] cursor-pointer">

      <div className="relative">

        <img
          src={chat.image}
          alt={chat.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        {chat.online && (
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white"></span>
        )}

      </div>

      <p className="mt-2 text-gray-600 text-lg">
        {chat.name}
      </p>

    </div>
  );
};

export default RecentChatItem;