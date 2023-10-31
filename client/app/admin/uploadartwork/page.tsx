import React from "react";
import { UploadGallery } from "../../../src/components/AdminSettings/UploadGallery";
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
    <div>
      <UploadGallery artistInfo={artistInfo} />
    </div>
  );
};

export default uploadArtwork;
