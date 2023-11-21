"use client";
import React, { FormEvent, useState } from "react";
import DragAndDropUploader from "../ImageUploader/MultiFormDragandDrop";
import { InputField } from "../UI/Input/InputField";
import Button from "../UI/Button/SubmitButton";
import { artistUploadHandler, handleUpload } from "@/lib/action";
import SlideUpMessage from "../UI/Alert/Slideup";
import { useNotification } from "@/src/hooks/useNotification";
import { useArtistStore } from "@/utils/store/artistStore";
import { NewArtist } from "@/src/Types/ZustandType";

type InputField = {
  label: string;
  id: keyof NewArtist;
  type: string;
};

export const UploadArtist = () => {
  const [image, setImage] = useState<File | null>(null);
  const { ArtistData, setArtist } = useArtistStore();
  const {
    shake,
    showFailureMessage,
    showSuccessMessage,
    startFailureNotification,
    startSuccessNotification,
  } = useNotification();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    let key: string = "";

    if (image && ArtistData.name) {
      try {
        key = await handleUpload(image, ArtistData.name);
      } catch (error) {
        alert("이미지 업로드 실패");
        return "";
      }
    }

    if (ArtistData) {
      const artistData = {
        ...ArtistData,
        name: ArtistData.name || "",
        major: ArtistData.major || "",
        profile: ArtistData.profile || "",
        website_url: ArtistData.website_url || "",
        artist_image: key,
      };

      try {
        await artistUploadHandler(artistData);
        startSuccessNotification();
        setArtist("name", "");
        setArtist("major", "");
        setArtist("profile", "");
        setArtist("website_url", "");
        setArtist("artist_image", null);
        setImage(null);
      } catch (error) {
        startFailureNotification();
      }
    }
  };
  const inputFields: InputField[] = [
    {
      label: "작가명",
      id: "name",
      type: "text",
    },
    {
      label: "전공",
      id: "major",
      type: "text",
    },
    {
      label: "작가설명",
      id: "profile",
      type: "text",
    },
    {
      label: "작가 인스타",
      id: "website_url",
      type: "url",
    },
  ];

  return (
    <div className={`w-full h-full center ${shake ? "animate-shake" : ""}`}>
      <h1 className="mt-10 text-xl font-bold">작가 등록</h1>
      <form onSubmit={submitHandler} className="w-full mb-20">
        <div className="justify-center w-full h-full ml-5 mr-5 rounded-md tabletLandscape:flex">
          <div className="w-5/6 m-5">
            <DragAndDropUploader
              setUploadedImages={setImage}
              uploadedImages={image}
            />
          </div>
          <div className="w-5/6 m-5">
            {inputFields.map((field) => {
              return (
                <InputField
                  key={field.id}
                  label={field.label}
                  id={field.id}
                  value={ArtistData[field.id] || ""}
                  type={field.type}
                  required={true}
                  onChange={(value) => {
                    if (
                      typeof value === "string" ||
                      typeof value === "number"
                    ) {
                      setArtist(field.id, value);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="h-10 mt-10 w-30">
          <Button goal={"작가 등록"} />
        </div>
      </form>
      <SlideUpMessage
        message="작가 등록이 완료되었습니다."
        show={showSuccessMessage}
      />
      <SlideUpMessage
        message="작가 등록에 실패하였습니다."
        show={showFailureMessage}
        fail={true}
      />
    </div>
  );
};
