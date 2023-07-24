import React, { useState } from "react";
import Link from "next/link";

export const Mainpage = () => {
  const [isSaleShopHovered, setIsSaleShopHovered] = useState(false);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  const handleSaleShopMouseEnter = () => {
    setIsSaleShopHovered(true);
  };

  const handleSaleShopMouseLeave = () => {
    setIsSaleShopHovered(false);
  };

  const handleGalleryMouseEnter = () => {
    setIsGalleryHovered(true);
  };

  const handleGalleryMouseLeave = () => {
    setIsGalleryHovered(false);
  };

  const Photographer = "전세계";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-2xl text-white uppercase bg-black">
      <h1 className={"mb-5 font-bold"}>PhiloBerry studio</h1>
      <h1 className={"mb-5 font-bold"}>X</h1>
      <h1 className={"mb-20 font-bold"}>{Photographer}</h1>
      <ul className="mt-10vh">
        <Link
          href="/sale"
          className="flex float-left mr-10 border-b border-white m-30"
        >
          <div
            className={`transition-transform duration-500 ease-in-out ${
              isSaleShopHovered ? "transform -translate-x-10" : ""
            }`}
            onMouseEnter={handleSaleShopMouseEnter}
            onMouseLeave={handleSaleShopMouseLeave}
          >
            goods shop
          </div>
        </Link>
        <Link
          href="/gallery"
          className="flex float-left border-b border-white m-30"
        >
          <div
            className={`transition-transform duration-500 ease-in-out ${
              isGalleryHovered ? "transform translate-x-10" : ""
            }`}
            onMouseEnter={handleGalleryMouseEnter}
            onMouseLeave={handleGalleryMouseLeave}
          >
            gallery
          </div>
        </Link>
      </ul>
    </div>
  );
};
