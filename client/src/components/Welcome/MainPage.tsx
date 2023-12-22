"use client";

import React from "react";
import LinkWithHover from "./LinkWithHover";
import { useQuery } from "@tanstack/react-query";
import { getTodayArtist } from "../../../lib/action";
import Link from "next/link";

export const Mainpage = () => {
  const { data: artistName } = useQuery(["artistName"], getTodayArtist);

  console.log(process.env.GOOGLE_CLIENT_ID);
  console.log(process.env.GOOGLE_CLIENT_SECRET);
  console.log(process.env.NEXTAUTH_SECRET);
  console.log(process.env.NEXTAUTH_URL);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-2xl text-white uppercase bg-black">
      <h1 className={"mb-5 font-bold text-white"}>PhiloBerry studio</h1>
      <h1 className={"mb-5 f o nt-bold"}> X </h1>
      <Link href={"/artist"}>
        <h1 className={"mb-20 font-bold"}>{artistName}</h1>
      </Link>
      <ul className="flex w-5/6 max-w-[380px] min-w-[300px] justify-around mt-10vh pr-4">
        <LinkWithHover href="/sale">goods shop</LinkWithHover>
        <LinkWithHover href="/gallery">gallery</LinkWithHover>
      </ul>
    </div>
  );
};

export default Mainpage;
