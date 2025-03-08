import { z } from "zod";
import {
  biodataFormData,
  firstWordsFormData,
  primaryInfoFormData,
  generalInfoFormData,
  addressInfoFormData,
  educationInfoFormData,
  occupationInfoFormData,
  familyInfoFormData,
  religiousInfoFormData,
  marriageInfoFormData,
  spousePreferenceInfoFormData,
  profilePicFormData,
  finalWordsFormData,
} from "./validations";
import { BiodataFormStep } from "@/app/(main)/biodata-editor/steps";

export type FirstWordsFormData = z.infer<typeof firstWordsFormData>;
export type PrimaryInfoFormData = z.infer<typeof primaryInfoFormData>;
export type GeneralInfoFormData = z.infer<typeof generalInfoFormData>;
export type AddressInfoFormData = z.infer<typeof addressInfoFormData>;
export type EducationInfoFormData = z.infer<typeof educationInfoFormData>;
export type OccupationInfoFormData = z.infer<typeof occupationInfoFormData>;
export type FamilyInfoFormData = z.infer<typeof familyInfoFormData>;
export type ReligiousInfoFormData = z.infer<typeof religiousInfoFormData>;
export type MarriageInfoFormData = z.infer<typeof marriageInfoFormData>;
export type SpousePreferenceInfoFormData = z.infer<
  typeof spousePreferenceInfoFormData
>;
export type ProfilePicFormData = z.infer<typeof profilePicFormData>;
export type FinalWordsFormData = z.infer<typeof finalWordsFormData>;

export type BiodataFormData = z.infer<typeof biodataFormData>;

export interface BiodataFormDataProps {
  biodataFormData: BiodataFormData;
  setBiodataFormData: (data: BiodataFormData) => void;
  handleSave: () => void;
  currentStep: BiodataFormStep;
  setCurrentStep: (key: string) => void;
}
