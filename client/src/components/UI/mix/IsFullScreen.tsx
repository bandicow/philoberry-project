import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const zoomOutIcon = faMagnifyingGlassMinus;

type IsFullScreenProps = {
  isFullScreen: boolean;
  closeFullScreen: () => void;
  image: string;
};

export default function IsFullScreen({
  isFullScreen,
  closeFullScreen,
  image,
}: IsFullScreenProps) {
  return (
    <div>
      {isFullScreen && (
        <div
          className={`fixed top-0 left-0 flex items-center justify-center w-full h-full ${
            isFullScreen ? "animate-fade-in" : ""
          }`}
        >
          <FontAwesomeIcon
            className="absolute z-50 text-gray-700 top-10 right-5 hover:text-gray-800"
            icon={zoomOutIcon}
            onClick={closeFullScreen}
          />
          <Image
            src={image}
            alt={"전체이미지"}
            fill
            object-fit="cover"
            style={{ overflow: "hidden" }}
          />
        </div>
      )}
    </div>
  );
}
