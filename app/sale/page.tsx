import React from "react";
import SaleList from "../../src/components/SaleItems/SaleList";
import axios from "axios";
import { Product } from "@prisma/client";

interface SaleProps {
  items: Product[];
}
const getProduct = async () => {
  const response = await axios.get(`${process.env.SITE_URL}/api/productLoad`);
  return { items: response.data };
};

const Sale = async () => {
  const { items }: SaleProps = await getProduct();
  return (
    <div>
      <SaleList items={items} />
    </div>
  );
};

export default Sale;
