import React, { useEffect, useState } from "react";

const useBrowserVisibility = () => {
  const [isVisible, setIsVisible] = useState({ status: true, message: "" });
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsVisible({
          status: true,
          message: "The browser window is currently open and visible.",
        });
      } else if (document.visibilityState === "hidden") {
        setIsVisible({
          status: false,
          message: "The browser window is currently minimized and not visible.",
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return isVisible;
};

export default useBrowserVisibility;
