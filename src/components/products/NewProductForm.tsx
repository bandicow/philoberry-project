"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import plimit from "p-limit";

import classes from "./NewProductForm.module.css";
import DragAndDropUploader from "../ImageUploader/DragAndDrop";
import { NewProduct } from "../../Types/Product";

function NewProductForm() {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
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
      const url = response.data.url;

      // Create a new FormData instance
      const formData = new FormData();

      // Append the file to the 'file' field
      formData.append("file", file);

      //사전 서명된(presigned) URL을 사용하여 S3에 직접 파일을 업로드
      // 직접 업로드기에 백엔드 로직 필요없음
      await axios.put(url, formData);

      // Save the uploaded image's URL
      setUploadedImageUrls((prevUrls) => [...prevUrls, url]);
      console.log(url);
    } catch (error) {
      console.error(error);
    }
  }
  /** 이미지 멀티 업로드 */

  async function handleMultipleUploads(files: File[]) {
    const limit = plimit(5);

    const uploadPromises = files.map((file) => limit(() => handleUpload(file)));
    await Promise.all(uploadPromises);
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

    try {
      await handleMultipleUploads(uploadedImages);
    } catch (error) {
      alert("이미지 업로드 실패");
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
      mainImageUrl:
        uploadedImageUrls && uploadedImageUrls.length > 0
          ? uploadedImageUrls[0]
          : null,
      productImages:
        uploadedImageUrls && uploadedImageUrls.length > 1
          ? uploadedImageUrls.slice(1)
          : [],
    };

    addProductHandler(productData);
  }

  return (
    <div className="">
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <DragAndDropUploader
            setUploadedImages={setUploadedImages}
            uploadedImages={uploadedImages}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">제품명</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="category">분류</label>
          <input
            type="text"
            required
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">가격</label>
          <input
            type="text"
            required
            id="price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="material">소재</label>
          <input
            type="text"
            required
            id="material"
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="size">크기</label>
          <input
            type="text"
            required
            id="size"
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="color">색상</label>
          <input
            type="text"
            required
            id="color"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Stock">재고량</label>
          <input
            type="text"
            required
            id="Stock"
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="seller">판매자</label>
          <input
            type="text"
            required
            id="seller"
            onChange={(e) => setSeller(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="url">판매 URL</label>
          <input
            type="url"
            required
            id="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="details">제품 설명</label>
          <input
            id="details"
            required
            onChange={(e) => setDetails(e.target.value)}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="precautions">취급주의사항</label>
          <input
            id="precautions"
            required
            onChange={(e) => setPrecautions(e.target.value)}
          ></input>
        </div>
        <div className={classes.actions}>
          <button type="submit">제품 추가하기</button>
        </div>
      </form>
    </div>
  );
}

export default NewProductForm;
