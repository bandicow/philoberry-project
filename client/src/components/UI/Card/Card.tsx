import Link from "next/link";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  extraClassName?: string;
  href: string;
  stock?: number; // Add a new optional prop for stock
}

// 여기서 맨 아래 div를 p로 하면 hydrate 에러 남
const Card = (props: CardProps) => {
  // Determine the background color based on the stock
  const bgColorClass =
    props.stock && props.stock > 0 ? "bg-white" : "bg-gray-300";

  return (
    <Link href={props.href}>
      <div
        className={`h-full w-full text-base cursor-pointer ${props.extraClassName} ${bgColorClass}`}
      >
        <div className="text-gray-700 ">{props.children}</div>
      </div>
    </Link>
  );
};

export default Card;
