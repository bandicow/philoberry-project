import React from "react";
import { UploadGallery } from "../../../src/components/AdminSettings/UploadGallery";
import { Artist } from "@prisma/client";
import { getArtist } from "../../../lib/action";

type ArtistInfo = Pick<Artist, "artist_id" | "name">;
interface getArtistProps {
  artistInfo: ArtistInfo[];
}

const uploadArtwork = async () => {
  const productResult = await getArtist();

  if (!productResult) {
    console.error("Failed to get product");
    return <div> 데이터 불러오기 실패</div>;
  }

  const { artistInfo }: getArtistProps = productResult;

  return (
    <div>
      <UploadGallery artistInfo={artistInfo} />
    </div>
  );
};

export default uploadArtwork;
