import React from "react";
import GalleryImage from "./GalleryImage";
import { Artwork } from "@prisma/client";
import { getArtworks } from "../../../lib/action";

const GalleryImageList = async () => {
  const artworks = await getArtworks();

  if (!artworks) {
    return <div>Loading...</div>;
  }

  return (
    <ol className="flex flex-col items-center w-full">
      {artworks &&
        artworks.map((artworkInfo: Artwork) => (
          <GalleryImage
            key={artworkInfo.artwork_id}
            artwork_id={artworkInfo.artwork_id}
            artist_name={artworkInfo.artist_name}
            title={artworkInfo.title}
            s3key={artworkInfo.s3key}
            description={artworkInfo.description}
            createdAt={artworkInfo.createdAt}
            material={artworkInfo.material}
            size={artworkInfo.size}
            price={artworkInfo.price}
            order={artworkInfo.order}
            isSold={artworkInfo.isSold}
          />
        ))}
    </ol>
  );
};

export default GalleryImageList;
