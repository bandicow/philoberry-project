"use client";

import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faImage,
  faPalette,
  faRotate,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const menuItems = [
    { icon: faHouse, text: "홈", href: "/admin" },
    { icon: faRotate, text: "갤러리작가 변경", href: "/admin/pickArtist" },
    { icon: faPalette, text: "색상 변경", href: "/admin/changecolor" },
    { icon: faImage, text: "갤러리 관리", href: "/admin/gallery" },
    { icon: faCloudArrowUp, text: "작가 등록", href: "/admin/artistupload" },
    { icon: faCloudArrowUp, text: "작품 등록", href: "/admin/uploadartwork" },
    { icon: faCloudArrowUp, text: "제품 등록", href: "/admin/uploadProduct" },
    { icon: faRotate, text: "제품 정보 변경", href: "/admin/editproduct" },
  ];

  return (
    <div className="sticky top-0 left-0 w-1/4 h-screen text-lg border border-r-gray-900 sidebar">
      {/* Sidebar 내용 */}
      <ul className="flex flex-col items-center justify-start space-y-5">
        {/* Map through the menuItems array to render each item */}
        {menuItems.map((item, index) => (
          <li key={index} className={`w-full mt-5 pl-3`}>
            <FontAwesomeIcon icon={item.icon} className={"mr-3"} />
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
