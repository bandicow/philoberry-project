"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const USER: IconDefinition = faUser;

interface DragAndDropUploaderProps {
  uploadedImages: File | null;
  setUploadedImages: (files: File | null) => void;
}

const DragAndDropUploader = ({
  setUploadedImages,
  uploadedImages,
}: DragAndDropUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedImages(acceptedFiles[0]);
    },
    [setUploadedImages]
  );

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    }, // 이미지 파일만 선택가능
    multiple: false,
  });

  // 이미지 삭제
  const upLoadedImageRemover = () => {
    setUploadedImages(null);
  };

  return (
    <div className="w-full h-full">
      <div
        className={`dropzone ${
          isDragActive ? "active" : ""
        } flex w-full p-1 border border-gray-300 bg-white rounded-md font-inherit h-full  items-center justify-center flex-col`}
        {...getRootProps()}
      >
        {!uploadedImages && (
          <>
            <FontAwesomeIcon icon={USER} className={"m-4"} size="2xl" />
            <p>이미지 업로드</p>
          </>
        )}

        {uploadedImages && (
          <div className="relative w-full h-full">
            <div
              className="rounded-md h-52"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={URL.createObjectURL(uploadedImages)}
                alt={`업로드 에러`}
                onClick={upLoadedImageRemover}
                fill
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropUploader;
