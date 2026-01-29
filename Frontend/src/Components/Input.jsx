import React from "react";

function Input({ variant = "primary", label, error, ...props }) {
  const styles =
    variant === "primary"
      ? "w-full border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
      : variant === "searchBar"
        ? "p-2 border rounded-lg w-full min-w-lg shadow-lg"
        : "w-full border rounded p-2 outline-none";
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`${styles}w-full border rounded p-2 outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Input;
