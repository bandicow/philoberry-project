import React from "react";
import { getArtistProps } from "@/src/Types/Art";
import { getArtist } from "@/lib/action";
import PickArtist from "@/src/components/AdminSettings/PickArtist";

const pickArtist = async () => {
  const artistList = await getArtist();

  if (!artistList) {
    console.error("Failed to get product");
    return <div> 데이터 불러오기 실패</div>;
  }

  const { artistInfo }: getArtistProps = artistList;
  return (
    <div className="mt-10 border-solid border-t-slate-800">
      <PickArtist artistInfo={artistInfo} />
    </div>
  );
};

export default pickArtist;
