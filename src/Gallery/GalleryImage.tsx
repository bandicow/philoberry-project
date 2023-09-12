import React, { useState } from "react";
import { GalleryImage } from "../Types/Client";
import Image from "next/image";
import Card from "../components/UI/Card/Card";
import { useRouter } from "next/router";
import GalleryModal from "./GalleryModal";

const GalleryImage = (props: GalleryImage) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  //모달창
  const ModalOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const modalClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const showDetailHandler = () => {
    router.push(
      { pathname: "/gallery/[galleryId]", query: { galleyid: props.id } },
      "/gallery/" + props.id
    );
  };

  return (
    <div>
      <li onClick={ModalOpen} className="flex-col items-center">
        <Card>
          <div className="w-[900px] h-[600px] overflow-hidden rounded-xl">
            <Image
              className="w-full"
              src={props.imageUrl}
              alt={props.caption}
              width={200}
              height={100}
            />
          </div>
        </Card>
      </li>
      {isOpen && (
        <div
          onClick={modalClose}
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black opacity-60"
        >
          <GalleryModal caption={props.caption} />
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
