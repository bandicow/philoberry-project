import React from "react";
import GalleryImage from "./GalleryImage";
import { Artwork } from "/@prisma/client";
import { getArtworks } from "../../../lib/action";
import Loading from "@/app/loading";

const GalleryImageList = async () => {
  const artworks = await getArtworks();

  if (!artworks) {
    return <Loading />;
  }

  return (
    <ol className="flex flex-col items-center w-full">
      {artworks &&
        artworks.map((artworkInfo: Artwork) => (
          <GalleryImage key={artworkInfo.artwork_id} {...artworkInfo} />
        ))}
    </ol>
  );
};

export default GalleryImageList;
