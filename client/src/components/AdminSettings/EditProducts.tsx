"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Product } from "@prisma/client";
import Select from "react-select";
import Button from "../UI/Button/SubmitButton";
import { NumberInputField, StringInputField } from "../UI/Input/InputField";
import { editProduct } from "../../../lib/action";
type ProductInfo = Pick<
  Product,
  "name" | "category" | "price" | "color" | "size" | "details" | "stock" | "id"
>;

interface editProductsProps {
  productsInfo: ProductInfo[];
}

export const EditProducts = ({ productsInfo }: editProductsProps) => {
  const [selectedOption, setSelectedOption] = useState<ProductInfo | null>(
    null
  );

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [details, setDetails] = useState("");
  const [stock, setStock] = useState(0);
  const options = productsInfo.map((product) => ({
    value: product.name,
    label: product.name,
  }));

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const editData: ProductInfo = {
      id: id,
      name: name,
      category: category,
      price: price,
      color: color,
      size: size,
      details: details,
      stock: stock,
    };

    editProduct(editData);
  };

  // 기본값
  const placeholderColor =
    selectedOption && selectedOption.color ? selectedOption.color : undefined;

  const placeholderSize =
    selectedOption && selectedOption.size ? selectedOption.size : undefined;

  const placeholderDetails =
    selectedOption && selectedOption.details
      ? selectedOption.details
      : undefined;

  return (
    <div>
      <Select
        options={options}
        onChange={(option) => {
          const selectedProduct = option
            ? productsInfo.find((product) => product.name === option.value)
            : null;

          setSelectedOption(selectedProduct || null);
          setId(selectedProduct?.id || 0);
        }}
      />

      {selectedOption && (
        <form className="m-10" onSubmit={submitHandler}>
          <StringInputField
            label="제품명"
            id="name"
            value={name}
            type="text"
            setValue={setName}
            placeholder={selectedOption.name}
            disabled={true}
          />
          <StringInputField
            label="분류"
            id="category"
            value={category}
            type="text"
            setValue={setCategory}
            placeholder={selectedOption.category}
          />
          <NumberInputField
            label="가격"
            id="price"
            value={price}
            type="number"
            setValue={setPrice}
            placeholder={selectedOption.price.toString()}
          />
          <StringInputField
            label="색상"
            id="color"
            value={color}
            type="color"
            setValue={setColor}
            placeholder={placeholderColor}
          />
          <StringInputField
            label="크기"
            id="size"
            value={size}
            type="text"
            setValue={setSize}
            placeholder={placeholderSize}
          />
          <StringInputField
            label="상세정보"
            id="details"
            value={details}
            type="text"
            setValue={setDetails}
            placeholder={placeholderDetails}
          />
          <NumberInputField
            label="재고량"
            id="stock"
            value={stock}
            type="number"
            setValue={setStock}
            placeholder={selectedOption.stock.toString()}
          />
          <Button goal={"제품 변경하기"} />
        </form>
      )}
    </div>
  );
};
