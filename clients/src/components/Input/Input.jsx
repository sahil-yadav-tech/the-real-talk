import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-5">
        {label && (
          <label className="block mb-2 font-medium">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="w-full border rounded-lg px-4 py-3"
          {...props}
        />

        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;