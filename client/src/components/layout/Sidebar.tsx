"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPalette,
  faRotate,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState("");

  useEffect(() => {
    // 브랜드메뉴 페이지가 렌더링되면 url의 path를 구한다 (예를들면 /brands)
    setCurrPath(pathname ? pathname : "");
  }, [pathname]);

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
    <div className="text-white bg-black tabletLandscape:w-1/4 tabletLandscape:text-gray-700 tabletLandscape:bg-white tabletLandscape:fixed">
      <ul className="flex overflow-x-scroll border-b-2 border-solid hide-scrollbar tabletLandscape:flex-col tabletLandscape:overflow-visible">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`  min-w-max p-1 whitespace-nowrap tabletLandscape:w-full pl-3 m-1 
            ${
              currPath === item.href
                ? "border-solid border-y-2 border-sky-200 tabletLandscape:border-0  tabletLandscape:bg-sky-200 tabletLandscape:rounded-tr-lg tabletLandscape:rounded-br-lg"
                : ""
            }`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`mr-3 tabletLandscape:hidden`}
            />
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
