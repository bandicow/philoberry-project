import React from "react";
import SaleItemCard from "../UI/Card/Card";
import { SaleItemProps } from "../../Types/Items";
import Image from "next/image";

const SaleItem = ({ item }: SaleItemProps) => {
  const { id, name, img } = item;

  return (
    <li className="flex">
      <SaleItemCard
        extraCalssName="hover:bg-red-100 active:bg-red-200"
        href={`/sale/${id}`}
      >
        <div className="w-full m-1 h-[250px] overflow-hidden rounded-xl">
          <Image
            className="w-full"
            src={img}
            alt="임시"
            width={500}
            height={500}
          />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        {/* <div>{description}</div> */}
      </SaleItemCard>
    </li>
  );
};

export default SaleItem;
