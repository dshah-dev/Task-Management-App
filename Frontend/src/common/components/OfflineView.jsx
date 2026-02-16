import React from "react";

const OfflineView = ({ onRetry }) => {
  return (
    <div className="min-h-screen bg-theme flex flex-col items-center justify-center p-6 text-center">      
      <h1 className="text-3xl font-bold text-white mb-2">You are offline</h1>
      <p className="text-gray-400 max-w-sm mb-8">
         Please check your network and try again.
      </p>
      
      <button
        onClick={onRetry}
        className="px-10 py-3 bg-purple hover:bg-hover-purple text-white font-bold rounded-xl transition-all shadow-lg"
      >
        Retry
      </button>
    </div>
  );
};

export default OfflineView;