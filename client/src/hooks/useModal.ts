import { useState, useEffect } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  function openModal(id: number): void {
    setOpenModalId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return { isOpen, openModal, closeModal, openModalId };
};
