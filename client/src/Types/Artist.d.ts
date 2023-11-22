import { Artist } from "@prisma/client";
import { ArtistInfo } from "./Art";

type NewArtist = Omit<Artist, "artist_id">;
type ArtistState = {
  ArtistData: NewArtist;
  setArtist: (key: keyof NewArtist, value: any) => void; // 'string'을 'keyof NewArtist'로 변경
};
