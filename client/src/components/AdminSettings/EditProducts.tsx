"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Product } from "@prisma/client";
import Select from "react-select";
import Button from "../UI/Button/SubmitButton";
import { InputField } from "../UI/Input/InputField";
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
    <div className="center">
      <h1 className="mt-10 font-extrabold">제품 선택</h1>
      <Select
        className="w-2/3 m-2"
        instanceId="unique-id"
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
        <form className="w-5/6 m-10" onSubmit={submitHandler}>
          <InputField
            label="제품명"
            id="name"
            value={name}
            type="text"
            setValue={setName}
            required={true}
            placeholder={selectedOption.name}
            disabled={true}
          />
          <InputField
            label="분류"
            id="category"
            value={category}
            type="text"
            required={true}
            setValue={setCategory}
            placeholder={selectedOption.category}
          />
          <InputField
            label="가격"
            id="price"
            value={price}
            type="number"
            required={true}
            setNumberValue={setPrice}
            placeholder={selectedOption.price.toString()}
          />
          <InputField
            label="색상"
            id="color"
            value={color}
            type="color"
            required={true}
            setValue={setColor}
            placeholder={placeholderColor}
          />
          <InputField
            label="크기"
            id="size"
            value={size}
            type="text"
            required={true}
            setValue={setSize}
            placeholder={placeholderSize}
          />
          <InputField
            label="상세정보"
            id="details"
            value={details}
            type="text"
            required={true}
            setValue={setDetails}
            placeholder={placeholderDetails}
          />
          <InputField
            label="재고량"
            id="stock"
            value={stock}
            type="number"
            required={true}
            setNumberValue={setStock}
            placeholder={selectedOption.stock.toString()}
          />
          <Button goal={"제품 변경하기"} />
        </form>
      )}
    </div>
  );
};
