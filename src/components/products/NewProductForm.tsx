"use client";
import { FormEvent, useRef, useState } from "react";
import { ProductData, ImageData } from "../../Types/Product";
import axios from "axios";

import classes from "./NewProductForm.module.css";
import DragAndDropUploader from "../ImageUploader/DragAndDrop";

interface NewProductFormProps {
  onAddProduct: (productData: ProductData) => void;
}

function NewProductForm(props: NewProductFormProps) {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [details, setDetails] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [url, setUrl] = useState("");
  const [seller, setSeller] = useState("");
  const [isFavorited, setIsFavorited] = useState(0);
  const [stock, setStock] = useState(0);

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const productData: ProductData = {
      name: name,
      category: category,
      price: price,
      material: material,
      color: color,
      size: size,
      details: details,
      precautions: precautions,
      url: url,
      seller: seller,
      isFavorited: isFavorited,
      stock: stock,
      images: uploadedImageUrls,
    };

    props.onAddProduct(productData);
  }

  /** 이미지 업로드 */
  async function handleUpload(file: File) {
    try {
      const response = await axios.post("/api/s3Upload", {
        file: { name: file.name, type: file.type },
      });
      const url = response.data.url;

      // Create a new FormData instance
      const formData = new FormData();

      // Append the file to the 'file' field
      formData.append("file", file);

      // Use the presigned URL to upload the file to S3
      await axios.put(url, formData);

      // Save the uploaded image's URL
      setUploadedImageUrls((prevUrls) => [...prevUrls, url]);
    } catch (error) {
      console.error(error);
    }
  }
  /** 이미지 멀티 업로드 */

  async function handleMultipleUploads(files: File[]) {
    for (const file of files) {
      await handleUpload(file);
    }
  }

  return (
    <div className="">
      <form className={classes.form}>
        <div>
          <DragAndDropUploader onImagesUpload={handleMultipleUploads} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Name">제품명</label>
          <input
            type="text"
            required
            id="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Category">분류</label>
          <input
            type="text"
            required
            id="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Price">가격</label>
          <input
            type="text"
            required
            id="Price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Material">소재</label>
          <input
            type="text"
            required
            id="material"
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Material">크기</label>
          <input
            type="text"
            required
            id="size"
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Color">색상</label>
          <input
            type="color"
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
          <label htmlFor="Stock">판매자</label>
          <input
            type="text"
            required
            id="Seller"
            onChange={(e) => setSeller(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Stock">판매 URL</label>
          <input
            type="url"
            required
            id="Url"
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
            id="Precautions"
            required
            onChange={(e) => setPrecautions(e.target.value)}
          ></input>
        </div>
        <div className={classes.actions}>
          <button onSubmit={submitHandler}>제품 추가하기</button>
        </div>
      </form>
    </div>
  );
}

export default NewProductForm;
