import { NewProduct } from "@/src/Types/Product";
import { Artist } from "@prisma/client";
import { ArtistInfo } from "./Art";

// 제품
type ProductState = {
  productData: NewProduct;
  setProductData: (
    key: keyof NewProduct,
    value: NewProduct[keyof NewProduct]
  ) => void;
  setImages: (images: string[]) => void;
  resetProductData: () => void;
};

export type ProductDataKey = keyof NewProduct;

export type ProductDataValue = NewProduct[typeof ProductDataKey];

// 작가

type NewArtist = {
  artist_image?: string;
  name?: string;
  major?: string;
  profile?: string;
  website_url?: string;
};

type ArtistState = {
  ArtistData: NewArtist;
  setArtist: (key: keyof NewArtist, value: any) => void;
};
