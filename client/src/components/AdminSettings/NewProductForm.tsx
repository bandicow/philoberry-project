"use client";
import { FormEvent, useState } from "react";

import DragAndDropUploader from "../ImageUploader/MultiDragAndDrop";
import { NewProduct } from "../../Types/Product";
import { InputField } from "../UI/Input/InputField";
import Button from "../UI/Button/SubmitButton";
import { addProductHandler, handleMultipleUploads } from "@/lib/action";
import { useProductStore } from "@/utils/productStore";

function NewProductForm() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const store = useProductStore(); // store 사용

  // 제출
  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    let keys: string[] = [];
    try {
      keys = await handleMultipleUploads(
        uploadedImages,
        store.productData.name
      );
      // 여기서 모든 파일들이 올라갔으며 uploadedImageKeys 도 갱신된 상태입니다.
    } catch (error) {
      alert("이미지 업로드 실패");
      return ""; // 에러 발생 시 여기서 종료
    }

    addProductHandler({
      ...store.productData,
      mainImage: keys && keys.length > 0 ? keys[0] : null,
      productImages: keys,
    });
  }

  const inputFields: {
    label: string;
    id: keyof Omit<NewProduct, "productImages" | "mainImage">;
    type: string;
  }[] = [
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
    <div className="w-5/6 center">
      <h1 className="mt-10 text-xl font-bold">제품 등록</h1>
      <form className="flex-col w-full p-5 rounded-md" onSubmit={submitHandler}>
        <div>
          <DragAndDropUploader
            setUploadedImages={setUploadedImages}
            uploadedImages={uploadedImages}
          />
        </div>
        {inputFields.map((field) => (
          <InputField
            key={field.id}
            label={field.label}
            id={field.id}
            value={store.productData[field.id] || ""}
            type={field.type}
            required={true}
            setValue={(value) => {
              if (typeof value === "string" || typeof value === "number") {
                store.setProductData(field.id, value);
              }
            }}
          />
        ))}

        <Button goal="제품 추가하기" />
      </form>
    </div>
  );
}

export default NewProductForm;
