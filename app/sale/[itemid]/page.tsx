"use client";
import React from "react";
import Image from "next/image";
import { DUMMY_ITEM } from "../../../src/DummyData/DummyData";
import { Item } from "../../../src/Types/Items";
import { useSearchParams } from "next/navigation";

interface ParamsProps {
  params: { itemid: string };
}

const DetailItem = ({ params }: ParamsProps) => {
  // const router = useSearchParams();
  // console.log(router);

  // const itemid = router?.get("itemid");

  // id와 일치하는 더미 데이터 가져오기
  const PRODUCT: Item | undefined = DUMMY_ITEM.find(
    (item) => item.id === params.itemid
  );

  if (!PRODUCT) {
    return <div>{params.itemid}번 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex item">
      <div className="flex w-1/2 m-0">
        <Image
          className="w-full item_img"
          src={PRODUCT.img}
          alt="이미지설명"
          width={500}
          height={500}
        />
      </div>
      <div className="fixed right-0 w-1/2 bg-black bg-opacity-40 h-[100vh]">
        <div className="flex flex-col items-center w-5/6 p-10 m-5 border-4 item_desc class h-5/6">
          <p></p>
          <p>{PRODUCT.name}</p>
          <p>{PRODUCT.category}</p>
          <p>{PRODUCT.color}</p>
          <p>{PRODUCT.size}</p>
          <p>{PRODUCT.description}</p>
          <p>{PRODUCT.isSold && "품절"}</p>
        </div>
        <div className="py-4 text-center item_desc_url">
          <a className="text-lg text-gray-800" href="www.naver.com">
            {PRODUCT.url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
