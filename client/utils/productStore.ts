import { NewProduct } from "@/src/Types/Product";
import { ProductDataValue, ProductState } from "@/src/Types/ZustandType";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const store = immer<ProductState>((set) => ({
  productData: {
    name: "",
    category: "",
    price: 0,
    material: "",
    color: "",
    size: "",
    details: "",
    precautions: "",
    seller: "",
    url: "",
    stock: 0,
    mainImage: null,
    productImages: [],
  },
  setProductData: <ProductDataKey extends keyof NewProduct>(
    key: ProductDataKey,
    value: ProductDataValue
  ) =>
    set((state) => {
      console.log(`Updating ${key} to ${value}`);
      state.productData[key] = value;
      return state;
    }),
  setImages: (images) =>
    set((state) => {
      state.productData.mainImage = images[0];
      state.productData.productImages = images;
      return state;
    }),
}));

export const useProductStore = create(store);
