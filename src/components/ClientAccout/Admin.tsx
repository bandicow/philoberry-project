import React from "react";
import ProfileImage from "./ProfileImage";
import Setting from "./Setting";
import { Session } from "../../Types/Client";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";

type ClientAccountProps = {
  ClientInfo: Session;
};

const Admin = (props: ClientAccountProps) => {
  //로그아웃은 비동기 과정, 요청 후 Promise 반환
  /**로그아웃을 위한 함수, next-auth의 signOut을 사용함  */
  const SignoutHandler = async () => {
    await signOut();
  };

  const PaletteIcon: IconDefinition = faPalette;
  const ImageIcon: IconDefinition = faImage;

  return (
    <div className="flex">
      <div className="w-1/4 h-screen mr-3 text-lg border border-gray-900 sidebar">
        {/* Sidebar 내용 */}
        <ul className="flex flex-col items-center justify-start space-y-5">
          <li className="w-full mt-5 ">
            <FontAwesomeIcon icon={PaletteIcon} />
            <Link href="/sale">색상 변경</Link>
          </li>
          <li className="w-full">
            <FontAwesomeIcon icon={ImageIcon} />
            <Link href="/signin">작품 변경 (작품 소개글, 이미지)</Link>
          </li>
          <li className="w-full ">
            <FontAwesomeIcon icon={ImageIcon} />
            <Link href="../addItem">원래있던 제품 (판매여부)</Link>
          </li>
        </ul>
      </div>

      <div className="grid justify-center w-3/5">
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-1 mr-10">
            <ProfileImage />
          </div>
          <div className="col-span-3">
            <p>Welcome {props.ClientInfo.user?.name}</p>
            <button onClick={SignoutHandler}>로그아웃</button>
          </div>
        </div>
        <div className="mt-5 border-t-2 border-gray-900">
          <Setting />
        </div>
      </div>
    </div>
  );
};

export default Admin;
