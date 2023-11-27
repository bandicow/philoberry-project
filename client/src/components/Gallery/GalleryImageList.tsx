"use client";
import React, { useEffect, useState } from "react";
import GalleryImage from "./GalleryImage";
import { Artwork } from "@prisma/client";
import { getArtworks } from "../../../lib/action";
import Loading from "@/app/loading";

const GalleryImageList = () => {
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      const data = await getArtworks();
      setArtworks(data);
    };

    fetchArtworks();
  }, []);

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
