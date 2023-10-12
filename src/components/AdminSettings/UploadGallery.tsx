"use client";
import { Artwork } from "@prisma/client";
import React, { useState } from "react";
import Select from "react-select";
import { Artist } from "@prisma/client";
import Button from "../UI/Button/SubmitButton";
import { NumberInputField, StringInputField } from "../UI/Input/InputField";

type ArtistInfo = Pick<Artist, "artist_id" | "name">;
interface getArtistProps {
  artistInfo: ArtistInfo[];
}

type ArtworkProps = Omit<Artwork, "artwork_id" | "createdAt">;

interface PostArtworkProps {
  artworks: ArtworkProps[];
}

export const UploadGallery = ({ artistInfo }: getArtistProps) => {
  const [selectedOption, setSelectedOption] = useState<ArtistInfo | null>(null);

  const options = artistInfo.map((artist) => ({
    value: artist.name,
    label: artist.name,
  }));

  const [id, setId] = useState(0);

  return (
    <div>
      <Select
        options={options}
        onChange={(option) => {
          const selectedArtist = option
            ? artistInfo.find((atrist) => atrist.name === option.value)
            : null;

          setSelectedOption(selectedArtist || null);
          setId(selectedArtist?.artist_id || 0);
        }}
      />
      {selectedOption && (
        <div>
          {selectedOption.name}
          {selectedOption.artist_id}
        </div>
      )}
    </div>
  );
};
