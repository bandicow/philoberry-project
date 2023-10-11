"use client";
import React, { FormEvent, useState } from "react";
import { Artist } from "@prisma/client";
import axios from "axios";
import DragAndDropUploader from "../ImageUploader/DragAndDrop";
import { StringInputField } from "../UI/Input/InputField";
import Button from "../UI/Button/SubmitButton";

type NewArtist = Omit<Artist, "artist_id">;

export const ArtistUpload = () => {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [profile, setProfile] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  /** 이미지 업로드 */
  async function handleUpload(file: File) {
    try {
      const response = await axios.post("/api/s3Upload", {
        file: { name: file.name, type: file.type },
        name: name,
      });
      const { url, key } = response.data;

      // Create a new Blob instance
      const blob = new Blob([file], { type: file.type });

      //사전 서명된(presigned) URL을 사용하여 S3에 직접 파일을 업로드
      await axios.put(url, blob);

      return key;
    } catch (error) {
      console.error(error);
    }
  }

  const artistUploadHandler = async (artistData: NewArtist) => {
    try {
      const response = await axios.post("/api/artistupload", artistData);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    let key: string = "";
    if (image) {
      try {
        key = await handleUpload(image);
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
    <div>
      <form onSubmit={submitHandler}>
        <div className="flex justify-center ml-5 mr-5 rounded-md">
          <div className="w-1/6 m-5">
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
        <div className="fixed h-10 w-30 right-10">
          <Button goal={"작가 등록"} />
        </div>
      </form>
    </div>
  );
};
