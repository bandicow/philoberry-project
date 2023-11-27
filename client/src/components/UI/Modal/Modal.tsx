"use client";
import Card from "../Card/GalleryCard";
import React, { FormEvent, useState } from "react";
import Button from "../Button/SubmitButton";
import { ArtistInfo, ArtistValueProps } from "../../../Types/Art";
import { InputField } from "../Input/InputField";
import DragAndDropUploader from "../../ImageUploader/soloDragandDrop";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { handleUpload, postArtwork } from "@/lib/action";
import OnClickButton from "../Button/OnClickButton";
import { useNotification } from "@/src/hooks/useNotification";
import SlideUpMessage from "../Alert/Slideup";
import { useArtworkStore } from "@/utils/store/artworkStore";

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

  // Zustand 스토어 , 상태 및 메소드
  const {
    artworks,
    files,
    addArtwork,
    updateArtwork,
    removeArtwork,
    addFile,
    updateFile,
    removeFile,
    resetArtwork,
  } = useArtworkStore();

  const handleInputChange = (index: number) => (event: any) => {
    const updatedArtwork = {
      ...artworks[index],
      [event.target.keyname]: event.target.value,
    };

    updateArtwork(index, updatedArtwork); // Zustand 스토어의 updateArtwork 메서드 사용
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
      artist_name: name,
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
        resetArtwork();
      }, 1000);
    } catch (error) {
      startFailureNotification();
    }
  };

  /** 작품 폼 추가 */
  const addNewForm = () => {
    addArtwork({
      // Zustand 스토어의 addArtwork 메서드 사용
      title: "",
      artist_name: name,
      s3key: "",
      description: "",
      material: "",
      size: "",
      price: 0,
      isSold: false,
      order: artworks.length + 1,
      createdAt: 0,
    });
    setCurrentSlide(artworks.length);
  };

  /** 올라간 작품폼 제거 */
  const removeForm = (index: number) => {
    removeArtwork(index); // Zustand 스토어의 removeArtwork 메서드 사용
    removeFile(index); // Zustand 스토어의 removeFile 메서드 사용

    // Update the current slide to the previous one
    if (currentSlide === index && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const fields = [
    { label: "작품명", id: "title", type: "text" },
    { label: "제작년도", id: "createdAt", type: "number" },
    { label: "재료", id: "material", type: "text" },
    { label: "크기", id: "size", type: "text" },
    { label: "가격", id: "price", type: "number" },
    { label: "작품설명", id: "description", type: "text" },
  ];

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
                          files[index]
                            ? updateFile(index, file)
                            : addFile(file);
                        }
                      }}
                      uploadedImages={files[index] || undefined}
                    />
                  </div>
                  <div className="flex-col items-center justify-center w-5/6 pb-1 m-1 h-2/3 tabletLandscape:w-full input_text">
                    {fields.map((field) => (
                      <InputField
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        value={
                          artworks[index] && field.id in artworks[index]
                            ? artworks[index][
                                field.id as keyof ArtistValueProps
                              ] || ""
                            : ""
                        }
                        type={field.type}
                        required={true}
                        onChange={(value: string | number) =>
                          handleInputChange(index)({
                            target: { keyname: field.id, value },
                          })
                        }
                      />
                    ))}
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
