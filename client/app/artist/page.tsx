import CollaboArtist from "@/src/components/Artist/CollaboArtist";
import React from "react";

import { Metadata } from "next";
import { getCollaboArtist } from "@/lib/action";

export async function generateMetadata(): Promise<Metadata> {
  let name, major, artist_image, profile, website_url;

  try {
    const data = await getCollaboArtist();
    name = data.name;
    major = data.major;
    artist_image = data.artist_image;
    profile = data.profile;
    website_url = data.website_url;
  } catch (error) {
    console.error("Error fetching artist data:", error);

    name = "로딩중";
    major = "로딩중";
    artist_image = "https://philoberry.com/images/35mm_logo.png";
    profile = "작가의 프로필이 없습니다.";
    website_url = "https://www.philoberry.com";
  }

  return {
    metadataBase: new URL("https://www.philoberry.com"),
    title: `${name} | Philoberry`,
    description: `${profile}`,
    keywords: `${name}, ${major}, ${profile}, ${website_url} , 무명 , 작가 ,무명 작가, philoberry, 필로베리, 휠로베리`,

    openGraph: {
      type: "website",
      url: "https://philoberry.com",
      title: `${name} | Philoberry`,
      description: `${profile}` ? `${profile}` : "작가의 프로필이 없습니다.",
      siteName: "Philoberry",
      images: [
        {
          url: `${artist_image}`
            ? `${artist_image}`
            : "https://philoberry.com/images/35mm_logo.png",
          width: 500,
          height: 500,
          alt: "작가사진",
        },
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
