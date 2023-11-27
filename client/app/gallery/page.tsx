"use client";
import React, { useState, useEffect } from "react";
import GalleryImageList from "../../src/components/Gallery/GalleryImageList";
import { getBackgroundColor } from "../../lib/action";

const Gallery = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>("gray");

  useEffect(() => {
    let fetchBackgroundColor = async () => {
      const data = await getBackgroundColor();
      setBackgroundColor(data);
    };
    fetchBackgroundColor();
  }, []);

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
