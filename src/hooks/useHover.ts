import { useState, useEffect } from "react";

export const useHover = () => {
  const [isHover, setIsHover] = useState(false);

  function openHoverModal() {
    setIsHover(true);
  }

  function closeHoverModal() {
    setIsHover(false);
  }

  return { isHover, openHoverModal, closeHoverModal };
};
