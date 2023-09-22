"use client";
import React from "react";
import SaleList from "../../src/components/SaleItems/SaleList";
import { DUMMY_PRODUCT } from "../../src/DummyData/DummyData";
import { Product, ProductImage } from "@prisma/client";

interface SaleProps {
  items: (Product & { productImages?: ProductImage[] })[];
}

const Sale = (props: SaleProps) => {
  return (
    <div>
      <SaleList items={DUMMY_PRODUCT} />
    </div>
  );
};

export default Sale;
