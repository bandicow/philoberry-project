import React from "react";
import SaleItemCard from "../UI/Card/Card";
import Image from "next/image";
import { Product, ProductImage } from "@prisma/client";
import Link from "next/link";

interface SaleItemProps {
  item: Product;
}
// item : ~ 을 가진 Props를 만들어서
// {item} : ~ 을 통해 그 item을 뽑아내서 사용한다

const SaleItem = ({ item }: SaleItemProps) => {
  const { id, name, url, mainImage, category, price, material, details } = item;

  return (
    <li className="flex justify-center">
      <SaleItemCard
        extraClassName="hover:bg-red-100 active:bg-red-200 h-max-[500px]"
        href={`/sale/${id}`}
      >
        <div className="overflow-hidden ">
          {mainImage ? (
            <Image
              key={id}
              src={mainImage}
              alt={`S3 Image ${name}`}
              height={500}
              width={500}
            />
          ) : (
            <p>이미지 로딩 실패</p>
          )}
        </div>
      </SaleItemCard>
    </li>
  );
};

export default SaleItem;
