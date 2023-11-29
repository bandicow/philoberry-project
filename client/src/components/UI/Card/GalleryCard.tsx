import React, { ReactElement, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    <div className="hide-scollbar w-full p-10 bg-[#f5f5f5] rounded-2xl shadow-md">
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Card;
