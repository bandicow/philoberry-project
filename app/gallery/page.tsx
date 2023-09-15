"use client";
import React from "react";
import GalleryImageList from "../../src/Gallery/GalleryImageList";
import { ClientGalleyImageProps, GalleryImage } from "../../src/Types/Client";
import { NextPage } from "next";
import { DUMMY_GALLERY_IMAGE } from "../../src/DummyData/DummyData";
import { useQuery } from "react-query";
import axios from "axios";

const Gallery: NextPage<ClientGalleyImageProps> = () => {
  //id (S), imageUrl(S) , caption(이미지설명,S), likes(N) , comments(N) , timestamp(업로드날짜,D) , user(id,username,profileImageUrl)(AllS) , tags(S[])

  async function getBackgroundColor() {
    const response = await axios.get("../api/getBackgroundColor");
    return response.data.color;
  }

  const { data: color } = useQuery("backgroundColor", getBackgroundColor);

  return (
    <div style={{ backgroundColor: color, backdropFilter: "blur(100px)" }}>
      <GalleryImageList GallreyImg={DUMMY_GALLERY_IMAGE} />
    </div>
  );
};

export default Gallery;

//구조를 생각하자
// 페이지
// 큰틀 list(map으로 내용을 넣은거, 여러개 만들기 위함)
// 그 내용들어갈 것 (각각 하나씩)
// 그걸 Card에 감싸
