import React from "react";

const Skeleton = ({ children,className = "", variant = "normal", width, height }) => {
  const baseClass = "relative overflow-hidden bg-white/5 rounded animate-pulse";

  const variants = {
    normal: "",
    circle: "rounded-full",
    text: "h-3 w-full my-2 flex items-center justify-center",
  };

  const style = {
    width: width || (variant === "text" ? "100%" : "auto"),
    height: height || (variant === "text" ? "0.75rem" : "auto"),
  };

  return (
    <div
      className={`${baseClass} ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Skeleton;
