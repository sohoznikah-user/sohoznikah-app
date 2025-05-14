import { BiodataFormData } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BiodataState {
  biodataFormData: BiodataFormData;
}

const initialState: BiodataState = {
  biodataFormData: {
    firstWordsFormData: {
      preApprovalAcceptTerms: false,
      preApprovalOathTruthfulInfo: false,
      preApprovalOathLegalResponsibility: false,
    },
    primaryInfoFormData: {
      biodataType: "",
      biodataFor: "",
      fullName: "",
      fatherName: "",
      motherName: "",
      email: "",
      phoneNumber: "",
      guardianContacts: [],
    },
    generalInfoFormData: {
      dateOfBirth: "",
      maritalStatus: "",
      skinTone: "",
      height: "",
      weight: "",
      bloodGroup: "",
      nationality: "",
    },
    addressInfoFormData: { addresses: [] },
    educationInfoFormData: {
      type: "",
      highestDegree: "",
      degrees: [],
      religiousEducation: [],
      detail: "",
    },
    occupationInfoFormData: { occupations: [], detail: "", monthlyIncome: "" },
    familyInfoFormData: {
      parentsAlive: "",
      fatherOccupation: "",
      motherOccupation: "",
      siblings: [],
      fatherSideDetail: "",
      motherSideDetail: "",
      familyType: "",
      familyBackground: "",
      livingCondition: "",
      wealthDescription: "",
    },
    religiousInfoFormData: {
      type: "",
      ideology: "",
      madhab: "",
      praysFiveTimes: "",
      hasQazaPrayers: "",
      canReciteQuranProperly: "",
      avoidsHaramIncome: "",
      modestDressing: "",
      followsMahramRules: "",
      beliefAboutPirMurshidAndMazar: "",
      practicingSince: "",
    },
    personalInfoFormData: {
      beardStatus: "",
      preferredOutfit: "",
      entertainmentPreferences: "",
      healthConditions: "",
      personalTraits: [],
      genderEqualityView: "",
      lgbtqOpinion: "",
      specialConditions: [],
    },
    marriageInfoFormData: {
      guardianApproval: "",
      continueStudy: "",
      careerPlan: "",
      residence: "",
      arrangeHijab: "",
      dowryExpectation: "",
      allowShowingPhotoOnline: "",
      additionalMarriageInfo: "",
    },
    spousePreferenceInfoFormData: {
      age: "",
      skinTone: [],
      height: "",
      educationalQualification: "",
      religiousEducationalQualification: [],
      address: "",
      maritalStatus: [],
      specialCategory: [],
      religiousType: [],
      occupation: [],
      familyBackground: [],
      secondMarriage: "",
      location: "",
      qualities: "",
    },
    profilePicFormData: { photoId: "" },
    finalWordsFormData: {
      postApprovalOathTruthfulInfo: false,
      postApprovalOathNoMisuse: false,
      postApprovalOathLegalResponsibility: false,
    },
  },
};

const biodataSlice = createSlice({
  name: "biodata",
  initialState,
  reducers: {
    updateBiodataFormData(
      state,
      action: PayloadAction<{ key: string; data: any }>
    ) {
      state.biodataFormData = {
        ...state.biodataFormData,
        [action.payload.key]: action.payload.data,
      };
    },
    clearBiodataFormData(state) {
      state.biodataFormData = initialState.biodataFormData;
    },
  },
});

export const { updateBiodataFormData, clearBiodataFormData } =
  biodataSlice.actions;
export default biodataSlice.reducer;
