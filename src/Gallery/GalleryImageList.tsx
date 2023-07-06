import React from "react";
import GalleryImage from "./GalleryImage";
import { ClientGalleyImageProps } from "../Types/Client";

const GalleryImageList = (props: ClientGalleyImageProps) => {
  return (
    <ol className="h-full columns-3 md:columns-4 lg:columns-5">
      {props.GallreyImg.map((imginfo) => (
        <GalleryImage
          key={imginfo.id}
          id={imginfo.id}
          imageUrl={imginfo.imageUrl}
          caption={imginfo.caption}
          likes={imginfo.likes}
          comments={imginfo.comments}
          timestamp={imginfo.timestamp}
          user={imginfo.user}
          tags={imginfo.tags}
        />
      ))}
    </ol>
  );
};

export default GalleryImageList;
