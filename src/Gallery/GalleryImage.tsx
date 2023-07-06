import React from "react";
import { GalleryImage } from "../Types/Client";
import Image from "next/image";
import GalleryCard from "../components/UI/Card/GalleryCard";

const GalleryImage = (props: GalleryImage) => {
  return (
    <GalleryCard>
      <Image
        className="w-full rounded-md"
        src={props.imageUrl}
        alt={props.caption}
        width={250}
        height={250}
      />

      <div className="absolute inset-0 flex flex-col p-8 text-white test__body">
        <div className="relative">
          <a
            className="absolute inset-0 test__link"
            target="_blank"
            href="/"
          ></a>
          <h1 className="mb-3 text-3xl font-bold test__title">{props.likes}</h1>
        </div>
        <div className="mt-auto">
          <span className="px-4 py-1 text-black bg-white rounded-md test__tag bg-opacity-60">
            {props.tags}
          </span>
        </div>
      </div>

      {/* <div className="">
          <h2>{props.id}</h2>
          <p>{props.caption}</p>
          <p>{props.timestamp.toDateString()}</p>
        </div> */}
    </GalleryCard>
  );
};

export default GalleryImage;
