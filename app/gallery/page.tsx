import React from "react";
import GalleryImageList from "../../src/Gallery/GalleryImageList";
import axios from "axios";

const getBackgroundColor = async () => {
  const response = await axios.get(
    `${process.env.SITE_URL}/api/getBackgroundColor`
  );
  return response.data.backgroundColor;
};

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
