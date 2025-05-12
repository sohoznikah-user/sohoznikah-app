import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BiodataFormData {
  firstWordsFormData?: any;
  primaryInfoFormData?: any;
  generalInfoFormData?: any;
  addressInfoFormData?: any;
  educationInfoFormData?: any;
  occupationInfoFormData?: any;
  familyInfoFormData?: any;
  religiousInfoFormData?: any;
  personalInfoFormData?: any;
  marriageInfoFormData?: any;
  spousePreferenceInfoFormData?: any;
  profilePicFormData?: any;
  finalWordsFormData?: any;
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
    clearBiodataFormData: (state) => {
      state.biodataFormData = {};
    },
  },
});

export const { setBiodataFormData, clearBiodataFormData } =
  biodataSlice.actions;
export default biodataSlice.reducer;
