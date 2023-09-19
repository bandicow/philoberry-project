"use client";
import React, { useState } from "react";
import Link from "next/link";

interface LinkWithHoverProps {
  href: string;
  children: React.ReactNode;
}

export const LinkWithHover = ({ href, children }: LinkWithHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link href={href} passHref>
      <p
        className={`float-left border-b border-white m-30 transition-transform duration-500 ease-in-out ${
          isHovered ? "transform scale-150" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </p>
    </Link>
  );
};

export default LinkWithHover;
