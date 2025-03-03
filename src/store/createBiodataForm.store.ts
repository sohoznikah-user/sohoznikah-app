import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BiodataForm } from "@/lib/types";

export interface CreateBiodataFormStore {
  biodataForm: BiodataForm | null;
  setBiodataForm: (biodata: BiodataForm | null) => void;
}

export const useCreateBiodataFormStore = create(
  persist<CreateBiodataFormStore>(
    (set) => ({
      biodataForm: null,
      setBiodataForm: (biodataForm: BiodataForm | null) => set({ biodataForm }),
    }),
    {
      name: "create-biodata-form",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
