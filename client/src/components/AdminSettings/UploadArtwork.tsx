"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ArtistInfo, getArtistProps } from "@/src/Types/Art";
import Modal from "../UI/Modal/Modal";
import { useModal } from "@/src/hooks/useModal";

export const UploadArtwork = ({ artistInfo }: getArtistProps) => {
  const [selectedOption, setSelectedOption] = useState<ArtistInfo | null>(null);
  const { isOpen, openModal, closeModal } = useModal(); // Use the hook

  const options = artistInfo.map((artist) => ({
    value: artist.name,
    label: artist.name,
  }));

  useEffect(() => {
    if (selectedOption && selectedOption.name) {
      openModal();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <div className="relative center">
      <h1 className="mb-2 font-extrabold">작가 선택</h1>
      <Select
        className="w-5/6"
        options={options}
        onChange={(option) => {
          const selectedArtist = option
            ? artistInfo.find((atrist) => atrist.name === option.value)
            : null;
          setSelectedOption(selectedArtist || null);
        }}
      />
      {isOpen && selectedOption && (
        <div
          onClick={closeModal}
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Modal artistInfo={selectedOption} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};
