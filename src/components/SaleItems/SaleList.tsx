import React from "react";
import { SaleListProps } from "../../Types/Items";
import SaleItem from "./SaleItem";
import { Product, ProductImage } from "@prisma/client";

interface SaleProps {
  items: (Product & { productImages?: ProductImage[] })[];
}

const SaleList = ({ items }: SaleProps) => {
  return (
    <ol className="grid grid-cols-1 m-0 md:grid-cols-3">
      {items.map((items) => (
        <SaleItem key={items.id} item={items} />
      ))}
    </ol>
  );
};

export default SaleList;
