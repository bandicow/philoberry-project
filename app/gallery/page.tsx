"use client";
import React from "react";
import GalleryImageList from "../../src/Gallery/GalleryImageList";
import { NextPage } from "next";
import { DUMMY_ARTWORKS } from "../../src/DummyData/DummyData";
import { useQuery } from "react-query";
import axios from "axios";
import { Artwork } from "@prisma/client";

const Gallery = (props: Artwork) => {
  async function getBackgroundColor() {
    const response = await axios.get("/api/getBackgroundColor");
    return response.data.color;
  }

  const { data: color } = useQuery("backgroundColor", getBackgroundColor);

  return (
    <div style={{ backgroundColor: color, backdropFilter: "blur(100px)" }}>
      <GalleryImageList artworks={DUMMY_ARTWORKS} />
    </div>
  );
};

export default Gallery;

//구조를 생각하자
// 페이지
// 큰틀 list(map으로 내용을 넣은거, 여러개 만들기 위함)
// 그 내용들어갈 것 (각각 하나씩)
// 그걸 Card에 감싸
