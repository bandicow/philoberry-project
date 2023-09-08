import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function ImageLoader() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadImage() {
      try {
        // 요청을 통해 S3 버킷에서 이미지 URL 가져오기
        const response = await axios.get("/api/s3Load");
        const url = response.data.url;

        // 이미지 URL 설정
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to load image", error);
      }
    }

    loadImage();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <Image
          className="w-full"
          src={imageUrl}
          alt={"S3 Image"}
          width={200}
          height={100}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default ImageLoader;
