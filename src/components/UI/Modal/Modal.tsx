"use client";
import Card from "../Card/GalleryCard";
import React, { FormEvent, useState } from "react";
import { Artwork } from "@prisma/client";
import Button from "../Button/SubmitButton";
import { ArtistInfo } from "../../../Types/Art";
import { StringInputField, NumberInputField } from "../Input/InputField";
import DragAndDropUploader from "../../ImageUploader/MultiFormDragandDrop";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { handleUpload, postArtwork } from "@/lib/action";

type UploadArtwork = Omit<Artwork, "artwork_id">;

interface ModalProps {
  artistInfo: ArtistInfo;
}

const Modal = ({ artistInfo }: ModalProps) => {
  const [name] = useState(artistInfo.name);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [artworks, setArtworks] = useState<UploadArtwork[]>([
    {
      title: "",
      artist_name: name,
      s3key: "",
      description: "",
      material: "",
      size: "",
      price: 0,
      isSold: false,
      order: 0,
      createdAt: 0,
    },
  ]);
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (index: number) => (event: any) => {
    const newFormData = artworks.map((item, i) => {
      if (i !== index) return item;

      return { ...item, [event.target.keyname]: event.target.value };
    });

    setArtworks(newFormData);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    let keys: string[] = [];

    if (files) {
      for (let i = 0; i < artworks.length; i++) {
        if (files[i]) {
          try {
            let key = await handleUpload(files[i], name);
            keys.push(key);
          } catch (err) {
            alert("이미지 업로드 실패");
            return;
          }
        }
      }
    }

    let newFormData = artworks.map((item, index) => ({
      ...item,
      s3key: keys[index],
      order: index + 1,
    }));

    for (let i = 0; i < newFormData.length; i++) {
      await postArtwork(newFormData[i]);
    }
  };

  /** 작품 올리기 추가 */
  const addNewForm = () => {
    setArtworks([
      ...artworks,
      {
        title: "",
        artist_name: name,
        s3key: "",
        description: "",
        material: "",
        size: "",
        price: 0,
        isSold: false,
        order: 0,
        createdAt: 0,
      },
    ]);
    setCurrentSlide(artworks.length);
  };

  /** 올라간 작품 제거 */
  const removeForm = (index: number) => {
    setArtworks((prevArtworks) => prevArtworks.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // Update the current slide to the previous one
    if (currentSlide === index && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: `${window.scrollY + 15}px`,
        left: "50%",
        transform: "translate(-50%,-2%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="w-full h-full margin-0"
    >
      <Card>
        <form onSubmit={submitHandler}>
          <div className="relative">
            <Carousel
              selectedItem={currentSlide}
              onChange={setCurrentSlide}
              swipeable
              showArrows
              infiniteLoop
              className="mt-5"
              showThumbs={false}
            >
              {artworks.map((item, index) => (
                <div
                  className="flex items-center w-full h-full p-5 overflow-hidden text-black border test__body"
                  key={index}
                >
                  <div className="w-1/2 h-full m-5 pb-11 input_image ">
                    <DragAndDropUploader
                      setUploadedImages={(file: File | null) => {
                        if (file) {
                          setFiles((prevFiles) => {
                            const newFiles = [...prevFiles];
                            newFiles[index] = file;
                            return newFiles;
                          });
                        }
                      }}
                      uploadedImages={files[index] || undefined}
                    />
                  </div>
                  <div className="flex-col w-1/2 pb-10 input_text">
                    <StringInputField
                      label="작품명"
                      id="title"
                      value={item.title}
                      type="text"
                      setValue={(value: string) =>
                        handleInputChange(index)({
                          target: { keyname: "title", value },
                        })
                      }
                    />
                    <NumberInputField
                      label="제작년도"
                      id="createdAt"
                      value={item.createdAt as number}
                      type="number"
                      setValue={(value: number) =>
                        handleInputChange(index)({
                          target: { keyname: "createdAt", value },
                        })
                      }
                    />
                    <StringInputField
                      label="재료"
                      id="material"
                      value={item.material ? item.material : ""}
                      type="text"
                      setValue={(value: string) =>
                        handleInputChange(index)({
                          target: { keyname: "material", value },
                        })
                      }
                    />
                    <StringInputField
                      label="크기"
                      id="size"
                      value={item.size ? item.size : ""}
                      type="text"
                      setValue={(value: string) =>
                        handleInputChange(index)({
                          target: { keyname: "size", value },
                        })
                      }
                    />
                    <NumberInputField
                      label="가격"
                      id="price"
                      value={item.price ? item.price : 0}
                      type="number"
                      setValue={(value: number) =>
                        handleInputChange(index)({
                          target: { keyname: "price", value },
                        })
                      }
                    />
                    <StringInputField
                      label="작품설명"
                      id="description"
                      value={item.description ? item.description : ""}
                      type="text"
                      setValue={(value: string) =>
                        handleInputChange(index)({
                          target: { keyname: "description", value },
                        })
                      }
                    />
                  </div>
                  {artworks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeForm(index)}
                      className="absolute top-0 z-10 p-2 m-2 text-white bg-red-500 rounded-full right-5"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </Carousel>

            <button
              onClick={addNewForm}
              className="absolute z-20 pt-0 pl-1 pr-1 font-extrabold text-gray-500 rounded-full shadow-md hover:bg-red-200 shadow-black bottom-2 right-1/4 "
            >
              +
            </button>
          </div>

          <div className="mb-4">
            <Button goal="작품 등록" />
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Modal;
