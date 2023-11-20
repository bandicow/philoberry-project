import { Artist } from "@/prismaType";

export type ISODateString = string;
export interface DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
}

//** id, name 포함 */
type ArtistInfo = Pick<Artist, "artist_id" | "name">;

//** Artist  배열 */
interface getArtistProps {
  artistInfo: ArtistInfo[];
}

//** "artwork_id" | "createdAt" 제외 */
type ArtworkProps = Omit<Artwork, "artwork_id" | "createdAt">;

//** Artwork 업로드 props */
interface PostArtworkProps {
  artworks: ArtworkProps[];
}

export interface ClientGalleyImageProps {
  GallreyImg: GalleryImage[];
}

//** 작가 불러오기 Props */
interface getPickArtistProps {
  artistInfo: Artist[];
}
