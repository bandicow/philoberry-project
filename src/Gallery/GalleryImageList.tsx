"use client";
import React from "react";
import GalleryImage from "./GalleryImage";
import { useQuery } from "@tanstack/react-query";
import { Artwork } from "@prisma/client";
import { getArtwork } from "../../app/gallery/page";

const GalleryImageList = () => {
  const {
    data: artworksData,
    isError: artworkError,
    isLoading: artworkLoading,
  } = useQuery(["artworks"], getArtwork);

  if (artworkLoading) {
    return <div>Loading...</div>;
  }

  if (artworkError || !artworksData) {
    return <div>Error occurred while fetching artworks.</div>;
  }

  // Extract artworks and backgroundColor from the response data
  const { data: artworks, bg: backgroundColor } = artworksData;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        backdropFilter: "blur(100px)",
      }}
    >
      <ol className="flex flex-col items-center w-full">
        {artworks &&
          artworks.map((imginfo: Artwork) => (
            <GalleryImage
              key={imginfo.artwork_id}
              artwork_id={imginfo.artwork_id}
              artist_name={imginfo.artist_name}
              title={imginfo.title}
              s3key={imginfo.s3key}
              description={imginfo.description}
              createdAt={imginfo.createdAt}
              material={imginfo.material}
              size={imginfo.size}
              price={imginfo.price}
              order={imginfo.order}
              isSold={imginfo.isSold}
            />
          ))}
      </ol>
    </div>
  );
};

export default GalleryImageList;
