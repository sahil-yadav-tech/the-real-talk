const Button = ({
  children,
  type = "button",
  loading = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`
        w-full
        bg-blue-600
        text-white
        py-3
        rounded-lg
        font-medium
        hover:bg-blue-700
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;