"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const arrowDown: IconDefinition = faFileArrowDown;

interface DragAndDropUploaderProps {
  uploadedImages: File[];
  setUploadedImages: (files: File[]) => void;
}

const DragAndDropUploader = ({
  setUploadedImages,
  uploadedImages,
}: DragAndDropUploaderProps) => {
  //올린 이미지들
  // const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  // 의존성이 변치 않은 한 재사용으로 성능향상
  // 추가적으로 파일이 이미지 파일만 가능하게 변경
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedImages([...uploadedImages, ...acceptedFiles]);
    },
    [setUploadedImages, uploadedImages]
  );

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    }, // 이미지 파일만 선택가능
    multiple: true, // 여러 파일 선택 가능
  });

  // 이미지 삭제
  const upLoadedImageRemover = (index: number) => {
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newUploadedImages);
  };

  //kb, mb 변환
  const standardNum: 1024 = 1024;
  const formAtBytes = (bytes: number) => {
    if (bytes < standardNum) {
      return bytes.toFixed(2) + "bytes";
    }

    if (bytes < standardNum ** 2) {
      return (bytes / standardNum).toFixed(2) + "KB";
    }

    if (bytes < standardNum ** 3) {
      return (bytes / standardNum ** 2).toFixed(2) + "MB";
    }
  };

  return (
    <div className="w-full h-full">
      <div
        className={`dropzone ${
          isDragActive ? "active" : ""
        } flex w-full p-1 border border-gray-300 rounded-md font-inherit h-full  items-center justify-center flex-col`}
        {...getRootProps()}
      >
        {uploadedImages.length < 1 && (
          <>
            <FontAwesomeIcon icon={arrowDown} className={"m-4"} size="2xl" />
            <p>이미지 업로드</p>
          </>
        )}

        {/* 업로드된 이미지들의 미리보기 및 삭제 버튼 */}
        {uploadedImages.length > 0 && (
          <div className="flex flex-col w-full">
            <h3 className="">내가 선택한 이미지 : </h3>
            {uploadedImages.map((imageFile, index) => (
              <div key={index} className="flex justify-between w-full">
                <div
                  className="flex p-1"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Image
                    src={URL.createObjectURL(imageFile)}
                    alt={`Preview ${index}`}
                    onClick={() => upLoadedImageRemover(index)}
                    width={30}
                    height={30}
                  />
                  <p>{imageFile.name}</p>
                </div>
                <p className="pt-1">{formAtBytes(imageFile.size)}</p>
              </div>
            ))}
          </div>
        )}

        {isDragActive && (
          <button
            type="button"
            {...getRootProps({ onClick: (e) => e.stopPropagation() })}
          >
            Add More Images
          </button>
        )}
      </div>
    </div>
  );
};

export default DragAndDropUploader;
