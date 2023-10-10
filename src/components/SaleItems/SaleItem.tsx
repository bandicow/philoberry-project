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
  const { id, name, mainImage, stock } = item;

  return (
    <li className="flex justify-center">
      {
        <SaleItemCard
          extraClassName="hover:bg-red-100 active:bg-red-200 h-max-[500px]"
          href={`/sale/${id}`}
          stock={stock}
        >
          <div className="relative overflow-hidden">
            {mainImage ? (
              <Image
                key={id}
                src={mainImage}
                alt={`S3 Image ${name}`}
                height={500}
                width={500}
              />
            ) : (
              <Image
                key={id}
                src={"/images/not_found.png"}
                alt={`S3 Image ${name}`}
                height={500}
                width={500}
              />
            )}
            {stock === 0 && (
              <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-400 opacity-75">
                <p className="text-lg font-bold text-red-700">품절</p>
              </div>
            )}
            <p>{id}</p>
          </div>
        </SaleItemCard>
      }
    </li>
  );
};

export default SaleItem;
