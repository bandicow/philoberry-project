import { useState, useEffect } from "react";

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function openFullScreen() {
    setIsFullScreen(true);
  }

  function closeFullScreen() {
    setIsFullScreen(false);
  }

  return { isFullScreen, openFullScreen, closeFullScreen };
};
