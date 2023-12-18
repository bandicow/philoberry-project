import { Artist, Artwork, ArtworkImage } from "@prisma/client";

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

type NewArtwork = Omit<Artwork, "artwork_id"> & {
  artworkImages: File[];
};

type UploadArtwork = Omit<Artwork, "artwork_id"> & {
  artworkImages: string[];
};

//** UploadArtwork props for Zustand */
type ArtworkState = {
  artistName: string;
  artworks: NewArtwork[];
  files: File[][];
  setArtistName: (name: string) => void;
  addArtwork: (artwork: NewArtwork) => void;
  updateArtwork: (index: number, updatedArtwork: NewArtwork) => void;
  removeArtwork: (index: number) => void;
  addFile: (index: number, file: File[]) => void;
  updateFile: (formIndex: number, file: File[]) => void;
  removeFile: (index: number, fileIndex: number) => void;
  resetFiles: (index: number) => void;
  resetArtwork: (index: number) => void;
  resetAll: () => void;
};

type ArtistValueProps = Pick<
  UploadArtwork,
  "title" | "createdAt" | "material" | "size" | "price" | "description"
>;
