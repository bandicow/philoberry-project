import React from "react";
import Products from "./Products";
import { Product } from "@prisma/client";
import { getProducts } from "@/lib/action";
import ErrorPlaceholder from "@/src/components/Static/default-error";

const ProductList = async () => {
  try {
    const products = await getProducts();

    return (
      <ol className="grid grid-cols-1 m-0 tablet:grid-cols-2 tabletLandscape:grid-cols-3">
        {products.map((item) => (
          <Products key={item.id} item={item} />
        ))}
      </ol>
    );
  } catch (error) {
    console.log(error + "안되는 이유");
    return <ErrorPlaceholder error={error as Error} />;
  }
};

export default ProductList;
