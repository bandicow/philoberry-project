import CollaboArtist from "@/src/components/Artist/CollaboArtist";
import React from "react";

import { Metadata, ResolvingMetadata } from "next";
import { getCollaboArtist } from "@/lib/action";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { name, major, artist_image, profile, website_url } =
    await getCollaboArtist();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${name} | Philoberry`,
    description: profile,
    keywords: `${name}, ${major}, ${profile}, ${website_url} , 무명 , 작가 ,무명 작가, philoberry, 필로베리, 휠로베리`,

    openGraph: {
      type: "website",
      url: "https://philoberry.com",
      title: `${name} | Philoberry`,
      description: profile ? profile : "작가의 프로필이 없습니다.",
      images: [
        {
          url: artist_image
            ? artist_image
            : "https://philoberry.com/images/35mm_logo.png",
          width: 500,
          height: 500,
          alt: "작가사진",
        },
        ...previousImages,
      ],
    },
  };
}

const page = () => {
  return (
    <div>
      <CollaboArtist />
    </div>
  );
};

export default page;
