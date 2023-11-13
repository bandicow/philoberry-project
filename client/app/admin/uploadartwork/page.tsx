"use client";

import React from "react";
import { UploadArtwork } from "../../../src/components/AdminSettings/UploadArtwork";
import { getArtist } from "../../../lib/action";
import { getArtistProps } from "@/src/Types/Art";

const uploadArtwork = async () => {
  const artistList = await getArtist();

  if (!artistList) {
    console.error("Failed to get product");
    return <div> 데이터 불러오기 실패</div>;
  }

  const { artistInfo }: getArtistProps = artistList;

  return (
    <div className="mt-10 border-solid border-t-slate-800">
      <UploadArtwork artistInfo={artistInfo} />
    </div>
  );
};

export default uploadArtwork;
