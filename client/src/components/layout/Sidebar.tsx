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
    { icon: faCloudArrowUp, text: "작가 등록", href: "/admin/uploadartist" },
    { icon: faCloudArrowUp, text: "작품 등록", href: "/admin/uploadartwork" },
    { icon: faCloudArrowUp, text: "제품 등록", href: "/admin/uploadproduct" },
    { icon: faRotate, text: "제품 정보 변경", href: "/admin/editproduct" },
  ];

  return (
    <div className="relative z-10 w-full text-xl text-white bg-black tabletLandscape:text-2xl tabletLandscape:h-full tabletLandscape:w-72 tabletLandscape:text-gray-700 tabletLandscape:bg-white tabletLandscape:fixed">
      <ul className="flex overflow-x-scroll border-solid hide-scrollbar tabletLandscape:flex-col tabletLandscape:overflow-visible">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`min-w-max my-2 tabletLandscape:pr-10 whitespace-nowrap tabletLandscape:w-full m-1 
    ${
      currPath === item.href
        ? "border-double border-y-2 mx-2  text-gray-300 border-sky-200 tabletLandscape:border-0 tabletLandscape:rounded-tr-lg tabletLandscape:rounded-br-lg"
        : ""
    }`}
          >
            <div
              className={`flex items-center ${
                currPath === item.href
                  ? "tabletLandscape:bg-sky-200  tabletLandscape:py-1 tabletLandscape:rounded-tr-lg tabletLandscape:rounded-br-lg tabletLandscape:text-blue-600"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`mr-3 pl-3 hidden tabletLandscape:block`}
              />
              <Link className="whitespace-nowrap" href={item.href}>
                {item.text}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
