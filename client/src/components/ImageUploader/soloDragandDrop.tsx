"use client";
import React, { useCallback, useMemo } from "react";
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

  const { getRootProps, isDragActive, open, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    }, // 이미지 파일만 선택가능
    multiple: false,
    noClick: true, // 드래그앤드롭 클릭 시 파일 선택창이 뜨는 것을 방지
  });

  // 이미지 삭제
  const upLoadedImageRemover = () => {
    setUploadedImages(null);
  };

  const imageURL: string | null = useMemo(() => {
    return uploadedImages ? URL.createObjectURL(uploadedImages) : null;
  }, [uploadedImages]);

  return (
    <div className="w-full h-full">
      <div
        className={`dropzone ${
          isDragActive ? "active" : ""
        } flex w-full p-1 border border-gray-300 bg-white rounded-md font-inherit h-full  items-center justify-center flex-col`}
        {...getRootProps(
          { onClick: open } // 추가된 코드
        )}
      >
        <input {...getInputProps()} />

        {!uploadedImages && (
          <>
            <FontAwesomeIcon icon={USER} className={"m-4"} size="2xl" />
            <p>이미지 업로드</p>
          </>
        )}

        {imageURL && (
          <div className="relative w-full h-full">
            <div
              className="rounded-md h-52"
              onClick={(event) => event.stopPropagation()}
              onTouchEnd={(event) => event.stopPropagation()}
            >
              <Image
                src={imageURL}
                alt={`업로드 에러`}
                onClick={upLoadedImageRemover}
                onTouchEnd={upLoadedImageRemover}
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
