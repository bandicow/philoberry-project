"use client";

import React from "react";
import LinkWithHover from "./LinkWithHover";
import { useQuery } from "react-query";
import axios from "axios";

export const Mainpage = () => {
  async function getTodayArtist() {
    const response = await axios.get("/api/getTodayArtist");

    return response.data.artistName;
  }

  const { data: artistName } = useQuery("artistName", getTodayArtist);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-2xl text-white uppercase bg-black">
      <h1 className={"mb-5 font-bold text-white"}>PhiloBerry studio</h1>
      <h1 className={"mb-5 f o nt-bold"}> X</h1>
      <h1 className={"mb-20 font-bold"}>{artistName}</h1>
      <ul className="flex justify-around w-auto mt-10vh">
        <LinkWithHover href="/sale">goods shop</LinkWithHover>
        <LinkWithHover href="/gallery">gellery</LinkWithHover>
      </ul>
    </div>
  );
};

export default Mainpage;
