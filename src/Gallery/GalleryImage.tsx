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
          <div className="w-[900px] h-[600px] overflow-hidden rounded-xl">
            <Image
              className="w-full"
              src={props.image_url}
              alt={props.title}
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
            <GalleryModal imageUrl={props.image_url} title={props.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
