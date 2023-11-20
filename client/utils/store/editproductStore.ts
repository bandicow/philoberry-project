import { EditProductState } from "@/src/Types/Product";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const editProductStore = immer<EditProductState>((set) => ({
  editProduct: null,
  setEditProduct: (editProduct) =>
    set((state) => {
      state.editProduct = editProduct;
    }),
}));

export const useEditProductStore = create(editProductStore);
