"use client";
import { Navigation, Scrollbar, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import React, { useRef } from "react";

interface CarouselProps {
  images: string[];
}

function CarouselProduct({ images }: CarouselProps) {
  return (
    <Swiper
      className="mySwiper"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      pagination={{ clickable: true }}
      navigation
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      scrollbar={{ draggable: true }}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <Image src={img} alt={`${idx}`} width={300} height={300} />
        </SwiperSlide>
      ))}
      <div className="pagination"></div>
    </Swiper>
  );
}

export default CarouselProduct;