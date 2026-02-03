import React from "react";

function Button({ children, onClick, type = "button", variant = "primary" }) {
  const styles =
    variant === "primary"
      ? "bg-blue-400 text-white hover:bg-blue-500 rounded-md w-full"
      : variant === "update"
        ? "bg-green-400 text-white hover:bg-green-500 text-sm rounded-md w-full"
        : variant === "delete"
          ? "text-red-500 bg-white text-sm hover:bg-red-500 hover:text-white rounded-md w-full"
          : variant === "auth"
            ? "bg-light-purple text-white hover:bg-hover-purple shadow-lg rounded-md w-full"
          : variant === "profileBtn"
            ? "bg-light-purple text-gold hover:bg-hover-purple shadow-lg rounded-full w-[12.5rem]"

            : "bg-gray-200 text-gray-800 hover:bg-gray-300";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} py-2 px-4 font-semibold transition-all shadow-sm`}
    >
      {children}
    </button>
  );
}

export default Button;
