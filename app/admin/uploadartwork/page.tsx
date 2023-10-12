import React from "react";
import { UploadGallery } from "../../../src/components/AdminSettings/UploadGallery";
import axios from "axios";
import { Artist } from "@prisma/client";

type ArtistInfo = Pick<Artist, "artist_id" | "name">;
interface getArtistProps {
  artistInfo: ArtistInfo[];
}

const getArtist = async () => {
  const response = await axios.get(`${process.env.SITE_URL}/api/getArtist`);

  return { artistInfo: response.data };
};

const uploadArtwork = async () => {
  const { artistInfo }: getArtistProps = await getArtist();

  return (
    <div>
      <UploadGallery artistInfo={artistInfo} />
    </div>
  );
};

export default uploadArtwork;
