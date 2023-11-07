"use client";
import React, { FormEvent, useState } from "react";
import { Artist } from "@prisma/client";
import DragAndDropUploader from "../ImageUploader/DragAndDrop";
import { StringInputField } from "../UI/Input/InputField";
import Button from "../UI/Button/SubmitButton";
import { artistUploadHandler, handleUpload } from "@/lib/action";

type NewArtist = Omit<Artist, "artist_id">;

export const ArtistUpload = () => {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [profile, setProfile] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

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
    artistUploadHandler(artistData);
  };

  return (
    <div className="w-full center">
      <h1 className="mt-10 text-xl font-bold">작가 등록</h1>
      <form onSubmit={submitHandler} className="w-full">
        <div className="justify-center ml-5 mr-5 rounded-md tablet:flex">
          <div className="w-5/6 m-5">
            <DragAndDropUploader
              setUploadedImages={setImage}
              uploadedImages={image}
            />
          </div>
          <div className="w-5/6 m-5">
            <StringInputField
              label="작가명"
              id="name"
              value={name}
              type="text"
              setValue={setName}
            />
            <StringInputField
              label="전공"
              id="major"
              value={major}
              type="text"
              setValue={setMajor}
            />
            <StringInputField
              label="작가설명"
              id="profile"
              value={profile}
              type="text"
              setValue={setProfile}
            />
            <StringInputField
              label="작가 개인 사이트"
              id="url"
              value={siteUrl}
              type="url"
              setValue={setSiteUrl}
            />
          </div>
        </div>
        <div className="h-10 mt-10 w-30">
          <Button goal={"작가 등록"} />
        </div>
      </form>
    </div>
  );
};
