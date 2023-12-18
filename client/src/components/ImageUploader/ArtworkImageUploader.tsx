"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useArtworkStore } from "@/utils/store/artworkStore";

const arrowDown: IconDefinition = faFileArrowDown;

const DragAndDropUploader = ({ index }: { index: number }) => {
  const store = useArtworkStore();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      store.updateFile(index, acceptedFiles);
    },
    [store, index]
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
  const upLoadedImageRemover = (fileIndex: number) => {
    // files 상태에서 파일 제거
    store.removeFile(index, fileIndex);
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
        } flex w-full p-1 border border-gray-300 bg-white rounded-md font-inherit h-full  items-center justify-center flex-col`}
        {...getRootProps()}
      >
        {(!store.files[index] || store.files[index].length < 1) && (
          <>
            <FontAwesomeIcon icon={arrowDown} className={"m-4"} size="2xl" />
            <p>이미지 업로드</p>
          </>
        )}

        {/* 업로드된 이미지들의 미리보기 및 삭제 버튼 */}
        {store.files[index]?.length > 0 && (
          <div className="flex flex-col w-full">
            {store.files[index].map((file, index) => (
              <div key={index} className="flex px-3 justify-between w-full">
                <div className="flex">
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log("clicked");
                      upLoadedImageRemover(index);
                    }}
                    className="relative w-7 h-7 p-1 m-1 bg-gray-200 rounded-md"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      fill
                      object-fit="contain"
                      className="cursor-pointer"
                      priority={true}
                    />
                  </div>
                  <p>{file.name}</p>
                </div>
                <p className="pt-1 text-gray-500 text-sm tabletLandscape:text-base ">
                  {formAtBytes(file.size)}
                </p>
              </div>
            ))}
          </div>
        )}

        {isDragActive && (
          <button
            type="button"
            {...getRootProps({
              onClick: (e) => e.stopPropagation(),
              onTouchEnd: (e) => e.stopPropagation(),
            })}
          >
            Add More Images
          </button>
        )}
      </div>
    </div>
  );
};

export default DragAndDropUploader;
