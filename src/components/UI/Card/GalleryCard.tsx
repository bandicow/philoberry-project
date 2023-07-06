import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const GalleryCard: React.FC<CardProps> = (props) => {
  return (
    <div
      className="relative items-start justify-center w-full mb-4 before:absolute before:inset-0 before:rounded-md before:bg-black before:bg-opacity-20 before:content-['']   bg-white border border-gray-100 rounded-md shadow-lg cursor-pointer hover:bg-red-100 active:bg-red-200"
      style={{ height: "fit-content" }}
    >
      <div className="p-4">
        <div className="">{props.children}</div>
      </div>
    </div>
  );
};

export default GalleryCard;
