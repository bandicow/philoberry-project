"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProductDetail } from "../../../lib/action";
interface SaleItemProps extends Product {
  s3key: string[];
}

export default function ProductDetail() {
  const pathname = usePathname();
  const splitPathname = pathname?.split("/");
  const stringid = splitPathname?.slice(-1)[0];
  let id = 0;
  if (typeof stringid !== "number" && stringid !== undefined) {
    id = parseInt(stringid);
  }

  const [product, setProduct] = useState<SaleItemProps | null>(null);

  // id와 일치하는 더미 데이터 가져오기

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (id) {
        const detailData = await getProductDetail(id);
        setProduct(detailData);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center font-extrabold text-8xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex item">
      <div className="flex-col w-1/2 m-0">
        {product.s3key &&
          product.s3key.map((s3key) => (
            <div className="w-full item_img" key={s3key}>
              <Image
                className="w-full item_img"
                src={s3key}
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
          <p>제품명 : {product.name}</p>
          <p>소재 : {product.material}</p>
          <p>색상 : {product.color}</p>
          <p>사이즈 : {product.size}</p>
          <p>상세정보 : {product.details}</p>
          <p>제품주의사항 : {product.precautions}</p>
          <p>{!product.stock && "품절"}</p>
        </div>
        <div className="py-4 text-center item_desc_url">
          {product.url && (
            <Link href={product.url as string}>
              <p className="mb-2 text-xl font-semibold">{product.url}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}