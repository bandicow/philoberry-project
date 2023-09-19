import React from "react";
import { SaleListProps } from "../../Types/Items";
import SaleItem from "./SaleItem";

const SaleList = ({ items }: SaleListProps) => {
  return (
    <ol className="grid grid-cols-1 m-0 md:grid-cols-3">
      {items.map((items) => (
        <SaleItem key={items.id} item={items} />
      ))}
    </ol>
  );
};

export default SaleList;
