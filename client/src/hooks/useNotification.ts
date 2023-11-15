import { useState } from "react";

export const useNotification = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [shake, setShake] = useState(false);

  const startSuccessNotification = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const startFailureNotification = () => {
    setShowFailureMessage(true);
    setShake(true);
    setTimeout(() => {
      setShowFailureMessage(false);
      setShake(false);
    }, 5000);
  };

  return {
    showSuccessMessage,
    showFailureMessage,
    shake,
    startSuccessNotification,
    startFailureNotification,
  };
};
