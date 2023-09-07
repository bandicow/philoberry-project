import React, { useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faImage,
  faPalette,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  // 색상 변경 페이지인지 아닌지를 상태로 관리합니다.
  const [isChangeColorPage, setIsChangeColorPage] = useState(false);

  const PaletteIcon: IconDefinition = faPalette;
  const ImageIcon: IconDefinition = faImage;
  const RotateIcon: IconDefinition = faRotate;
  const HomeIcon: IconDefinition = faHouse;

  return (
    <div className="w-1/4 h-screen mr-3 text-lg border border-r-gray-900 sidebar">
      {/* Sidebar 내용 */}
      <ul className="flex flex-col items-center justify-start space-y-5">
        <li
          className={`w-full mt-5 ${isChangeColorPage ? "changecolor" : ""}`}
          onClick={() => setIsChangeColorPage(true)}
        >
          <FontAwesomeIcon icon={HomeIcon} className={"mr-3"} />
          <Link href="/admin">홈</Link>
        </li>
        <li
          className={`w-full mt-5 ${isChangeColorPage ? "changecolor" : ""}`}
          onClick={() => setIsChangeColorPage(true)}
        >
          <FontAwesomeIcon icon={PaletteIcon} className={"mr-3"} />
          <Link href="/admin/changecolor">색상 변경</Link>
        </li>
        <li className="w-full" onClick={() => setIsChangeColorPage(false)}>
          <FontAwesomeIcon icon={ImageIcon} className={"mr-3"} />
          <Link href="/signin">작품 변경 (작품 소개글, 이미지)</Link>
        </li>
        <li
          className={`w-full ${isChangeColorPage ? "" : "changecolor"}`}
          onClick={() => setIsChangeColorPage(false)}
        >
          <FontAwesomeIcon icon={RotateIcon} className={"mr-3"} />
          <Link href="../addItem">원래있던 제품 (판매여부)</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
