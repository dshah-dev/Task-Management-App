import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Internet connection lost.", { duration: 3000 });
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {   //the actual browser status 
      setIsOnline(true);
      toast.success("You are back online!");
    } else {
      setIsOnline(false);
      toast.error("Still offline. Please check your Wi-Fi or data.");
    }
  };

  return { isOnline, handleRetry };
};