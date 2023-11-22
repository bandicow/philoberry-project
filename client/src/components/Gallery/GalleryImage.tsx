"use client";
import React, { useCallback, memo } from "react";
import Image from "next/image";
import Card from "../UI/Card/GalleryCard";
import GalleryModal from "../UI/Modal/GalleryModal";
import { Artwork } from "@prisma/client";
import { useModal } from "../../hooks/useModal"; // Import the hook

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  imageInfo: Artwork;
};

const ModalWrapper = ({ isOpen, closeModal, imageInfo }: ModalProps) => {
  return isOpen ? (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      style={{ zIndex: 1000 }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <GalleryModal imageInfo={imageInfo} onModal={closeModal} />
      </div>
    </div>
  ) : null;
};

const GalleryImage = (props: Artwork) => {
  const { isOpen, openModal, closeModal } = useModal();
  const handleClick = useCallback(openModal, [openModal]);

  return (
    <div>
      <li onClick={handleClick} className="mb-5">
        <Card>
          <div className="relative w-72 max-h-[600px] h-72 tablet:h-[400px] tablet:w-[400px] tabletLandscape:w-[600px] desktop:h-[600px] overflow-hidden object-cover">
            <Image
              src={props.s3key}
              alt={props.title}
              fill
              object-fit="cover"
              sizes="(max-width: 600px) 400px, (max-width: 900px) 600px, 800px"
              priority
            />
          </div>
        </Card>
      </li>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          style={{ zIndex: 1000 }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ModalWrapper
              isOpen={isOpen}
              closeModal={closeModal}
              imageInfo={props}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(GalleryImage);
