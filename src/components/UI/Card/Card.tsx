import Link from "next/link";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  extraClassName?: string;
  href: string;
}

// 여기서 맨 아래 div를 p로 하면 hydrate 에러 남
const Card = (props: CardProps) => {
  return (
    <Link href={props.href}>
      <div
        className={`w-full text-base bg-white cursor-pointer ${props.extraClassName} rounded-xl`}
      >
        <div className="text-gray-700">{props.children}</div>
      </div>
    </Link>
  );
};

export default Card;
