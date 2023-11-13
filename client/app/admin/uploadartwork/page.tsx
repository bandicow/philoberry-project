"use client";
import React, { useEffect, useState } from "react";
import { UploadArtwork } from "../../../src/components/AdminSettings/UploadArtwork";
import { getArtist } from "../../../lib/action";
import { ArtistInfo, getArtistProps } from "@/src/Types/Art";

interface ArtistInfoProps {
  artistInfo: ArtistInfo[];
}

const UploadArtworkPage = () => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const artistList = await getArtist();

      if (!artistList) {
        console.error("Failed to get product");
        return;
      }

      const { artistInfo }: ArtistInfoProps = artistList;
      setArtistInfo(artistInfo);
    };

    fetchArtist();
  }, []);

  if (!artistInfo) {
    return <div> 데이터 불러오기 실패</div>;
  }

  return (
    <div className="mt-10 border-solid border-t-slate-800">
      <UploadArtwork artistInfo={artistInfo} />
    </div>
  );
};

export default UploadArtworkPage;
