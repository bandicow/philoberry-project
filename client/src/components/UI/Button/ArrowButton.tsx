import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const leftArrow = faArrowLeft;
const rightArrow = faArrowRight;

interface ArrowProps {
  onclick: () => void;
}

export const LeftArrow = ({ onclick }: ArrowProps) => {
  return (
    <FontAwesomeIcon
      icon={leftArrow}
      onClick={onclick}
      className="absolute px-4 py-2 text-gray-600 transform -translate-y-1/2 hover:text-gray-900 hover:text-xl left-1 top-1/2"
    />
  );
};

export const RightArrow = ({ onclick }: ArrowProps) => {
  return (
    <FontAwesomeIcon
      icon={rightArrow}
      onClick={onclick}
      className="absolute px-4 py-2 text-gray-600 transform -translate-y-1/2 hover:text-gray-900 hover:text-xl right-1 top-1/2"
    />
  );
};
