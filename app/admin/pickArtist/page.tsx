import React from "react";
import { getArtistProps } from "@/src/Types/Art";
import { getArtist } from "@/lib/action";
import GalleryArtist from "@/src/components/AdminSettings/GalleryArtist";

const pickArtist = async () => {
  const artistList = await getArtist();

  if (!artistList) {
    console.error("Failed to get product");
    return <div> 데이터 불러오기 실패</div>;
  }

  const { artistInfo }: getArtistProps = artistList;
  return (
    <div className="mt-10 border-solid border-t-slate-800">
      <GalleryArtist artistInfo={artistInfo} />
    </div>
  );
};

export default pickArtist;
