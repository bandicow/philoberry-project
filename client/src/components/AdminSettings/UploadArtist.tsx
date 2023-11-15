"use client";
import React, { FormEvent, useState } from "react";
import { Artist } from "@prisma/client";
import DragAndDropUploader from "../ImageUploader/DragAndDrop";
import { InputField } from "../UI/Input/InputField";
import Button from "../UI/Button/SubmitButton";
import { artistUploadHandler, handleUpload } from "@/lib/action";
import SlideUpMessage from "../UI/Alert/Slideup";
import { useNotification } from "@/src/hooks/useNotification";

type NewArtist = Omit<Artist, "artist_id">;

export const UploadArtist = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [profile, setProfile] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
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
    if (image) {
      try {
        key = await handleUpload(image, name);
      } catch (error) {
        alert("이미지 업로드 실패");
        return ""; // 에러 발생 시 여기서 종료
      }
    }

    const artistData: NewArtist = {
      name: name,
      major: major,
      artist_image: key,
      profile: profile,
      website_url: siteUrl,
    };
    try {
      await artistUploadHandler(artistData);
      startSuccessNotification();
      setName("");
      setMajor("");
      setProfile("");
      setSiteUrl("");
      setImage(null);
    } catch (error) {
      startFailureNotification();
    }
  };

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
            <InputField
              label="작가명"
              id="name"
              value={name}
              type="text"
              required={true}
              setValue={setName}
            />
            <InputField
              label="전공"
              id="major"
              value={major}
              type="text"
              required={true}
              setValue={setMajor}
            />
            <InputField
              label="작가설명"
              id="profile"
              value={profile}
              type="text"
              required={true}
              setValue={setProfile}
            />
            <InputField
              label="작가 인스타"
              id="url"
              value={siteUrl}
              type="url"
              required={true}
              setValue={setSiteUrl}
            />
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
