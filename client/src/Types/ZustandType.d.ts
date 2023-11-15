import { NewProduct } from "@/src/Types/Product";

type ProductState = {
  productData: NewProduct;
  setProductData: (
    key: keyof NewProduct,
    value: NewProduct[keyof NewProduct]
  ) => void;
  setImages: (images: string[]) => void;
};

export type ProductDataKey = keyof NewProduct;

export type ProductDataValue = NewProduct[typeof ProductDataKey];
