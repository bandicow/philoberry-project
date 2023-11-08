"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ArtistInfo, getArtistProps } from "../../Types/Art";
import Modal from "../UI/Modal/Modal";
import { useModal } from "../../hooks/useModal";

export const UploadGallery = ({ artistInfo }: getArtistProps) => {
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
      <h1 className="mb-2 font-extrabold">작품 선택</h1>
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
            <Modal artistInfo={selectedOption} />
          </div>
          <button
            onClick={closeModal}
            className="fixed p-2 text-white bg-black rounded-full bottom-1 left-[55%]"
          >
            창 닫기
          </button>
        </div>
      )}
    </div>
  );
};
