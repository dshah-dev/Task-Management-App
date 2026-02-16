import React from "react";

function Input({ variant = "primary", label, error, ...props }) {
  const variants = {
    primary: {
      input:
        "w-full border rounded p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500",
      label: "text-black",
    },
    searchBar: {
      input: "p-2 border border-white text-white rounded-lg min-w-16 w-full shadow-lg",
      label: "text-white",
    },
    auth: {
      input:
        "w-full bg-input-bg rounded-lg border-input-border border-[1.15px] px-4 py-2 text-white outline-none focus:border-gold focus:ring-0",
      label: "text-white",
    },
  };

  const activeVariant = variants[variant] || variants.primary;

  return (
    <div>
      {label && (
        <label className={`${activeVariant.label} block text-sm mb-1`}>
          {label}
        </label>
      )}
      <input {...props} className={activeVariant.input} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Input;
