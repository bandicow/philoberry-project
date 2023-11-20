import React from "react";
import { Product } from "@/prismaType";
import { getProducts } from "../../lib/action";
import ProductList from "@/src/components/products/ProductList";

interface SaleProps {
  items: Product[];
}

const Sale = async () => {
  const { items }: SaleProps = await getProducts();
  return (
    <div>
      <ProductList items={items} />
    </div>
  );
};

export default Sale;
