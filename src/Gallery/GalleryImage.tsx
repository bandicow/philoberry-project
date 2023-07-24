import React from "react";
import { GalleryImage } from "../Types/Client";
import Image from "next/image";
import GalleryCard from "../components/UI/Card/GalleryCard";
import Card from "../components/UI/Card/Card";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faQuoteLeftAlt,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

const GalleryImage = (props: GalleryImage) => {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(
      { pathname: "/gallery/[galleryId]", query: { galleyid: props.id } },
      "/gallery/" + props.id
    );
  };

  const QuoteLeftIcon: IconDefinition = faQuoteLeftAlt;
  const QuoteRightIcon: IconDefinition = faQuoteRight;

  return (
    <li onClick={showDetailHandler} className="flex-col items-center">
      <Card>
        <div className="min-h-0 overflow-auto">
          <Image
            className="w-full rounded-md"
            src={props.imageUrl}
            alt={props.caption}
            width={200}
            height={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        </div>
      </Card>
      <Card>
        <div className="flex flex-col items-center p-8 border text-slate-950 test__body">
          <FontAwesomeIcon icon={QuoteLeftIcon} />
          <p>{props.caption}</p>
          <FontAwesomeIcon icon={QuoteRightIcon} />
        </div>
      </Card>
    </li>
  );
};

export default GalleryImage;
