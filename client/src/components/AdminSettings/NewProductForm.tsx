"use client";
import { FormEvent, useState } from "react";

import DragAndDropUploader from "../ImageUploader/MultiDragAndDrop";
import { NewProduct } from "../../Types/Product";
import { InputField } from "../UI/Input/InputField";
import Button from "../UI/Button/SubmitButton";
import { postProduct, handleMultipleUploads } from "@/lib/action";
import { useProductStore } from "@/utils/store/productStore";
import SlideUpMessage from "../UI/Alert/Slideup";
import { useNotification } from "@/src/hooks/useNotification";

type InputField = {
  label: string;
  id: keyof Omit<NewProduct, "productImages" | "mainImage">;
  type: string;
};

function NewProductForm() {
  const {
    shake,
    showFailureMessage,
    showSuccessMessage,
    startFailureNotification,
    startSuccessNotification,
  } = useNotification();

  const store = useProductStore(); // store 사용

  // 제출
  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    let keys: string[] = [];
    try {
      keys = await handleMultipleUploads(
        store.productData.productImages,
        store.productData.name,
        "제품"
      );
      // 여기서 모든 파일들이 올라갔으며 uploadedImageKeys 도 갱신된 상태입니다.
      //Promise 이므로 await해야 에러 걸러냄
      await postProduct({
        ...store.productData,
        mainImage: keys && keys.length > 0 ? keys[0] : null,
        productImages: keys,
      });
      startSuccessNotification();
      store.resetProductData();
    } catch (error) {
      startFailureNotification();

      return ""; // 에러 발생 시 여기서 종료
    }
  }

  const inputFields: InputField[] = [
    { label: "제품명", id: "name", type: "text" },
    { label: "분류", id: "category", type: "text" },
    { label: "가격", id: "price", type: "number" },
    { label: "소재", id: "material", type: "text" },
    { label: "색상", id: "color", type: "color" },
    { label: "크기", id: "size", type: "text" },
    { label: "재고량", id: "stock", type: "number" },
    { label: "판매자", id: "seller", type: "text" },
    { label: "판매 URL", id: "url", type: "url" },
    { label: "제품 설명", id: "details", type: "text" },
    { label: "취급 주의사항", id: "precautions", type: "text" },
  ];

  return (
    <div className={`w-5/6 center ${shake ? "animate-shake" : ""}`}>
      <h1 className="mt-10 text-xl font-bold">제품 등록</h1>
      <form
        className="mb-10 flex-col w-full p-5 rounded-md"
        onSubmit={submitHandler}
      >
        <div className="mb-5">
          <DragAndDropUploader />
        </div>
        {inputFields.map((field) => (
          <InputField
            key={field.id}
            label={field.label}
            id={field.id}
            index={1}
            value={store.productData[field.id] || ""}
            type={field.type}
            required={true}
            onChange={(value) => {
              if (typeof value === "string" || typeof value === "number") {
                store.setProductData(field.id, value);
              }
            }}
          />
        ))}

        <Button goal="제품 추가하기" />
      </form>
      <SlideUpMessage
        message="제품을 추가하였습니다."
        show={showSuccessMessage}
      />
      <SlideUpMessage
        message="제품 추가에 실패하였습니다."
        show={showFailureMessage}
        fail={true}
      />
    </div>
  );
}

export default NewProductForm;
