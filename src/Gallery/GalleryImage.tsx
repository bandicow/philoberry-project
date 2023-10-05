"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "../components/UI/Card/GalleryCard";
import GalleryModal from "./GalleryModal";
import { Artwork } from "@prisma/client";

const GalleryImage = (props: Artwork) => {
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
          <div className="w-auto max-h-[600px] h-auto overflow-hidden">
            <Image
              className="w-full h-auto"
              src={props.s3key}
              alt={props.title}
              width={500}
              height={300}
              loading="lazy"
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
            <GalleryModal imageInfo={props} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
