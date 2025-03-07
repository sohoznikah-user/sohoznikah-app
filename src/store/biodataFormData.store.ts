import { create } from "zustand";
import { BiodataFormData } from "@/lib/types";

export interface BiodataFormDataStore {
  biodataFormData: BiodataFormData | null;
  setBiodataFormData: (biodata: BiodataFormData | null) => void;
}

export const useBiodataFormDataStore = create<BiodataFormDataStore>((set) => ({
  biodataFormData: null,
  setBiodataFormData: (biodataFormData: BiodataFormData | null) =>
    set({ biodataFormData }),
}));
