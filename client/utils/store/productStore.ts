import { NewProduct } from "@/src/Types/Product";
import { ProductDataValue, ProductState } from "@/src/Types/ZustandType";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialState: NewProduct = {
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
};

const store = immer<ProductState>((set) => ({
  productData: initialState,
  setProductData: <ProductDataKey extends keyof NewProduct>(
    key: ProductDataKey,
    value: ProductDataValue
  ) =>
    set((state) => {
      state.productData[key] = value;
      return state;
    }),
  setImages: (images) =>
    set((state) => {
      state.productData.mainImage = images[0];
      state.productData.productImages = images;
      return state;
    }),
  resetProductData: () => set(() => ({ productData: initialState })),
}));

export const useProductStore = create(store);
