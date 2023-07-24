import React from "react";
import GalleryImageList from "../../src/Gallery/GalleryImageList";
import { ClientGalleyImageProps, GalleryImage } from "../../src/Types/Client";
import { NextPage } from "next";
import { DUMMY_GALLERY_IMAGE } from "../../src/DummyData/DummyData";

const Gallery: NextPage<ClientGalleyImageProps> = () => {
  //id (S), imageUrl(S) , caption(이미지설명,S), likes(N) , comments(N) , timestamp(업로드날짜,D) , user(id,username,profileImageUrl)(AllS) , tags(S[])

  // const DUMMY_GALLERY_IMAGE: GalleryImage[] = [
  //   {
  //     id: "no1",
  //     imageUrl: "https://source.unsplash.com/random/1",
  //     caption: "이미지설명",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-01"),
  //     user: {
  //       id: "no1",
  //       username: "no1",
  //       profileImageUrl: "https://source.unsplash.com/random/1",
  //     },
  //     tags: ["tag1", "tag2"],
  //   },
  //   {
  //     id: "no2",
  //     imageUrl: "https://source.unsplash.com/random/2",
  //     caption: "두 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-02"),
  //     user: {
  //       id: "no2",
  //       username: "no2",
  //       profileImageUrl: "https://source.unsplash.com/random/2",
  //     },
  //     tags: ["tag3", "tag4"],
  //   },
  //   {
  //     id: "no3",
  //     imageUrl: "https://source.unsplash.com/random/3",
  //     caption: "세 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-03"),
  //     user: {
  //       id: "no3",
  //       username: "no3",
  //       profileImageUrl: "https://source.unsplash.com/random/3",
  //     },
  //     tags: ["tag5", "tag6"],
  //   },
  //   {
  //     id: "no4",
  //     imageUrl: "https://source.unsplash.com/random/4",
  //     caption: "네 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-04"),
  //     user: {
  //       id: "no4",
  //       username: "no4",
  //       profileImageUrl: "https://source.unsplash.com/random/4",
  //     },
  //     tags: ["tag7", "tag8"],
  //   },
  //   {
  //     id: "no5",
  //     imageUrl: "https://source.unsplash.com/random/5",
  //     caption: "다섯 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-05"),
  //     user: {
  //       id: "no5",
  //       username: "no5",
  //       profileImageUrl: "https://source.unsplash.com/random/5",
  //     },
  //     tags: ["tag9", "tag10"],
  //   },
  //   {
  //     id: "no6",
  //     imageUrl: "https://source.unsplash.com/random/6",
  //     caption: "여섯 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-06"),
  //     user: {
  //       id: "no6",
  //       username: "no6",
  //       profileImageUrl: "https://source.unsplash.com/random/6",
  //     },
  //     tags: ["tag11", "tag12"],
  //   },
  //   {
  //     id: "no7",
  //     imageUrl: "https://source.unsplash.com/random/7",
  //     caption: "일곱 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-07"),
  //     user: {
  //       id: "no7",
  //       username: "no7",
  //       profileImageUrl: "https://source.unsplash.com/random/7",
  //     },
  //     tags: ["tag9", "tag10"],
  //   },
  //   {
  //     id: "no8",
  //     imageUrl: "https://source.unsplash.com/random/8",
  //     caption: "여덟 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-08"),
  //     user: {
  //       id: "no8",
  //       username: "no8",
  //       profileImageUrl: "https://source.unsplash.com/random/8",
  //     },
  //     tags: ["tag11", "tag12"],
  //   },
  //   {
  //     id: "no9",
  //     imageUrl: "https://source.unsplash.com/random/9",
  //     caption: "아홉 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-09"),
  //     user: {
  //       id: "no9",
  //       username: "no9",
  //       profileImageUrl: "https://source.unsplash.com/random/9",
  //     },
  //     tags: ["tag11", "tag12"],
  //   },
  //   {
  //     id: "no10",
  //     imageUrl: "https://source.unsplash.com/random/10",
  //     caption: "열 번째 이미지",
  //     likes: 0,
  //     comments: 0,
  //     timestamp: new Date("2021-09-10"),
  //     user: {
  //       id: "no10",
  //       username: "no10",
  //       profileImageUrl: "https://source.unsplash.com/random/10",
  //     },
  //     tags: ["tag22", "tag23"],
  //   },
  // ];

  return (
    <div>
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
