// src/redux/features/filter/filterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  biodataType?: string;
  maritalStatus?: string[];
  ageMin?: number;
  ageMax?: number;
  heightMin?: number;
  heightMax?: number;
  skinTone?: string[];
  permanentLocation?: string;
  permanentState?: string[];
  permanentCity?: string[];
  allCountriesPermanent?: boolean;
  currentLocation?: string;
  currentState?: string[];
  currentCity?: string[];
  allCountriesCurrent?: boolean;
  religiousLifestyle?: string[];
  occupation?: string[];
  education?: string[];
  religiousEducation?: string[];
  familyStatus?: string[];
  madhhab?: string[];
  bloodGroup?: string[];
  specialCategory?: string[];
  myBiodataType?: string;
  mySpecialCategory?: string[];
  myMaritalStatus?: string[];
  myAgeMin?: number;
  myAgeMax?: number;
  myHeightMin?: number;
  myHeightMax?: number;
  mySkinTone?: string;
}

export const filterInitialState: FilterState = {
  biodataType: "",
  maritalStatus: [],
  ageMin: 18,
  ageMax: 80,
  heightMin: 36,
  heightMax: 84,
  skinTone: [],
  permanentLocation: "",
  permanentState: [],
  permanentCity: [],
  allCountriesPermanent: false,
  currentLocation: "",
  currentState: [],
  currentCity: [],
  allCountriesCurrent: false,
  religiousLifestyle: [],
  occupation: [],
  education: [],
  religiousEducation: [],
  familyStatus: [],
  madhhab: [],
  bloodGroup: [],
  specialCategory: [],
  myBiodataType: "",
  mySpecialCategory: [],
  // myMaritalStatus: [],
  // myAgeMin: 18,
  // myAgeMax: 80,
  // myHeightMin: 36,
  // myHeightMax: 84,
  // mySkinTone: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    setFilterData: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    removeFilterData: (
      state,
      action: PayloadAction<{ key: keyof FilterState; value: unknown }>
    ) => {
      const { key, value } = action.payload;
      if (key in state) {
        const currentField = state[key];
        if (Array.isArray(currentField) && typeof value === "string") {
          (state[key] as string[]) = currentField.filter(
            (item) => item !== value
          );
        } else if (
          typeof currentField === "number" &&
          typeof value === "number"
        ) {
          (state[key] as number) = filterInitialState[key] as number;
        } else if (typeof currentField === "string") {
          (state[key] as string) = "";
        }
      }
    },
    resetFilters: () => filterInitialState,
  },
});

export const { setFilterData, removeFilterData, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
