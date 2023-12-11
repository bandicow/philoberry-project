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

function CarouselProduct({ images }: CarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <Swiper
        className="mySwiper2 relative "
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
            key={idx}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              minWidth: "200px",
            }}
          >
            <Image
              src={img}
              alt={`${idx}`}
              fill
              objectFit="cover"
              priority={true}
              sizes="100%"
              className="rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="mySwiper mt-3 h-32 relative rounded-md w-full"
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        onSwiper={setThumbsSwiper}
        centeredSlides={true}
        style={{
          minHeight: "100px",
          minWidth: "500px",
        }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <button>
              <Image
                src={img}
                alt={`${idx}`}
                fill
                objectFit="cover"
                priority={true}
                sizes="100%"
                className="h-full w-full block"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default CarouselProduct;
