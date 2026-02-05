import React from "react";

function DateInput({ label, variant = "primary", error, value, onChange, name, ...props }) {
  const styles =
    variant === "auth"
      ? "bg-input-bg border-input-border text-white focus:ring-gold rounded-lg "
      : variant === "primary"
      ? "bg-white border-gray-300 text-gray-900 focus:ring-blue-400 rounded-md"
      : "bg-gray-100 border-transparent text-gray-800";

  return (
    <div className="w-full text-left">
      {label && (
        <label className={`block text-sm font-medium mb-1 ${variant === 'auth' ? 'text-white' : 'text-gray-600'}`}>
          {label}
        </label>
      )}
      
      <input
        type="date"
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`${styles} w-full border p-2.5 outline-none shadow-sm focus:ring-2 block `}
        {...props}
      />     
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
    </div>
  );
}

export default DateInput;