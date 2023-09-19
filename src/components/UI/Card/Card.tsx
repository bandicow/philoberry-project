import Link from "next/link";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  extraCalssName?: string;
  href: string;
}

// 여기서 맨 아래 div를 p로 하면 hydrate 에러 남
const Card = (props: CardProps) => {
  return (
    <Link href={props.href}>
      <div
        className={`w-full mt-10 mb-10 text-base bg-white cursor-pointer ${props.extraCalssName} rounded-xl`}
      >
        <div className="text-gray-700">{props.children}</div>
      </div>
    </Link>
  );
};

export default Card;
