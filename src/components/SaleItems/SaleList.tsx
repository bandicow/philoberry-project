import React from "react";
import { SaleItemProps } from "../../Types/Items";
import SaleItem from "./SaleItem";
//grid-cols-1 md:grid-cols-3
const SaleList = (props: SaleItemProps) => {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {props.items.map((item) => (
        <SaleItem
          key={item.id}
          id={item.id}
          name={item.name}
          category={item.category}
          color={item.color}
          stock={item.stock}
          size={item.size}
          url={item.url}
          img={item.img}
          descritption={item.descritption}
        />
      ))}
    </ul>
  );
};

export default SaleList;
