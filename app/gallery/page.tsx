import React from "react";
import GalleryImageList from "../../src/components/Gallery/GalleryImageList";
import { getBackgroundColor } from "../../lib/action";

const Gallery = async () => {
  const backgroundColor = await getBackgroundColor();

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        backdropFilter: "blur(100px)",
      }}
    >
      <GalleryImageList />
    </div>
  );
};

export default Gallery;
