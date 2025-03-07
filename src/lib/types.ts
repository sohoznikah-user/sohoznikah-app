import { z } from "zod";
import {
  biodataFormData,
  firstWordsFormData,
  primaryInfoFormData,
  generalInfoFormData,
  addressInfoFormData,
} from "./validations";
import { BiodataFormStep } from "@/app/(main)/biodata-editor/steps";

export type FirstWordsFormData = z.infer<typeof firstWordsFormData>;
export type PrimaryInfoFormData = z.infer<typeof primaryInfoFormData>;
export type GeneralInfoFormData = z.infer<typeof generalInfoFormData>;
export type AddressInfoFormData = z.infer<typeof addressInfoFormData>;

export type BiodataFormData = z.infer<typeof biodataFormData>;

export interface BiodataFormDataProps {
  biodataFormData: BiodataFormData;
  setBiodataFormData: (data: BiodataFormData) => void;
  handleSave: () => void;
  currentStep: BiodataFormStep;
  setCurrentStep: (key: string) => void;
}
