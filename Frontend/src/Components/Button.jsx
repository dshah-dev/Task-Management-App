import React from "react";

function Button({ children, onClick, type = "button", variant = "primary" }) {
  const styles =
    variant === "primary"
      ? "bg-blue-400 text-white hover:bg-blue-500"
      : variant === "update"
        ? "bg-green-400 text-white hover:bg-green-500 text-sm "
        : variant === "delete"
          ? "text-red-500 bg-white text-sm hover:bg-red-500 hover:text-white "
          : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} w-full bg-blue-400 py-2 px-4 rounded-md hover:bg-blue-500 transition-colors font-semibold shadow-sm`}
    >
      {children}
    </button>
  );
}

export default Button;
