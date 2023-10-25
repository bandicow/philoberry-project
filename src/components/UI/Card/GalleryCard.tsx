import React, { ReactElement, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="w-full bg-white border border-black shadow-lg">
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Card;
