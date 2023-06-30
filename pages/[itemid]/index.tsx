import React from "react";
import { Items } from "../../src/Types/Items";
import Image from "next/image";

const DetailItem = (props: Items) => {
  return (
    <div>
      <Image
        className="w-full"
        src={props.img}
        alt="이미지설명"
        width={500}
        height={500}
      />
      <p>자세한 내용은 이미지 + 품명 + 재질 등등</p>
      <div className="py-4 text-center">
        <a className="text-lg text-gray-800">{props.url}</a>
      </div>
    </div>
  );
};

export default DetailItem;
