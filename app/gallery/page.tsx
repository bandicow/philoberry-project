import React from "react";
import GalleryImageList from "../../src/Gallery/GalleryImageList";
import { dehydrate } from "@tanstack/react-query";
import axios from "axios";
import Hydrate from "../../src/utils/hydrate.client";
import getQueryClient from "../../src/utils/getQueryClient";

export const getArtwork = async () => {
  const name = await axios.get(`${process.env.SITE_URL}/api/getTodayArtist`);
  if (!name) return { data: [], bg: "" }; // Add this line to prevent running the query before artist name is available.
  const [response, bg] = await Promise.all([
    axios.get(`${process.env.SITE_URL}/api/getArtwork/${name}`),
    axios.get(`${process.env.SITE_URL}/api/getBackgroundColor`),
  ]);

  const artworks = { data: response.data, bg: bg.data.backgroundColor };

  return artworks;
};

const Gallery = async () => {
  // 싱글톤 리액트 쿼리
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(["artworks"], getArtwork);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <GalleryImageList />
    </Hydrate>
  );
};

export default Gallery;
