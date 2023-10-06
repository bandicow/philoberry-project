"use client";
import React from "react";
import Image from "next/image";
import { productsWithImages } from "../../../src/DummyData/DummyData";
import { Product, ProductImage } from "@prisma/client";
import Link from "next/link";

interface SaleItemProps {
  item: Product & { productImages?: ProductImage[] };
}

const DetailItem = ({ item }: SaleItemProps) => {
  // id와 일치하는 더미 데이터 가져오기
  const PRODUCT = productsWithImages.find((item) => item.id === item.id);

  if (!PRODUCT) {
    return <div>{item.id}번 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex item">
      <div className="flex w-1/2 m-0">
        {PRODUCT.productImages.map((image) => (
          <div className="w-full item_img" key={image.id}>
            <Image
              className="w-full item_img"
              src={image.s3key}
              alt="이미지설명"
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
      <div className="fixed right-0 w-1/2 bg-black bg-opacity-40 h-[100vh]">
        <div className="flex flex-col items-center w-5/6 p-10 m-5 border-4 item_desc class h-5/6">
          <p></p>
          <p>{PRODUCT.name}</p>
          <p>{PRODUCT.category}</p>
          <p>{PRODUCT.color}</p>
          <p>{PRODUCT.size}</p>
          <p>{PRODUCT.details}</p>
          <p>{!PRODUCT.stock && "품절"}</p>
        </div>
        <div className="py-4 text-center item_desc_url">
          {PRODUCT.url && (
            <Link href={PRODUCT.url}>
              <p className="mb-2 text-xl font-semibold">{PRODUCT.url}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
