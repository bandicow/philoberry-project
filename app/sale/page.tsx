"use client";
import React from "react";
import SaleList from "../../src/components/SaleItems/SaleList";
import { NextPage } from "next";
import { SaleItemProps } from "../../src/Types/Items";
import { DUMMY_ITEM } from "../../src/DummyData/DummyData";

const Sale: NextPage<SaleItemProps> = () => {
  return (
    <div>
      <SaleList items={DUMMY_ITEM} />
    </div>
  );
};

export default Sale;
