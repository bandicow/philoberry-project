import React from "react";
import Products from "./Products";
import { Product } from "@/prismaType";

interface SaleProps {
  items: Product[];
}
const ProductList = ({ items }: SaleProps) => {
  return (
    <ol className="grid grid-cols-1 m-0 tablet:grid-cols-2 tabletLandscape:grid-cols-3">
      {items &&
        items.map(
          (
            item // items 가 존재할 때만 map 함수를 호출하도록 수정하였습니다.
          ) => <Products key={item.id} item={item} />
        )}
    </ol>
  );
};

export default ProductList;
