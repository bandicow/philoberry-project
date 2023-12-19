"use client";
import Card from "../Card/GalleryCard";
import React, { FormEvent, useState } from "react";
import Button from "../Button/SubmitButton";
import { ArtistInfo, ArtistValueProps } from "../../../Types/Art";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { handleMultipleUploads, postArtwork } from "@/lib/action";
import OnClickButton from "../Button/OnClickButton";
import { useNotification } from "@/src/hooks/useNotification";
import SlideUpMessage from "../Alert/Slideup";
import { useArtworkStore } from "@/utils/store/artworkStore";
import { Carousel } from "react-responsive-carousel";
import DragAndDropUploader from "../../ImageUploader/ArtworkImageUploader";
import { InputField } from "../Input/InputField";

interface ModalProps {
  artistInfo: ArtistInfo;
  closeModal: () => void;
}

const ArtworkUploadModal = ({ artistInfo, closeModal }: ModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const Notification = useNotification();
  const store = useArtworkStore();
  const { artworks } = store;

  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    try {
      // artworks 배열을 순회하며 각 artwork의 이미지들을 업로드하고, 그 결과를 저장.
      for (let i = 0; i < artworks.length; i++) {
        store.updateArtwork(i, { ...artworks[i] });

        let artwork = store.artworks[i]; // 수정된 artwork를 다시 가져옵니다.
        let keys: string[] = [];

        // handleMultipleUploads 함수를 사용하여 artwork의 모든 이미지 업로드
        keys = await handleMultipleUploads(
          artwork.artworkImages,
          artwork.artist_name,
          "작품"
        );

        // 업로드된 이미지 키들을 이용하여 새로운 폼 데이터를 생성
        let newFormData = {
          ...artwork,
          mainImage: keys[0],
          artworkImages: keys,
        };

        await postArtwork(newFormData);
      }
      Notification.startSuccessNotification();
      store.resetAll();
      setTimeout(() => {
        closeModal();
        store.resetAll();
      }, 1000);
    } catch (error) {
      Notification.startFailureNotification();
    }
  }

  //**입력에 따라 특정 작품의 데이터를 업데이트하고, 이를 Zustand 스토어에 저장*/
  const handleInputChange = (index: number) => (event: any) => {
    const updatedArtwork = {
      ...artworks[index],
      [event.target.keyname]: event.target.value,
    };

    store.updateArtwork(index, updatedArtwork); // Zustand 스토어의 updateArtwork 메서드 사용
  };

  const closeForm = () => {
    closeModal();
    store.resetAll();
  };

  const addNewForm = () => {
    store.addArtwork({
      title: "",
      artist_name: artistInfo.name,
      mainImage: "",
      description: "",
      material: "",
      size: "",
      price: 0,
      isSold: false,
      order: artworks.length + 1,
      createdAt: 0,
      artworkImages: [], // 추가된 부분
    });
    store.addFile(artworks.length, []); // 수정된 부분
    setCurrentSlide(artworks.length);
  };

  const removeForm = (index: number) => {
    store.resetArtwork(index); // Zustand 스토어의 resetArtwork 메서드 사용
    store.resetFiles(index); // Zustand 스토어의 removeFile 메서드 사용

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
        Notification.shake ? "animate-shake-modal" : ""
      }`}
    >
      <Card>
        <form onSubmit={submitHandler} className="relative">
          <div>
            <Carousel
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)}
              swipeable={true}
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
            >
              {artworks.map((artwork, index) => (
                <div key={index} className="mb-10 relative">
                  <div className="w-full h-auto mb-10">
                    <DragAndDropUploader index={index} />
                  </div>
                  <div className="flex-col items-center px-1 justify-center w-full pb-1 m-1 h-2/3 input_text">
                    {fields.map((field) => (
                      <InputField
                        index={index}
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
                      className="absolute right-0 z-99 p-2 m-2 font-bold text-white bg-red-500 rounded-md -bottom-10"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </Carousel>
          </div>
          <div className="flex items-center justify-center button text-xs tablet:text-sm tabletLandscape:text-base">
            <div className="mx-1 mb-4">
              <Button goal="작품 등록" />
            </div>
            <div className="mx-1 mb-4">
              <OnClickButton goal="작품 추가" onClick={addNewForm} />
            </div>
            <div className="mx-1 mb-4">
              <OnClickButton goal="창 닫기" onClick={closeForm} />
            </div>
          </div>
        </form>
      </Card>
      <SlideUpMessage
        message="작품 등록이 완료되었습니다."
        show={Notification.showSuccessMessage}
      />
      <SlideUpMessage
        message="작품 등록에 실패하였습니다."
        show={Notification.showFailureMessage}
        fail={true}
      />
    </div>
  );
};

export default ArtworkUploadModal;
