import React from "react";

function PopUpWindow({
  isOpen,
  onClose,
  title,
  variant = "primary",
  children,
}) {
  if (!isOpen) return null;

  if (variant === "auth") {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 z-10">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-theme border rounded-2xl w-full max-w-6xl max-h-11/12 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
          <div className="flex justify-end p-3 absolute right-0 top-0 z-10">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors font-bold bg-black/20 rounded-full px-3"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto scrollbar-thin">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-10">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-all"
          >
            ✕
          </button>
        </div>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
}

export default PopUpWindow;
