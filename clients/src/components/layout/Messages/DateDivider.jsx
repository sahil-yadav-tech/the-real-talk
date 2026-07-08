const DateDivider = ({ date }) => {
  return (
    <div className="flex items-center my-8">

      <div className="flex-1 h-px bg-gray-300"></div>

      <span className="mx-4 px-4 py-1 rounded-full bg-white text-sm text-gray-500 shadow-sm">
        {date}
      </span>

      <div className="flex-1 h-px bg-gray-300"></div>

    </div>
  );
};

export default DateDivider;