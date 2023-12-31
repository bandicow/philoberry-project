"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProductDetail } from "../../../lib/action";
import DetailInfo from "@/src/components/Gallery/DetailInfo";
import CarouselProduct from "./CarouselProduct";
import Loading from "@/app/loading";
import { InfoProps } from "@/src/Types/Common";
interface SaleItemProps extends Product {
  s3key: string[];
}

export default function ProductDetail() {
  const pathname = usePathname();

  const stringid = pathname?.split("/")?.slice(-1)[0];

  let id = 0;
  if (typeof stringid !== "number" && stringid !== undefined) {
    id = parseInt(stringid);
  }

  const [product, setProduct] = useState<SaleItemProps | null>(null);
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
    return <Loading />;
  }

  const { name, material, color, size, details, precautions, s3key, price } =
    product;

  const DetailInfos: InfoProps[] = [
    { label: "제품명", value: name },
    { label: "가격", value: price },
    { label: "소재", value: material },
    { label: "색상", value: color },
    { label: "사이즈", value: size },
    { label: "상세정보", value: details },
    { label: "취급 주의", value: precautions },
  ];

  return (
    <div className="flex-col tabletLandscape:flex">
      <div className="tabletLandscape:hidden">
        <CarouselProduct images={s3key} />
      </div>
      <div className="flex-col hidden m-0 tabletLandscape:w-7/12 tabletLandscape:flex">
        {product.s3key &&
          product.s3key.map((s3key) => (
            <div className="w-full relative  item_img" key={s3key}>
              <Image
                className="w-full item_img"
                src={s3key}
                alt="이미지설명"
                width={500}
                height={500}
                object-fit="contain"
                priority={true}
              />
            </div>
          ))}
      </div>
      <div className="hide-scrollbar tabletLandscape:fixed tabletLandscape:overflow-scroll tabletLandscape:w-5/12  tabletLandscape:right-0 tabletLandscape:top-0 w-full  bg-opacity-40 h-[90vh] tabletLandscape:h-[100vh] min-w-[400px]">
        <div className="flex-col p-10 pt-20 m-5 text-left h-5/6">
          {DetailInfos.map((info, index) => (
            <DetailInfo key={index} {...info} />
          ))}

          <div className="py-4 mt-5 text-center border-t-2 item_desc_url border-t-slate-600">
            {product.url && (
              <Link href={product.url as string}>
                <div className="mb-2 text-xl font-semibold">
                  <div className="break-words">
                    {!product.stock ? "품절" : `구매문의 ${product.url}`}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
