import { ArtistState, NewArtist } from "@/src/Types/ZustandType";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const artistStore = immer<ArtistState>((set) => ({
  ArtistData: {},
  setArtist: (key: keyof NewArtist, value: any) =>
    set((state) => {
      if (state.ArtistData) {
        state.ArtistData[key] = value;
      }
      return state;
    }),
}));

export const useArtistStore = create(artistStore);
