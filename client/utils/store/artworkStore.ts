import { UploadArtwork, ArtworkState } from "@/src/Types/Art";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialState: UploadArtwork[] = [
  {
    title: "",
    artist_name: "",
    s3key: "",
    description: "",
    material: "",
    size: "",
    price: 0,
    isSold: false,
    order: 0,
    createdAt: 0,
  },
];

const store = immer<ArtworkState>((set) => ({
  artworks: initialState,
  files: [],
  //** 폼 추가 */
  addArtwork: (artwork: UploadArtwork) =>
    set((state) => ({ artworks: [...state.artworks, artwork] })),
  //**폼 업데이트 */
  updateArtwork: (index: number, updatedArtwork: UploadArtwork) =>
    set((state) => {
      state.artworks[index] = updatedArtwork;
      return state;
    }),
  //**폼 삭제 */
  removeArtwork: (index: number) =>
    set((state) => {
      state.artworks.splice(index, 1);
      return state;
    }),
  //**파일 추가 */
  addFile: (file: File) => set((state) => ({ files: [...state.files, file] })),
  // 파일 업데이트
  updateFile: (index: number, file: File) =>
    set((state) => {
      state.files[index] = file;
      return state;
    }),
  //**파일 삭제 */
  removeFile: (index: number) =>
    set((state) => {
      state.files.splice(index, 1);
      return state;
    }),
  //**폼 초기화 */
  resetArtwork: () => set(() => ({ artworks: initialState, files: [] })),
}));

export const useArtworkStore = create(store);
