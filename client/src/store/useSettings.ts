// import { create } from "zustand";

interface ColorState {
  color: string;
  setBgColor?: (color: string) => void;
}

// export const useColorStore = create<ColorState>((set) => ({
//   backgroundColor: "#121212",
//   setBgColor: (color) => set({ backgroundColor: color }),
// }));
