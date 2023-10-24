import { useState } from "react";
import Image from "next/image";
import { LeftArrow, RightArrow } from "../UI/Button/ArrowButton";
import Slide from "../UI/Slide";

interface CarouselProps {
  images: string[];
}

function CarouselProduct({ images }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((oldCurrentSlide) =>
      oldCurrentSlide === images.length - 1 ? 0 : oldCurrentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((oldCurrentSlide) =>
      oldCurrentSlide === 0 ? images.length - 1 : oldCurrentSlide - 1
    );
  };

  return (
    <div className="relative flex items-center w-full h-full overflow-hidden">
      <div className="w-[100vh] h-[500px]">
        <div
          className="absolute top-0 left-0 flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((img, idx) => (
            <Slide key={idx} image={img} />
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <LeftArrow onclick={prevSlide} />
          <RightArrow onclick={nextSlide} />
        </>
      )}
    </div>
  );
}

export default CarouselProduct;
