"use client";
import Card from "../Card/GalleryCard";
import React, { FormEvent, useState } from "react";
import { Artwork } from "@prisma/client";
import Button from "../Button/SubmitButton";
import { ArtistInfo } from "../../../Types/Art";
import { InputField } from "../Input/InputField";
import DragAndDropUploader from "../../ImageUploader/MultiFormDragandDrop";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { handleUpload, postArtwork } from "@/lib/action";
import OnClickButton from "../Button/OnClickButton";
import { useNotification } from "@/src/hooks/useNotification";
import SlideUpMessage from "../Alert/Slideup";

type UploadArtwork = Omit<Artwork, "artwork_id">;

interface ModalProps {
  artistInfo: ArtistInfo;
  closeModal: () => void;
}

const Modal = ({ artistInfo, closeModal }: ModalProps) => {
  const [name] = useState(artistInfo.name);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    shake,
    showFailureMessage,
    showSuccessMessage,
    startFailureNotification,
    startSuccessNotification,
  } = useNotification();

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
          let key = await handleUpload(files[i], name);
          keys.push(key);
        }
      }
    }

    let newFormData = artworks.map((item, index) => ({
      ...item,
      s3key: keys[index],
      order: index + 1,
    }));

    try {
      for (let i = 0; i < newFormData.length; i++) {
        await postArtwork(newFormData[i]);
      }

      startSuccessNotification();
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (error) {
      startFailureNotification();
    }
  };

  /** 작품 폼 추가 */
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

  /** 올라간 작품폼 제거 */
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
      className={`top-16 tabletLandscape:top-1 overflow-scroll transform -translate-x-1/2 -translate-y-[2%] fixed flex justify-center items-center w-5/6  tabletLandscape:mt-20 left-1/2 tabletLandscape:left-[50%] tabletLandscape:w-4/6 tabletLandscape:h-5/6 hide-scrollbar ${
        shake ? "animate-shake-modal" : ""
      }`}
    >
      <Card>
        <form onSubmit={submitHandler} className="mb-10">
          <div>
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
                  className="flex flex-col items-center justify-center w-full h-full p-5 mt-1 overflow-hidden text-black border tabletLandscape:mt-0 tabletLandscape:items-start tabletLandscape:flex-row test__body"
                  key={index}
                >
                  <div className="w-5/6 pb-3 mx-3 h-52 tabletLandscape:h-full tabletLandscape:w-5/6 input_image ">
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
                  <div className="flex-col items-center justify-center w-5/6 pb-1 m-1 h-2/3 tabletLandscape:w-full input_text">
                    <InputField
                      label="작품명"
                      id="title"
                      value={item.title}
                      type="text"
                      required={true}
                      onChange={(value: string) =>
                        handleInputChange(index)({
                          target: { keyname: "title", value },
                        })
                      }
                    />
                    <InputField
                      label="제작년도"
                      id="createdAt"
                      value={item.createdAt as number}
                      type="number"
                      required={true}
                      onChange={(value: number) =>
                        handleInputChange(index)({
                          target: { keyname: "createdAt", value },
                        })
                      }
                    />
                    <InputField
                      label="재료"
                      id="material"
                      value={item.material ? item.material : ""}
                      type="text"
                      required={true}
                      onChange={(value: string) =>
                        handleInputChange(index)({
                          target: { keyname: "material", value },
                        })
                      }
                    />
                    <InputField
                      label="크기"
                      id="size"
                      value={item.size ? item.size : ""}
                      type="text"
                      required={true}
                      onChange={(value: string) =>
                        handleInputChange(index)({
                          target: { keyname: "size", value },
                        })
                      }
                    />
                    <InputField
                      label="가격"
                      id="price"
                      value={item.price ? item.price : 0}
                      type="number"
                      required={true}
                      onChange={(value: number) =>
                        handleInputChange(index)({
                          target: { keyname: "price", value },
                        })
                      }
                    />
                    <InputField
                      label="작품설명"
                      id="description"
                      value={item.description ? item.description : ""}
                      type="text"
                      required={true}
                      onChange={(value: string) =>
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
                      className="absolute right-0 z-10 p-2 m-2 font-bold text-white bg-red-500 rounded-md -top-1"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </Carousel>
          </div>
          <div className="flex items-center justify-center button">
            <div className="mx-1 mb-4">
              <Button goal="작품 등록" />
            </div>
            <div className="mx-1 mb-4">
              <OnClickButton goal="작품 추가" onClick={addNewForm} />
            </div>
            <div className="mx-1 mb-4">
              <OnClickButton goal="창 닫기" onClick={closeModal} />
            </div>
          </div>
        </form>
      </Card>
      <SlideUpMessage
        message="작품 등록이 완료되었습니다."
        show={showSuccessMessage}
      />
      <SlideUpMessage
        message="작품 등록에 실패하였습니다."
        show={showFailureMessage}
        fail={true}
      />
    </div>
  );
};
export default Modal;
