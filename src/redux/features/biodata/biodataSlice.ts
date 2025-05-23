import { createSlice } from "@reduxjs/toolkit";

interface BiodataState {
  biodata: {
    id: string;
    code: string;
    biodataType: string;
    profilePic: string;
    status: string;
    visibility: string;
    token: string | number;
  };
  biodataFormData: {
    [key: string]: any; // each step’s data
  };
}

const initialState: BiodataState = {
  biodata: {
    id: "",
    code: "",
    biodataType: "",
    profilePic: "",
    status: "",
    visibility: "",
    token: "",
  },
  biodataFormData: {}, // not null
};

const biodataSlice = createSlice({
  name: "biodata",
  initialState,
  reducers: {
    updateBiodataFormData: (state, action) => {
      const { key, data } = action.payload;
      state.biodataFormData[key] = data;
    },
    setAllBiodataFormData: (state, action) => {
      state.biodataFormData = action.payload;
    },
    setAllBiodata: (state, action) => {
      state.biodata = action.payload;
    },
    clearBiodataFormData: (state) => {
      state.biodata = initialState.biodata;
      state.biodataFormData = initialState.biodataFormData;
    },
  },
});

export const {
  updateBiodataFormData,
  clearBiodataFormData,
  setAllBiodataFormData,
  setAllBiodata,
} = biodataSlice.actions;

export default biodataSlice.reducer;
