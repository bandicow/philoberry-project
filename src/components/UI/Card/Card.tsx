import Link from "next/link";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  extraClassName?: string;
  href: string;
}

const Card = (props: CardProps) => {
  return (
    <Link href={props.href}>
      <div className={`w-full bg-white cursor-pointer ${props.extraClassName}`}>
        <div className="w-full text-gray-700">{props.children}</div>
      </div>
    </Link>
  );
};

export default Card;
