import React from "react";
import GalleryImageList from "../../src/Gallery/GalleryImageList";

const Gallery = () => {
  return (
    <div>
      <GalleryImageList></GalleryImageList>
    </div>
  );
};

export default Gallery;

//구조를 생각하자
// 페이지
// 큰틀 list(map으로 내용을 넣은거, 여러개 만들기 위함)
// 그 내용들어갈 것 (상세 내용)
// 그걸 Card에 감싸
