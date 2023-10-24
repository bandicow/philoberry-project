"use client";
import Image from "next/image";
import Card from "../UI/Card/GalleryCard";
import GalleryModal from "../UI/Modal/GalleryModal";
import { Artwork } from "@prisma/client";
import { useModal } from "../../hooks/useModal"; // Import the hook

const GalleryImage = (props: Artwork) => {
  const { isOpen, openModal, closeModal } = useModal(); // Use the hook

  return (
    <div>
      <li onClick={openModal} className="flex-col items-center">
        <Card>
          <div className="w-auto max-h-[600px] h-auto overflow-hidden">
            <Image
              className="w-full h-auto"
              src={props.s3key}
              alt={props.title}
              width={500}
              height={300}
              loading="lazy"
            />
          </div>
        </Card>
      </li>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
        >
          <div onClick={(e) => e.stopPropagation()}>
            {/* Prevent event bubbling */}
            <GalleryModal imageInfo={props} onModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
