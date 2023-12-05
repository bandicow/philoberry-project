"use client";
import { getCollaboArtist } from "@/lib/action";
import { Artist } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DetailInfo from "../Gallery/DetailInfo";
import { InfoProps } from "@/src/Types/Common";
import Loading from "@/app/loading";

export default function CollaboArtist() {
  const [artist, setArtist] = useState<Artist>();
  useEffect(() => {
    const fetchCollaboArtist = async () => {
      const artistInfo = await getCollaboArtist();

      setArtist(artistInfo);
    };
    fetchCollaboArtist();
  }, []);

  if (!artist) {
    return <Loading />;
  }

  const artistInfo: InfoProps[] = [
    { label: "전공", value: artist.major },
    { label: "프로필", value: artist.profile },
    { label: "웹사이트", value: artist.website_url },
  ];

  return (
    <div className="tabletLandscape:p-20 mt-auto tabletLandscape:mt-8 m-8 p-5 shadow-lg border-stone-700">
      <h1 className="p-2 text-3xl tabletLandscape:text-5xl shadow-bottom  font-semibold mb-10 tabletLandscape:watermark relative">
        작가소개
      </h1>
      <div className="center tabletLandscape:flex-row justify-between tabletLandscape:items-start">
        <div className="m-1 p-1 min-h-[200px] min-w-[200px] flex-1 center">
          {artist?.artist_image ? (
            <Image
              src={artist?.artist_image}
              alt={"작가사진"}
              height={500}
              width={500}
              className="border-solid rounded-md "
            />
          ) : (
            <div>작가사진</div>
          )}
        </div>
        <div className=" m-3 w-full h-full flex-1 flex-col p-1">
          <h2 className="tabletLandscape:text-2xl text-xl font-semibold">
            {artist?.name}
          </h2>
          {artist &&
            artistInfo.map((item) => <DetailInfo key={item.label} {...item} />)}
        </div>
      </div>
    </div>
  );
}
