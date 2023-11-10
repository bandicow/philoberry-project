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
    <div className="relative center">
      <h1 className="font-extrabold">제품 선택</h1>

      <form onSubmit={submitHandler} className="w-full center">
        <Select
          className="w-5/6"
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
        <div className="pt-72">
          <Button goal={"작가 선택"} />
        </div>
      </form>
    </div>
  );
};

export default GalleryArtist;
