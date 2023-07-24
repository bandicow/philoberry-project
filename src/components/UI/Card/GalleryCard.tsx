import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const GalleryCard: React.FC<CardProps> = (props) => {
  return (
    <div className="w-2/3 p-0 mb-4 bg-white border rounded-md shadow-lg cursor-pointer h-3/6 before:bg-black before:bg-opacity-20 hover:bg-red-100 active:bg-red-200">
      <div className="p-4">
        <div className="">{props.children}</div>
      </div>
    </div>
  );
};

export default GalleryCard;
