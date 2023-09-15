"use client";
import React, { useState, useEffect } from "react";
import { GalleryImage } from "../Types/Client";
import Image from "next/image";
import Card from "../components/UI/Card/Card";
import GalleryModal from "./GalleryModal";

const GalleryImage = (props: GalleryImage) => {
  //모달창 상태
  const [isOpen, setIsOpen] = useState(false);
  // 모달창 위치

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => setIsOpen(false);

  // const top = window.scrollY + window.innerHeight / 2;

  return (
    <div>
      <li onClick={modalOpen} className="flex-col items-center">
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
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
        >
          <div onClick={(e) => e.stopPropagation()}>
            {/* Prevent event bubbling */}
            <GalleryModal imageUrl={props.imageUrl} caption={props.caption} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
