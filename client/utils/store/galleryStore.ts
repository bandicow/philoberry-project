import { create } from "zustand";

type GalleryState = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const useGalleryStore = create<GalleryState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index: number) => set(() => ({ activeIndex: index })),
}));
