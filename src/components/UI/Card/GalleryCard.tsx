import React, { ReactElement, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-md shadow-lg">
      <div className="p-4">
        <div className="text-gray-700">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
