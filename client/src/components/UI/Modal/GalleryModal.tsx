"use client";
import Card from "../Card/GalleryCard";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Artwork } from "@prisma/client";
import { useFullScreen } from "@/src/hooks/useFullScreen";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import {
  faMagnifyingGlassPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DetailInfo from "@/src/components/Gallery/DetailInfo";
import IsSold from "../mix/IsSold";
import IsFullScreen from "../mix/IsFullScreen";
import "@/styles/tailwind.css";
import GallerySwiper from "../../Gallery/GallerySwiper";
import { getArtworkDetail } from "@/lib/action";
import { useGalleryStore } from "@/utils/store/galleryStore";

interface GalleryCardProps {
  onModal: (id: number) => void;
  artworkId: number;
}
interface InfoProps {
  label: string;
  value: string | number | string[] | null;
}

interface ArtworkDetail extends Artwork {
  artworkImages: string[];
}

const GalleryModal = ({ onModal, artworkId }: GalleryCardProps) => {
  const { isFullScreen, openFullScreen, closeFullScreen } = useFullScreen(); // Use the hook
  const { width, height } = useWindowSize();
  const zoomInIcon: IconDefinition = faMagnifyingGlassPlus;
  const closeIcon: IconDefinition = faXmark;

  const store = useGalleryStore();

  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail | null>(
    null
  );

  let DetailInfos: InfoProps[] = [];

  if (artworkDetail) {
    DetailInfos = [
      { label: "규격", value: artworkDetail.size },
      { label: "재료", value: artworkDetail.material },
      { label: "가격", value: artworkDetail.price },
      { label: "작품 설명", value: artworkDetail.description },
    ];
  }

  useEffect(() => {
    const fetchArtworks = async () => {
      const data = await getArtworkDetail(artworkId);
      setArtworkDetail(data);
    };

    fetchArtworks();
  }, [artworkId]);

  return (
    artworkDetail && (
      <div
        style={{
          top:
            width > height ? `${window.scrollY}px` : `${window.scrollY + 40}px`,
          left: "50%",
          transform: "translate(-50%,-2%)",
        }}
        className="fixed flex items-center justify-center mt-5"
      >
        <Card>
          <div
            className={`hide-scrollbar flex-col tabletLandscape:flex tabletLandscape:flex-row items-center p-2 text-black border test__body w-[85vw] h-[85vh] overflow-scroll tabletLandscape:overflow-hidden `}
          >
            <FontAwesomeIcon
              className="absolute z-10 scale-150 top-3 right-5"
              icon={closeIcon}
              onClick={() => onModal(artworkId)}
            />
            <div className="relative flex items-center justify-center w-full h-auto tabletLandscape:w-2/3 ">
              <FontAwesomeIcon
                className="absolute top-0 zoombtn"
                icon={zoomInIcon}
                onClick={openFullScreen}
              />
              <div className="relative w-5/6">
                {artworkDetail && (
                  <GallerySwiper images={artworkDetail.artworkImages} />
                )}
              </div>
            </div>
            <div className="flex-col items-center justify-center w-full h-full p-10 ml-1 tabletLandscape:w-1/3 ">
              <IsSold sold={artworkDetail.isSold} />

              <h1 className="mt-5 mb-3 text-2xl font-bold pb-1 border-b-2 border-b-gray-300">
                {artworkDetail.title}
              </h1>
              {DetailInfos.map((info, index) => (
                <DetailInfo key={index} {...info} />
              ))}
              <div className="mb-5 border-t-2 mt-28 border-t-gray-700">
                <DetailInfo label="구매 문의" value={"인스타그램"} />
              </div>
            </div>
          </div>
        </Card>
        <IsFullScreen
          isFullScreen={isFullScreen}
          closeFullScreen={closeFullScreen}
          image={artworkDetail.artworkImages[store.activeIndex]}
        />
      </div>
    )
  );
};

export default GalleryModal;
