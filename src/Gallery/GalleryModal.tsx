import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/UI/Card/Card";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import {
  faQuoteLeftAlt,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { GalleryImage } from "../Types/Client";

const QuoteLeftIcon: IconDefinition = faQuoteLeftAlt;
const QuoteRightIcon: IconDefinition = faQuoteRight;

interface GalleryModalProps {
  caption: string;
}

const GalleryModal = (props: GalleryModalProps) => {
  return (
    <div>
      <h1>좀 나와라~ 나와라이 예~</h1>
      <Card>
        <div className="flex flex-col items-center p-8 text-white border test__body">
          <FontAwesomeIcon icon={QuoteLeftIcon} />
          <p>{props.caption}</p>
          <div>test for show word</div>
          <FontAwesomeIcon icon={QuoteRightIcon} />
        </div>
      </Card>
    </div>
  );
};

export default GalleryModal;
