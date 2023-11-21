"use client";

import React, { FormEvent, useState } from "react";
import Select from "react-select";
import Button from "../UI/Button/SubmitButton";
import { PickArtist } from "@prisma/client";
import { postTodayArtist } from "@/lib/action";
import { getArtistProps } from "@/src/Types/Art";
import SlideUpMessage from "../UI/Alert/Slideup";
import { useNotification } from "@/src/hooks/useNotification";

const GalleryArtist = ({ artistInfo }: getArtistProps) => {
  const [selectedOption, setSelectedOption] = useState<PickArtist | null>(null);
  const {
    shake,
    showFailureMessage,
    showSuccessMessage,
    startFailureNotification,
    startSuccessNotification,
  } = useNotification();

  const options = artistInfo.map((artist) => ({
    value: artist.name,
    label: artist.name,
  }));

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (selectedOption !== null) {
      const pickedArtist: PickArtist = selectedOption;

      try {
        await postTodayArtist(pickedArtist);
        startSuccessNotification();
      } catch (error) {
        startFailureNotification();
      }
    }
  };

  return (
    <div className={`relative center ${shake ? "animate-shake" : ""}`}>
      <h1 className="font-extrabold">콜라보 작가 선택</h1>
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
        <div className="mb-20 pt-72">
          <Button goal={"작가 선택"} />
        </div>
      </form>
      <SlideUpMessage
        message="변경이 완료되었습니다."
        show={showSuccessMessage}
      />
      <SlideUpMessage
        message="변경에 실패하였습니다."
        show={showFailureMessage}
        fail={true}
      />
    </div>
  );
};

export default GalleryArtist;
