"use client";
import React from "react";
import Image from "next/image";
import { DUMMY_ITEM } from "../../../src/DummyData/DummyData";
import { useSearchParams } from "next/navigation";
import { Item } from "../../../src/Types/Items";

interface ParamsProps {
  params: { itemid: string };
}

const DetailItem = ({ params }: ParamsProps) => {
  // const router = useSearchParams();

  // const itemid = router?.get("itemid");

  // id와 일치하는 더미 데이터 가져오기
  const PRODUCT: Item | undefined = DUMMY_ITEM.find(
    (item) => item.id === params.itemid
  );

  if (!PRODUCT) {
    return <div>{params.itemid}번 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Image
        className="w-full"
        src={PRODUCT.img}
        alt="이미지설명"
        width={500}
        height={500}
      />
      <p>자세한 내용은 이미지 + 품명 + 재질 등등</p>
      <div className="py-4 text-center">
        <a className="text-lg text-gray-800" href="">
          www.naver.com
        </a>
      </div>
    </div>
  );
};

export default DetailItem;
