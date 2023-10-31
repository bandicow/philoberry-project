import React, { ReactElement, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="w-full border border-black shadow-lg bg-slate-50 ">
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Card;
