"use client";
import { FormEvent, useRef, useState } from "react";

import Card from "../UI/Card/addCard";
import classes from "./NewProductForm.module.css";
import DragAndDropUploader from "../ImageUploader/DragAndDrop";
import Image from "next/image";

interface NewProductFormProps {
  onAddProduct: (productData: ProductData_notId) => void;
}

interface ProductData_notId {
  name: string;
  imageurl: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  createdAt: { $date: Date };
}

function NewProductForm(props: NewProductFormProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const imageurlInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const stockInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredName = nameInputRef.current!.value;
    const enteredImageurl = imageurlInputRef.current!.value;
    const enteredPrice = Number(priceInputRef.current?.value);
    const enteredDescription = descriptionInputRef.current!.value;
    const enteredCategory = categoryInputRef.current!.value;
    const enteredStock = Number(stockInputRef.current?.value);

    const productData = {
      name: enteredName,
      imageurl: enteredImageurl,
      description: enteredDescription,
      price: enteredPrice,
      category: enteredCategory,
      stock: enteredStock,
      createdAt: { $date: new Date() },
    };

    props.onAddProduct(productData);
  }

  /*드래그앤드롭 이미지 업로드 상태관리 */
  const [selectedImage, setselectedImage] = useState<File | null>(null);

  /*드래그앤드롭 이미지 업로드 핸들러 */
  const ImageUploadHandler = (file: File) => {
    setselectedImage(file);
  };

  /**
 선택된 이미지를 사용하여 제품 추가 로직을 처리합니다.
 예를 들면, 선택된 이미지를 서버로 업로드하고 제품 데이터와 함께 저장할 수 있습니다.
   */
  const handleSubmit = () => {};

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="Name">제품명</label>
          <input type="text" required id="Name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Category">분류</label>
          <input type="text" required id="Category" ref={categoryInputRef} />
        </div>
        <div>
          <DragAndDropUploader
            onImageUpload={ImageUploadHandler}
            inputRef={imageurlInputRef}
          />
          {selectedImage && (
            <div className="flex items-center justify-center">
              <h2>선택된 이미지</h2>
              <Image
                className="border border-gray-300 rounded-md "
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                width={400}
                height={300}
              />
            </div>
          )}
          <button onClick={handleSubmit}>11</button>
        </div>

        {/* <div className={classes.control}>
          <label htmlFor="Imageurl">제품 사진</label>
          <input type="url" required id="Imageurl" ref={imageurlInputRef} />
        </div> */}
        <div className={classes.control}>
          <label htmlFor="Price">가격</label>
          <input type="text" required id="Price" ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Stock">재고량</label>
          <input type="text" required id="Stock" ref={stockInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Description">제품 설명</label>
          <textarea
            id="Description"
            required
            rows={5}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>제품 추가하기</button>
        </div>
      </form>
    </Card>
  );
}

export default NewProductForm;
