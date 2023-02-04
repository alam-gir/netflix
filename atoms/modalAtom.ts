import { atom } from "recoil";
import { DocumentData } from "firebase/firestore";
import { Movie } from "@/utils/type";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const movieState = atom<Movie | null | DocumentData>({
  key: "movieState",
  default: null,
});
