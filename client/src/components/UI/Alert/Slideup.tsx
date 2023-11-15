// SlideUpMessage.tsx
import React, { useEffect, useState } from "react";

interface SlideUpMessageProps {
  message: string;
  show: boolean;
  fail?: boolean;
}

const SlideUpMessage: React.FC<SlideUpMessageProps> = ({
  message,
  show,
  fail,
}) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        className={`bg-gray-500 font-bold text-lg rounded bg-opacity-80 p-2 text-gray-200 absolute bottom-0 transition-all duration-100 ${
          show ? "animate-slide-up" : "opacity-0"
        } ${fail ? "text-red-600 bg-rose-300" : ""}`}
        onAnimationEnd={onAnimationEnd}
      >
        {message}
      </div>
    )
  );
};

export default SlideUpMessage;
