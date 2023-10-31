"use client";

import React, { FormEvent, useState } from "react";
import Select from "react-select";
import Button from "../UI/Button/SubmitButton";
import { PickArtist } from "@prisma/client";
import { postTodayArtist } from "@/lib/action";
import { getArtistProps } from "@/src/Types/Art";

const GalleryArtist = ({ artistInfo }: getArtistProps) => {
  const [selectedOption, setSelectedOption] = useState<PickArtist | null>(null);

  const options = artistInfo.map((artist) => ({
    value: artist.name,
    label: artist.name,
  }));

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (selectedOption !== null) {
      const pickedArtist: PickArtist = selectedOption;

      console.log(pickedArtist);

      await postTodayArtist(pickedArtist);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Select
          options={options}
          onChange={(option) => {
            const selectedArtist = option
              ? artistInfo.find((artist) => artist.name === option.value)
              : null;

            if (selectedArtist) {
              setSelectedOption({
                id: selectedArtist.artist_id,
                artist_name: selectedArtist.name,
              });
            } else {
              setSelectedOption(null);
            }
          }}
        />
        <Button goal={"작가 선택"} />
      </form>
    </div>
  );
};

export default GalleryArtist;
