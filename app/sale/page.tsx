import React from "react";
import SaleList from "../../src/components/SaleItems/SaleList";
import { Product } from "@prisma/client";
import { getProducts } from "../../lib/action";

interface SaleProps {
  items: Product[];
}

const Sale = async () => {
  const { items }: SaleProps = await getProducts();
  return (
    <div>
      <SaleList items={items} />
    </div>
  );
};

export default Sale;
