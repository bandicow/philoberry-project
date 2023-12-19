import { NewArtwork, ArtworkState } from "@/src/Types/Art";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialState: NewArtwork[] = [
  {
    title: "",
    artist_name: "",
    mainImage: "",
    description: "",
    material: "",
    size: "",
    price: 0,
    isSold: false,
    order: 0,
    createdAt: 0,
    artworkImages: [],
  },
];

const initialFiles: File[][] = [[]];

const store = immer<ArtworkState>((set) => ({
  artistName: "",
  artworks: initialState,
  files: initialFiles,
  setArtistName: (name: string) =>
    set((state) => {
      state.artistName = name;
    }),
  //** 폼 추가를 위한 작품탭 추가 */
  addArtwork: (artwork: NewArtwork) =>
    set((state) => {
      state.artworks.push(artwork);
    }),
  //**폼 업데이트 (작품 업데이트) */
  updateArtwork: (index: number, updatedArtwork: NewArtwork) =>
    set((state) => {
      state.artworks[index] = {
        ...updatedArtwork,
        artist_name: state.artistName,
        artworkImages: state.files[index],
      };
    }),
  //**폼 삭제 */
  removeArtwork: (index: number) =>
    set((state) => {
      state.artworks.splice(index, 1);
      state.files.splice(index, 1);
    }),

  //**파일 추가 */
  addFile: (index: number, file: File[]) =>
    set((state) => {
      if (state.files[index]) {
        state.files[index].push(...file);
      } else {
        state.files[index] = file;
      }
    }),
  //**파일 업데이트 */
  updateFile: (index: number, file: File[]) =>
    set((state) => {
      state.files[index] = state.files[index]
        ? [...state.files[index], ...file]
        : file;
    }),
  //**파일 제거 */
  removeFile: (index: number, fileIndex: number) =>
    set((state) => {
      if (state.files[index]) {
        state.files[index].splice(fileIndex, 1);
      }
    }),

  //**특정폼 삭제 - 파일 */
  resetFiles: (index: number) => {
    set((state) => {
      state.files.splice(index, 1);
    });
  },
  //**특정폼 삭제 - 내용 */
  resetArtwork: (index: number) => {
    set((state) => {
      state.artworks.splice(index, 1);
    });
  },

  //**폼 및 파일 초기화 */
  resetAll: () => set(() => ({ artworks: initialState, files: initialFiles })),
}));
export const useArtworkStore = create(store);
