import React from "react";
import Products from "./Products";
import { Product } from "@prisma/client";
import { getProducts } from "@/lib/action";
import ErrorPlaceholder from "@/src/components/Static/default-error";

interface SaleProps {
  items: Product[];
}

const ProductList = async () => {
  try {
    const { products } = await getData();
    const { items }: SaleProps = products;

    return (
      <ol className="grid grid-cols-1 m-0 tablet:grid-cols-2 tabletLandscape:grid-cols-3">
        {items.map((item) => (
          <Products key={item.id} item={item} />
        ))}
      </ol>
    );
  } catch (error) {
    return <ErrorPlaceholder error={error as Error} />;
  }
};

async function getData() {
  const products = await getProducts();

  return { products };
}

export default ProductList;
