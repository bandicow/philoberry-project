import React from "react";
import { SaleItemProps } from "../../Types/Items";
import SaleItem from "./SaleItem";
//grid-cols-1 md:grid-cols-3
const SaleList = (props: SaleItemProps) => {
  return (
    <ol className="grid grid-cols-1 m-0 md:grid-cols-3">
      {props.items.map((item) => (
        <SaleItem key={item.id} item={item} />
      ))}
    </ol>
  );
};

export default SaleList;
