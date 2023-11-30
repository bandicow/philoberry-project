import { getCollaboArtist } from "@/lib/action";
import React from "react";
import ErrorPlaceholder from "../Static/default-error";

const CollaboArtist = () => {
  try {
    const artist = getCollaboArtist();

    return <div>{artist}</div>;
  } catch (error) {
    return <ErrorPlaceholder error={error as Error} />;
  }
};

export default CollaboArtist;
