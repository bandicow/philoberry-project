import Card from "../Card/GalleryCard";
import React from "react";

import Image from "next/image";
import { Artwork } from "@prisma/client";
import { useHover } from "@/src/hooks/useHover";

interface GalleryCardProps {
  imageInfo: Artwork;
}

const GalleryModal = ({ imageInfo }: GalleryCardProps) => {
  const { isHover, openHoverModal, closeHoverModal } = useHover(); // Use the hook

  return (
    <div
      style={{
        position: "fixed",
        top: `${window.scrollY}px`,
        left: "50%",
        transform: "translate(-50%,-2%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <div className="flex items-center p-2 text-black border test__body w-[85vw] h-[85vh] overflow-hidden">
          <div
            className="relative flex items-center justify-center w-1/2 h-full"
            onMouseEnter={openHoverModal}
          >
            <Image
              src={imageInfo.s3key}
              alt={imageInfo.title}
              // fill // Add this line
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex-col items-center justify-center w-1/2 h-full p-3 ml-1 border border-blue-700">
            <h1 className="mb-3 text-4xl font-bold">
              작품명 : {imageInfo.title}
            </h1>
            <p>작품 규격 : {imageInfo.size}</p>
            <p>재료 : {imageInfo.material}</p>
            <p>작품 설명 : {imageInfo.description}</p>
          </div>
        </div>
      </Card>
      {isHover && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseLeave={closeHoverModal}
        >
          <Image
            src={imageInfo.s3key}
            alt={imageInfo.title}
            fill
            objectFit="contain"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryModal;
