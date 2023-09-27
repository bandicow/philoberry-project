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
  const { id, name, url, mainImageUrl, category, price, material, details } =
    item;
  // console.log(mainImageUrl + "여기임");

  return (
    <li className="flex">
      <SaleItemCard
        extraCalssName="hover:bg-red-100 active:bg-red-200"
        href={`/sale/${id}`}
      >
        <div className="w-full m-1 h-[250px] overflow-hidden rounded-xl">
          {mainImageUrl && (
            <Image
              className="w-full"
              key={id}
              src={mainImageUrl}
              alt={`S3 Image ${name}`}
              width={500}
              height={500}
            />
          )}
        </div>
        <h3 className="mb-2 text-xl font-semibold">품명 : {name}</h3>
        <p className="mb-2 text-xl font-semibold">{category}</p>
        <p className="mb-2 text-xl font-semibold">{price}</p>
        <p className="mb-2 text-xl font-semibold">{material}</p>
        <p className="mb-2 text-xl font-semibold">{details}</p>
      </SaleItemCard>
    </li>
  );
};

export default SaleItem;
