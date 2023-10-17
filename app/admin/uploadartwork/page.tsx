import React from "react";
import { UploadGallery } from "../../../src/components/AdminSettings/UploadGallery";
import { Artist } from "@prisma/client";
import { getArtist } from "../../../lib/action";

type ArtistInfo = Pick<Artist, "artist_id" | "name">;
interface getArtistProps {
  artistInfo: ArtistInfo[];
}

const uploadArtwork = async () => {
  const { artistInfo }: getArtistProps = await getArtist();

  return (
    <div>
      <UploadGallery artistInfo={artistInfo} />
    </div>
  );
};

export default uploadArtwork;
