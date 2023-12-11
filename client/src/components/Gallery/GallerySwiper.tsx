"use client";
import {
  Navigation,
  Scrollbar,
  Pagination,
  A11y,
  Keyboard,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import Image from "next/image";
import React, { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

interface CarouselProps {
  images: string[];
}

const GallerySwiper = ({ images }: CarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col tabletLandscape:flex-row-reverse ">
      <Swiper
        className="mySwiper2 relative h-screen w-full galleryimage "
        modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard, Thumbs]}
        pagination={{ clickable: true, type: "bullets" }}
        navigation
        keyboard={{ enabled: true }}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        onSwiper={setThumbsSwiper}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        scrollbar={{ draggable: true }}
      >
        {images.map((img, idx) => (
          <SwiperSlide
            className="w-full h-full bg-black bg-opacity-0 rounded-md"
            key={idx}
          >
            <Image
              src={img}
              alt={`${idx}`}
              fill
              objectFit="contain"
              priority={true}
              sizes="100%"
              className="rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="mySwiper gallerythumbs h-20 w-full mt-3 tabletLandscape:ml-48 relative rounded-md "
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10}
        slidesPerView={1}
        freeMode={true}
        watchSlidesProgress={true}
        onSwiper={setThumbsSwiper}
        direction="vertical"
        breakpoints={{
          0: {
            direction: "vertical",
          },
          1024: {
            direction: "horizontal",
          },
        }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <button>
              <Image
                src={img}
                alt={`${idx}`}
                fill
                objectFit="cover"
                priority={true}
                sizes="100%"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySwiper;
