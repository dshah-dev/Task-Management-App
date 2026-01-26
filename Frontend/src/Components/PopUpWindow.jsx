import React from "react";

function PopUpWindow({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black mr-3">
            Close 
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default PopUpWindow;
