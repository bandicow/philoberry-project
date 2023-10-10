"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";
import Select from "react-select";
type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock"
>;

interface editProductsProps {
  productsInfo: ProductInfo[];
}

export const EditProducts = ({ productsInfo }: editProductsProps) => {
  const [selectedOption, setSelectedOption] = useState<ProductInfo | null>(
    null
  );

  const options = productsInfo.map((product) => ({
    value: product.name,
    label: product.name,
  }));

  return (
    <div>
      <Select
        options={options}
        onChange={(option) => {
          const selectedProduct = productsInfo.find(
            (product) => product.name === option?.value
          );
          setSelectedOption(selectedProduct || null);
        }}
      />

      {selectedOption && (
        <div>
          <p>
            <strong>Name:</strong> {selectedOption.name}
          </p>
          <p>
            <strong>Category:</strong> {selectedOption.category}
          </p>
          <p>
            <strong>Price:</strong> ${selectedOption.price}
          </p>
          <p>
            <strong>Color:</strong> {selectedOption.color || "N/A"}
          </p>
          <p>
            <strong>Size:</strong> {selectedOption.size || "N/A"}
          </p>
          <p>
            <strong>Details:</strong> {selectedOption.details || "N/A"}
          </p>
          <p>
            <strong>In Stock:</strong>:{" "}
            {selectedOption.stock > 0 ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
};
