"use client";
import React from "react";
import SaleItemCard from "../UI/Card/Card";
import Image from "next/image";
import { Product } from "@prisma/client";

interface SaleItemProps {
  item: Product;
}
// item : ~ 을 가진 Props를 만들어서
// {item} : ~ 을 통해 그 item을 뽑아내서 사용한다

const Products = ({ item }: SaleItemProps) => {
  const { id, name, mainImage, stock } = item;

  return (
    <li className="flex justify-center w-full h-full">
      {
        <SaleItemCard
          extraClassName="hover:bg-red-500 active:bg-red-200"
          href={`/sale/${id}`}
          stock={stock}
        >
          <div className="relative min-h-[350px] min-w-[350px] hover:opacity-80 w-full h-full overflow-hidden">
            {mainImage ? (
              <Image
                key={id}
                src={mainImage}
                alt={`S3 Image ${name}`}
                fill
                object-fit="cover"
                sizes="(max-width: 600px) 400px, (max-width: 900px) 600px, 800px"
              />
            ) : (
              <Image
                key={id}
                src={"/images/not_found.png"}
                alt={`S3 Image ${name}`}
                height={768}
                width={768}
              />
            )}
            {stock === 0 && (
              <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-400 opacity-75">
                <p className="text-lg font-bold text-red-700">품절</p>
              </div>
            )}
          </div>
        </SaleItemCard>
      }
    </li>
  );
};

export default Products;
