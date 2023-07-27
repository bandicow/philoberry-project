import Image from "next/image";
import React from "react";
import img from "../../../public/images/mainpage.jpg";

const ProfileImage = () => {
  return (
    <div className="border-slate-500 ">
      <Image
        className="rounded-full w-100"
        src={img}
        alt="프로필 사진"
        width={150}
        height={150}
      ></Image>
    </div>
  );
};

export default ProfileImage;
