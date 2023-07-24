import React, { useState } from "react";
import classes from "./MainNavBar.module.css";
import Link from "next/link";

type SidebarProps = {
  onToggle: () => void;
  sidebarState: boolean;
};

const Sidebar = ({ onToggle, sidebarState }: SidebarProps) => {
  return (
    <>
      <div className="flex items-center justify-between h-full px-4 py-3">
        {/* Sidebar 토글 버튼 */}
        <button className="text-white focus:outline-none" onClick={onToggle}>
          {/* Sidebar 아이콘 */}토글버튼
        </button>
        {/* Navbar 로고 */}
        <div className="text-xl font-bold">
          <Link href="/">
            <div className={classes.logo}>philaberry</div>
          </Link>
        </div>
        {/* 추가적인 Navbar 아이템 */}
        <div>...</div>
      </div>

      {/* Sidebar 열렸을때*/}
      {sidebarState && (
        <div className="fixed left-0 w-1/3 h-screen ml-0 text-white bg-gray-800 bg-opacity-50">
          {/* Sidebar 내용 */}
          <ul className="flex flex-col items-center justify-start space-y-5">
            <li className="mt-5">
              <Link href="/sale">색상 변경</Link>
            </li>
            <li className="">
              <Link href="/signin">작품 변경 (작품 소개글, 이미지)</Link>
            </li>
            <li className="">
              <Link href="../addItem">원래있던 제품 (판매여부)</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
