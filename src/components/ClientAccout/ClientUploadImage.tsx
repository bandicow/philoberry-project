import React from "react";
import img1 from "../../../public/images/item1.jpg";
import img2 from "../../../public/images/item2.jpg";
import Image from "next/image";

const ClientUploadImage = () => {
  return (
    <div className="mt-10 border-solid border-t-slate-800">
      <Image
        className="w-100"
        src={img1}
        alt="업로드사진"
        width={300}
        height={300}
      ></Image>
      <Image
        className="w-100"
        src={img2}
        alt="업로드 사진"
        width={300}
        height={300}
      ></Image>
    </div>
  );
};

export default ClientUploadImage;
