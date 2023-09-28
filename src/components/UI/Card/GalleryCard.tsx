import React, { ReactElement, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="w-full m-5 bg-white border border-black shadow-lg">
      <div className="p-0">
        <div className="text-gray-700">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
