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
      <Card>
        <div className="flex flex-col items-center p-8 border text-slate-950 test__body">
          <FontAwesomeIcon icon={QuoteLeftIcon} />
          <p>{props.caption}</p>
          <FontAwesomeIcon icon={QuoteRightIcon} />
        </div>
      </Card>
    </div>
  );
};

export default GalleryModal;
