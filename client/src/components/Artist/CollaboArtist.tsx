import { getCollaboArtist } from "@/lib/action";
import Image from "next/image";
import React from "react";

const CollaboArtist = async () => {
  try {
    const artist = await getCollaboArtist();

    return (
      <div>
        <p>{artist.artist_id}</p>
        {artist.artist_image ? (
          <Image
            src={artist.artist_image}
            alt={"작가사진"}
            height={500}
            width={500}
          />
        ) : (
          <div>작가사진</div>
        )}
        <p>{artist.name}</p>
        <p>{artist.major}</p>
        <p>{artist.profile}</p>
        <p>{artist.website_url}</p>
      </div>
    );
  } catch (error) {
    return <div>Error</div>;
  }
};

export default CollaboArtist;
