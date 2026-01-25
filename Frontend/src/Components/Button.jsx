import React from "react";

function Button({ children, onClick, type = "button", variant = "primary" }) {
  const styles =
    variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold shadow-sm`}
    >
      {children}
    </button>
  );
}

export default Button;