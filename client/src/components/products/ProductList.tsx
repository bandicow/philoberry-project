"use client";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import { getProducts } from "@/lib/action";
import ErrorPlaceholder from "@/src/components/Static/default-error";
import { Product } from "@prisma/client";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getProducts();
        setProducts(items);
      } catch (error: unknown) {
        if (error instanceof TypeError) console.log(error.message);
        if (error instanceof Response) {
          const data = await error.json();
          setError(data.message);
        }
        setError("error");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    console.log(error);
    return <ErrorPlaceholder />;
  }

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
};

export default ProductList;
