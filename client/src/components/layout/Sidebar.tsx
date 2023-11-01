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
    { icon: faCloudArrowUp, text: "작가 등록", href: "/admin/artistupload" },
    { icon: faCloudArrowUp, text: "작품 등록", href: "/admin/uploadartwork" },
    { icon: faCloudArrowUp, text: "제품 등록", href: "/admin/uploadProduct" },
    { icon: faRotate, text: "제품 정보 변경", href: "/admin/editproduct" },
  ];

  return (
    <div className="tabletLandscape:fixed ">
      <ul className="flex overflow-x-scroll hide-scrollbar tabletLandscape:flex-col tabletLandscape:overflow-visible">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`min-w-max whitespace-nowrap tabletLandscape:w-full pl-3 m-1`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`mr-3 opacity-0 tabletLandscape:opacity-100`}
            />
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
