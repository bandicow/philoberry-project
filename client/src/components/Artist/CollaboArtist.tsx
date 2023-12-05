"use client";
import { getCollaboArtist } from "@/lib/action";
import { Artist } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CollaboArtist() {
  const [artist, setArtist] = useState<Artist>();
  useEffect(() => {
    const fetchCollaboArtist = async () => {
      const artistInfo = await getCollaboArtist();

      setArtist(artistInfo);
    };
    fetchCollaboArtist();
  }, []);

  return (
    <>
      <div>
        <p>{artist?.artist_id}</p>
        {artist?.artist_image ? (
          <Image
            src={artist?.artist_image}
            alt={"작가사진"}
            height={500}
            width={500}
          />
        ) : (
          <div>작가사진</div>
        )}
        <p>{artist?.name}</p>
        <p>{artist?.major}</p>
        <p>{artist?.profile}</p>
        <p>{artist?.website_url}</p>
      </div>
    </>
  );
}
