import React from "react";
import GalleryImageList from "../../src/components/Gallery/GalleryImageList";
import { getBackgroundColor } from "../../lib/action";
import { Suspense } from "react";
import Loading from "../loading";

const Gallery = async () => {
  let backgroundColor = await getBackgroundColor();

  if (!backgroundColor) {
    backgroundColor = "gray";
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        backdropFilter: "blur(100px)",
      }}
    >
      <Suspense fallback={<Loading />}>
        <GalleryImageList />
      </Suspense>
    </div>
  );
};

export default Gallery;
