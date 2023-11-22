import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const NoticeCard: React.FunctionComponent<CardProps> = (props) => {
  return (
    <div className="w-4/5 mx-auto min-w-[200px] rounded overflow-hidden shadow-lg my-2 cursor-pointer">
      <div className="px-6 py-4">{props.children}</div>
    </div>
  );
};

export default NoticeCard;
