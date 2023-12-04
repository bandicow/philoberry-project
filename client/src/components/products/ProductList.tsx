import React from "react";
import Products from "./Products";
import { getProducts } from "@/lib/action";
import ErrorPlaceholder from "@/src/components/Static/default-error";

const ProductList = async () => {
  try {
    const products = await getProducts();

    return (
      <ol
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gridAutoRows: "350px",
          gap: "0px",
        }}
      >
        {products.map((item) => (
          <Products key={item.id} item={item} />
        ))}
      </ol>
    );
  } catch (error) {
    return <ErrorPlaceholder error={error as Error} />;
  }
};

export default ProductList;
