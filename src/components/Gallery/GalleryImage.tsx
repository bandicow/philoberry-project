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
      <li onClick={openModal} className="mb-5">
        <Card>
          <div className="relative w-72 max-h-[600px] h-72 tablet:h-[400px] tablet:w-[400px] desktop:w-[600px] desktop:h-[600px] overflow-hidden object-cover">
            <Image
              src={props.s3key}
              alt={props.title}
              fill
              objectFit="cover"
              loading="lazy"
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
            {/* Prevent event bubbling */}
            <GalleryModal imageInfo={props} onModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
