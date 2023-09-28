import Card from "../components/UI/Card/GalleryCard";
import React from "react";

import Image from "next/image";
import { Artwork } from "@prisma/client";

interface GalleryCardProps {
  imageInfo: Artwork;
}

const GalleryModal = ({ imageInfo }: GalleryCardProps) => {
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
          <div className="flex items-center justify-center w-1/2 h-full">
            <Image
              src={imageInfo.image_url}
              alt={imageInfo.title}
              // fill // Add this line
              width={1000}
              height={1000}
              objectFit="contain" // Add this line
            />
          </div>
          <div className="flex-col items-center justify-center w-1/2 h-full p-3 ml-1 border border-blue-700">
            <h1 className="mb-3 text-4xl font-bold">
              작품명 : {imageInfo.title}
            </h1>
            <p>작품 규격 : {imageInfo.dimensions}</p>
            <p>재료 : {imageInfo.medium}</p>
            <p>작품 설명 : {imageInfo.descripton}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GalleryModal;
