// // © 2018 PEACEMINUSONETERMS OF USE PRIVACY POLICY HELPINSTAGRAM
// // PEACEMINUSONE. CEO.DAMI KWON 4F, 17-6, DOSAN-DAERO 90-GIL, GANGNAM-GU, SEOUL, REPUBLIC OF KOREA.

// //   HELP@PEACEMINUSONE.COM 02 - 6253 - 5012 BUSINESS NO. 131 - 88 -00559 E - COMMERCE REGISTRATION NO. 2016 - 서울강남-02605

// //          <a
// //           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="flex items-center justify-center flex-grow-1"
// //         >

// /* 모바일 스타일 */
// body {
//     background-color: lightblue;
// }

// /* 태블릿 스타일 */
// @media screen and (min-width: 481px) {
//     body {
//         background-color: lightgreen;
//     }
// }

// /* 데스크톱 스타일 */
// @media screen and (min-width: 769px) {
//     body {
//         background-color: lightyellow;
//     }
// }

//  theme: {
//         screens: {
//             'mobile': '0px',
//             'tablet': '480px',
//             'desktop': '768px',
//             'large': '1024px',
//         }
// },

// <div className="relative overflow-hidden" style={{ paddingTop: '100%' }}>
//   <Image
//     key={id}
//     src={mainImage ? mainImage : "/images/not_found.png"}
//     alt={`S3 Image ${name}`}
//     layout='fill'
//     objectFit='cover'
//   />
//   {stock === 0 && (
//     <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-400 opacity-75">
//       <p className="text-lg font-bold text-red-700">품절</p>
//     </div>
//   )}
// </div>

// sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
import { useState } from "react";
import Image from "next/image";

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
    <div className="relative flex flex-col items-center">
      <div className="w-full h-[500px] overflow-hidden relative">
        <div
          className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative float-left w-full h-full">
              <Image
                src={img}
                alt={`Image ${idx}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute px-4 py-2 text-white transform -translate-y-1/2 bg-blue-500 rounded left-2 top-1/2"
      >
        Previous
      </button>
      <button
        onClick={nextSlide}
        className="absolute px-4 py-2 text-white transform -translate-y-1/2 bg-blue-500 rounded right-2 top-1/2"
      >
        Next
      </button>
    </div>
  );
}

export default CarouselProduct;
