import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { onImageUpload } from "../../Types/Items";

const DragAndDropUploader: React.FC<onImageUpload> = ({
  onImageUpload,
  inputRef,
}) => {
  //상태관리
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // 의존성이 변치 않은 한 재사용으로 성능향상
  // 추가적으로 파일이 이미지 파일만 가능하게 변경
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith("image/")) {
        setIsUploading(true);
        setUploadError("");

        try {
          await onImageUpload(file);
        } catch (error) {
          setUploadError("Failed to upload image");
        }

        setIsUploading(false);
      } else {
        setUploadError("OK!");
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="mb-2" {...getRootProps()}>
      <input
        className="block w-full p-1 border border-gray-300 rounded-md font-inherit"
        type="text"
        ref={inputRef}
        {...getInputProps()}
      />
      <label className="block mb-2 font-bold" htmlFor="Imageurl">
        제품 사진
      </label>
      {isDragActive ? (
        <p className="block w-full p-1 border border-gray-300 rounded-md font-inherit">
          이미지를 여기에 드래그하세요.
        </p>
      ) : (
        <p className="block w-full p-1 border border-gray-300 rounded-md font-inherit">
          이미지를 드래그앤 드롭하거나 클릭하여 업로드하세요.
        </p>
      )}
      {isUploading ? <p>Loading...</p> : <p>{uploadError}</p>}
    </div>
  );
};

export default DragAndDropUploader;
