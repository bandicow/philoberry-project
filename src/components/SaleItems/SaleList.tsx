import React from "react";
import { SaleListProps } from "../../Types/Items";
import SaleItem from "./SaleItem";
import { Product } from "@prisma/client";

interface SaleProps {
  items: Product[];
}
const SaleList = ({ items }: SaleProps) => {
  // console.log(items + "여기");
  return (
    <ol className="grid grid-cols-1 m-0 md:grid-cols-3">
      {items &&
        items.map(
          (
            item // items 가 존재할 때만 map 함수를 호출하도록 수정하였습니다.
          ) => <SaleItem key={item.id} item={item} />
        )}
    </ol>
  );
};

export default SaleList;
