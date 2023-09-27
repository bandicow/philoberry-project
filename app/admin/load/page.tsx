"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function ImageLoader() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  console.log(imageUrls);
  useEffect(() => {
    async function loadImages() {
      try {
        // 요청을 통해 S3 버킷에서 이미지 URL들 가져오기
        const response = await axios.get("/api/s3Load");
        const urls = response.data.urls;

        // 이미지 URL들 설정
        setImageUrls(urls);
      } catch (error) {
        console.error("Failed to load images", error);
      }
    }

    loadImages();
  }, []);

  const imageurl = imageUrls.map((url) => url)[0];

  console.log(imageurl + "S3 이미지 URL");

  return (
    <div className="flex">
      <div>
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <Image
              key={index}
              className="w-full"
              src={url}
              alt={`S3 Image ${index}`}
              height={500}
              width={500}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
    </div>
  );
}

export default ImageLoader;
