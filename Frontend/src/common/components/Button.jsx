import React from "react";

function Button({ children, onClick, type = "button", variant = "primary",className = "" }) {
  const variantStyles = {
    primary: "btn-primary",
    // update: "btn-update",
    // delete: "btn-delete",
    auth: "btn-auth",
    profileBtn: "btn-profile",
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  const styles = variantStyles[variant] || variantStyles.default;
  
  return (
    <button type={type} onClick={onClick} className={`btn-base ${styles} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
