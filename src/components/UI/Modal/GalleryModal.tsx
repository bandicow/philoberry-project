import Card from "../Card/GalleryCard";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { Artwork } from "@prisma/client";
import { useFullScreen } from "@/src/hooks/useFullScreen";
import { useModal } from "@/src/hooks/useModal";
import {
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DetailInfo from "@/src/components/Gallery/DetailInfo";
interface GalleryCardProps {
  imageInfo: Artwork;
  onModal: () => void;
}

interface InfoProps {
  label: string;
  value: string | number | string[];
}

const GalleryModal = ({ imageInfo, onModal }: GalleryCardProps) => {
  const { isFullScreen, openFullScreen, closeFullScreen } = useFullScreen(); // Use the hook
  const { closeModal } = useModal();

  const zoomInIcon: IconDefinition = faMagnifyingGlassPlus;
  const zoomOutIcon: IconDefinition = faMagnifyingGlassMinus;
  const closeIcon: IconDefinition = faXmark;

  const DetailInfos: InfoProps[] = [
    { label: "작품 정보", value: [imageInfo.size, imageInfo.material] },
    { label: "가격", value: imageInfo.price },
    { label: "작품 설명", value: imageInfo.description },
  ];

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
        <div
          className={`flex items-center p-2 text-black border test__body w-[85vw] h-[85vh] overflow-hidden`}
        >
          <FontAwesomeIcon
            className="fixed top-7 right-7"
            icon={closeIcon}
            onClick={onModal}
          ></FontAwesomeIcon>
          <div className="relative flex items-center justify-center w-1/2 h-full bg-gray-200 ">
            <FontAwesomeIcon
              className="absolute text-gray-600 top-3 right-3 hover:text-gray-800"
              icon={zoomInIcon}
              onClick={openFullScreen}
            />
            <Image
              src={imageInfo.s3key}
              alt={imageInfo.title}
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex-col items-center justify-center w-1/2 h-full p-5 ml-1 ">
            {imageInfo.isSold ? (
              <p className="text-3xl font-extrabold text-pink-800">판매완료</p>
            ) : (
              <p className="text-3xl font-extrabold text-sky-800">판매중</p>
            )}
            <h1 className="mt-5 mb-3 text-2xl font-bold">{imageInfo.title}</h1>
            {DetailInfos.map((info, index) => (
              <DetailInfo key={index} {...info} />
            ))}
            <div className="mb-5 border-t-2 mt-28 border-t-gray-700">
              <DetailInfo label="구매 문의" value={"인스타그램"} />
            </div>
          </div>
        </div>
      </Card>
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
            src={imageInfo.s3key}
            alt={imageInfo.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryModal;
