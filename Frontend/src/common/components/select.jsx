import React from "react";

function Select({ label, options, variant = "primary", error, ...props }) {
  const styles =
    variant === "auth"
      ? "bg-input-bg border-input-border text-white focus:ring-gold rounded-lg"
      : variant === "primary"
        ? "bg-white border-gray-300 text-gray-900 focus:ring-blue-400 rounded-md"
        : "bg-gray-100 border-transparent text-gray-800";

  return (
    <div className="w-full text-left">
      {label && (
        <label
          className={`block text-sm font-medium mb-1 ${variant === "auth" ? "text-white" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}
      <select
        className={`${styles} w-full border p-2.5 cursor-pointer shadow-md focus:ring-2 min-w-16`}
        {...props}
      >
        <option value="">Select {label}</option>
        {options?.map((opt, index) => (
          <option
            key={index}
            value={typeof opt === "string" ? opt : opt.value}
            className={variant === "auth" ? "bg-input-bg" : "bg-white"}
          >
            {typeof opt === "string" ? opt : opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Select;
