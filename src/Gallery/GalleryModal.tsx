import Card from "../components/UI/Card/GalleryCard";
import React from "react";

import Image from "next/image";

interface GalleryModalProps {
  title: string;
  imageUrl: string;
}

const GalleryModal = (props: GalleryModalProps) => {
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
          <Image
            className="w-1/2"
            src={props.imageUrl}
            alt={props.title}
            width={200}
            height={100}
          />
          <div className="w-1/2 h-full border border-blue-700">
            <p>{props.title}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GalleryModal;
