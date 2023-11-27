"use client";
import React, { useEffect, useState } from "react";
import { ArtistInfo, getArtistProps } from "@/src/Types/Art";
import { getArtist } from "@/lib/action";
import PickArtist from "@/src/components/AdminSettings/PickArtist";

const PickArtistPage = () => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const artistList = await getArtist();

      if (!artistList) {
        console.error("Failed to get product");
        return;
      }

      const { artistInfo }: getArtistProps = artistList;
      setArtistInfo(artistInfo);
    };

    fetchArtist();
  }, []);

  if (!artistInfo) {
    return <div> 데이터 불러오기 실패</div>;
  }

  return (
    <div className="mt-10 border-solid border-t-slate-800">
      <PickArtist artistInfo={artistInfo} />
    </div>
  );
};

export default PickArtistPage;
