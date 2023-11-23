import React from "react";
import { Product } from "@prisma/client";
import { getProducts } from "../../lib/action";
import ProductList from "@/src/components/products/ProductList";
import Loading from "../loading";
import ErrorPage from "../api/error/page";

interface SaleProps {
  items: Product[];
}

const Sale = async () => {
  try {
    const products = await getProducts();

    if (!products) {
      return <Loading />;
    }

    const { items }: SaleProps = products;

    return (
      <div>
        <ProductList items={items} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <ErrorPage />;
  }
};

export default Sale;
