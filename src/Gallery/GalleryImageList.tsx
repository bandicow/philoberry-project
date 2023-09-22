import React from "react";
import GalleryImage from "./GalleryImage";
import { ClientGalleyImageProps } from "../Types/Client";
import { Artwork } from "@prisma/client";

const GalleryImageList = ({ artworks }: { artworks: Artwork[] }) => {
  return (
    <ol className="flex flex-col items-center w-full">
      {artworks.map((imginfo) => (
        <GalleryImage
          key={imginfo.artwork_id}
          artwork_id={imginfo.artwork_id}
          artist_id={imginfo.artist_id}
          title={imginfo.title}
          image_url={imginfo.image_url}
          descripton={imginfo.descripton}
          createdAt={imginfo.createdAt}
          medium={imginfo.medium}
          dimensions={imginfo.dimensions}
          price={imginfo.price}
          isSold={false}
        />
      ))}
    </ol>
  );
};

export default GalleryImageList;
