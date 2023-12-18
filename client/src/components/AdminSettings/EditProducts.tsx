"use client";
import React, { FormEvent, useState } from "react";
import Select from "react-select";
import Button from "../UI/Button/SubmitButton";
import { InputField } from "../UI/Input/InputField";
import { ProductInfo } from "@/src/Types/Product";
import { useEditProductStore } from "@/utils/store/editproductStore";
import { useNotification } from "@/src/hooks/useNotification";
import SlideUpMessage from "../UI/Alert/Slideup";
import { postEditProduct } from "@/lib/action";

type InputField = {
  label: string;
  id: keyof ProductInfo;

  type: string;
  required: boolean;
  disabled?: boolean;
};

type ProductInfoProps = {
  productsInfo: ProductInfo[];
};

export const EditProducts = ({ productsInfo }: ProductInfoProps) => {
  const { editProduct, setEditProduct } = useEditProductStore();

  const {
    shake,
    showFailureMessage,
    showSuccessMessage,
    startFailureNotification,
    startSuccessNotification,
  } = useNotification();

  const [selectedOption, setSelectedOption] = useState<ProductInfo | null>(
    null
  );

  const options = productsInfo.map((product) => ({
    value: product.name,
    label: product.name,
  }));

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedOption || editProduct === null) {
      return;
    }

    const editData: ProductInfo = {
      id: selectedOption.id,
      name: editProduct.name,
      category: editProduct.category,
      price: editProduct.price,
      color: editProduct.color,
      size: editProduct.size,
      details: editProduct.details,
      stock: editProduct.stock,
    };

    try {
      await postEditProduct(editData); // API 요청 추가
      setEditProduct(null);
      setSelectedOption(null);
      startSuccessNotification();
    } catch (error) {
      startFailureNotification();
    }
  };

  const fields: InputField[] = [
    {
      label: "제품명",
      id: "name",
      type: "text",
      required: true,
      disabled: true,
    },
    { label: "분류", id: "category", type: "text", required: true },
    { label: "가격", id: "price", type: "number", required: true },
    { label: "색상", id: "color", type: "color", required: true },
    { label: "크기", id: "size", type: "text", required: true },
    { label: "상세정보", id: "details", type: "text", required: true },
    { label: "재고량", id: "stock", type: "number", required: true },
  ];

  return (
    <div className={`center ${shake ? "animate-shake" : ""}`}>
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
          if (selectedProduct) {
            setEditProduct(selectedProduct);
          }
        }}
      />

      {selectedOption && (
        <form className="w-5/6 m-10" onSubmit={submitHandler}>
          {fields.map((field) => (
            <InputField
              key={field.id}
              label={field.label}
              id={field.id}
              index={1}
              value={editProduct ? editProduct[field.id] || "" : ""}
              type={field.type}
              required={field.required}
              onChange={(value) => {
                if (editProduct) {
                  setEditProduct({
                    ...editProduct,
                    [field.id]: value,
                  });
                }
              }}
              placeholder={
                selectedOption ? String(selectedOption[field.id]) : ""
              }
              disabled={field.disabled}
            />
          ))}
          <Button goal={"제품 변경하기"} />
        </form>
      )}
      <SlideUpMessage
        message="변경이 완료되었습니다."
        show={showSuccessMessage}
      />
      <SlideUpMessage
        message="변경에 실패하였습니다."
        show={showFailureMessage}
        fail={true}
      />
    </div>
  );
};
