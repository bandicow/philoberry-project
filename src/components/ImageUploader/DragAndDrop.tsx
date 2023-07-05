import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { onImageUpload } from "../../Types/Items";

const DragAndDropUploader: React.FC<onImageUpload> = ({
  onImageUpload,
  inputRef,
}) => {
  // 의존성이 변치 않은 한 재사용으로 성능향상
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      onImageUpload(file);
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
    </div>
  );
};

export default DragAndDropUploader;
