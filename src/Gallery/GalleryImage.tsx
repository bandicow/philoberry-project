import React from "react";
import { GalleryImage } from "../Types/Client";
import Image from "next/image";
import Card from "../components/UI/Card/Card";
import { useRouter } from "next/router";

interface GalleryProps {
  images: GalleryImage[];
}

const GalleryImage: React.FC<GalleryProps> = (props) => {
  //페이지 이동에 사용되지만 후에 모달로 변경예정
  const router = useRouter();

  const;

  const showDetailHandler = () => {
    router.push(
      { pathname: "/gallery/[galleryId]", query: { galleyid: props.id } },
      "/gallery/" + props.id
    );
  };

  return (
    <li onClick={showDetailHandler} className="flex-col items-center">
      <Card>
        <div className="w-[900px] h-[600px] overflow-hidden rounded-xl">
          <Image
            className="w-full"
            src={props.imageUrl}
            alt={props.caption}
            width={200}
            height={100}
          />
        </div>
      </Card>
    </li>
  );
};

export default GalleryImage;
