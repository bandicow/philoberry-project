"use client";
import { FormEvent, useState } from "react";
import axios from "axios";

import DragAndDropUploader from "../ImageUploader/MultiDragAndDrop";
import { NewProduct } from "../../Types/Product";
import {
  StringInputField,
  NumberInputField,
} from "../../components/UI/Input/InputField";
import Button from "../UI/Button/SubmitButton";

function NewProductForm() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [details, setDetails] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [seller, setSeller] = useState("");
  const [url, setUrl] = useState("");
  const [stock, setStock] = useState(0);

  /** 이미지 업로드 */
  async function handleUpload(file: File) {
    try {
      const response = await axios.post("/api/s3Upload", {
        file: { name: file.name, type: file.type },
        name: name,
      });
      const { url, key } = response.data;

      // Create a new Blob instance
      const blob = new Blob([file], { type: file.type });

      //사전 서명된(presigned) URL을 사용하여 S3에 직접 파일을 업로드
      await axios.put(url, blob);

      return key;
    } catch (error) {
      console.error(error);
    }
  }

  /** 이미지 멀티 업로드 */
  async function handleMultipleUploads(files: File[]): Promise<string[]> {
    try {
      const uploadPromises = files.map((file) => handleUpload(file));
      const keys = await Promise.all(uploadPromises);

      return keys;
    } catch (error) {
      console.log(error);

      // Return an empty array when error occurs.
      return [];
    }
  }

  async function addProductHandler(productData: NewProduct) {
    try {
      const response = await axios.post("/api/productUpload", productData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // 제출
  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    let keys: string[] = [];
    try {
      keys = await handleMultipleUploads(uploadedImages);
      // 여기서 모든 파일들이 올라갔으며 uploadedImageKeys 도 갱신된 상태입니다.
    } catch (error) {
      alert("이미지 업로드 실패");
      return ""; // 에러 발생 시 여기서 종료
    }

    const productData: NewProduct = {
      name: name,
      category: category,
      price: price,
      material: material,
      color: color,
      size: size,
      details: details,
      precautions: precautions,
      seller: seller,
      stock: stock,
      url: url, // Extract only URLs
      mainImage: keys && keys.length > 0 ? keys[0] : null,
      productImages: keys,
    };

    addProductHandler(productData);
  }

  return (
    <div className="w-full">
      <form className="flex-col p-10 rounded-md" onSubmit={submitHandler}>
        <div>
          <DragAndDropUploader
            setUploadedImages={setUploadedImages}
            uploadedImages={uploadedImages}
          />
        </div>
        <StringInputField
          label="제품명"
          id="name"
          value={name}
          type="text"
          setValue={setName}
        />
        <StringInputField
          label="분류"
          id="category"
          value={category}
          type="text"
          setValue={setCategory}
        />
        <NumberInputField
          label="가격"
          id="price"
          value={price}
          type="number"
          setValue={setPrice}
        />
        <StringInputField
          label="소재"
          id="material"
          value={material}
          type="text"
          setValue={setMaterial}
        />
        <StringInputField
          label="색상"
          id="color"
          value={color}
          type="color"
          setValue={setColor}
        />
        <StringInputField
          label="크기"
          id="size"
          value={size}
          type="text"
          setValue={setSize}
        />
        <NumberInputField
          label="재고량"
          id="stock"
          value={stock}
          type="number"
          setValue={setStock}
        />
        <StringInputField
          label="판매자"
          id="seller"
          value={seller}
          type="text"
          setValue={setSeller}
        />
        <StringInputField
          label="판매 URL"
          id="url"
          value={url}
          type="url"
          setValue={setUrl}
        />
        <StringInputField
          label="제품 설명"
          id="details"
          value={details}
          type="text"
          setValue={setDetails}
        />
        <StringInputField
          label="취급 주의사항"
          id="precautions"
          value={precautions}
          type="text"
          setValue={setPrecautions}
        />
        <Button goal="제품 추가하기" />
      </form>
    </div>
  );
}

export default NewProductForm;
