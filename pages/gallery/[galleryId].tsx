import React from "react";
import Image from "next/image";
import { DUMMY_GALLERY_IMAGE } from "../../src/DummyData/DummyData";
import { useRouter } from "next/router";

const GalleryDetail = () => {
  const router = useRouter();

  const { galleyid } = router.query;

  console.log(galleyid);

  const DETAIL = DUMMY_GALLERY_IMAGE.find((item) => item.id === galleyid);

  // return까지 써서 해야 JSX 부분에서 Detail이 undfined인 경우가 없어 에러가 안뜬다.
  if (!DETAIL) {
    return <div>존재하지 않는 갤러리입니다.</div>;
  }

  console.log(DETAIL);

  return (
    <div className="flex">
      <Image
        className="flex w-1/2 rounded-md"
        src={DETAIL.imageUrl}
        alt={DETAIL.caption}
        width={250}
        height={250}
      />

      <div className="flex flex-col w-1/2 p-8 text-slate-950 test__body">
        <div className="relative">
          <h1 className="mb-3 text-3xl font-bold test__title">
            {DETAIL.likes}
          </h1>
        </div>
        <div className="mt-auto">
          <span className="px-4 py-1 text-black bg-white rounded-md test__tag bg-opacity-60">
            {DETAIL.tags}
          </span>
        </div>
        <div className="">
          <h2>{DETAIL.id}</h2>
          <p>{DETAIL.caption}</p>
          <p>{DETAIL.timestamp.toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetail;
