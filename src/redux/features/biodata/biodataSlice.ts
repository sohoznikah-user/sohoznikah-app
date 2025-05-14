import {
  AddressInfoFormData,
  EducationInfoFormData,
  FamilyInfoFormData,
  FinalWordsFormData,
  FirstWordsFormData,
  GeneralInfoFormData,
  MarriageInfoFormData,
  OccupationInfoFormData,
  PersonalInfoFormData,
  PrimaryInfoFormData,
  ProfilePicFormData,
  ReligiousInfoFormData,
  SpousePreferenceInfoFormData,
} from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BiodataFormData {
  "first-words"?: FirstWordsFormData;
  "primary-info"?: PrimaryInfoFormData;
  "general-info"?: GeneralInfoFormData;
  "address-info"?: AddressInfoFormData;
  "education-info"?: EducationInfoFormData;
  "occupation-info"?: OccupationInfoFormData;
  "family-info"?: FamilyInfoFormData;
  "religious-info"?: ReligiousInfoFormData;
  "personal-info"?: PersonalInfoFormData;
  "marriage-info"?: MarriageInfoFormData;
  "spouse-preference-info"?: SpousePreferenceInfoFormData;
  "profile-pic"?: ProfilePicFormData;
  "final-words"?: FinalWordsFormData;
}

interface BiodataState {
  biodataFormData: BiodataFormData;
}

const initialState: BiodataState = {
  biodataFormData: {},
};

const biodataSlice = createSlice({
  name: "biodata",
  initialState,
  reducers: {
    setBiodataFormData: (
      state,
      action: PayloadAction<{ key: string; data: any }>
    ) => {
      state.biodataFormData[action.payload.key] = action.payload.data;
    },
    updateBiodataFormData: (
      state,
      action: PayloadAction<{ key: string; data: any }>
    ) => {
      state.biodataFormData[action.payload.key] = {
        ...state.biodataFormData[action.payload.key],
        ...action.payload.data,
      };
    },
    clearBiodataFormData: (state) => {
      state.biodataFormData = {};
    },
  },
});

export const {
  setBiodataFormData,
  updateBiodataFormData,
  clearBiodataFormData,
} = biodataSlice.actions;
export default biodataSlice.reducer;
