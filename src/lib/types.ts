import { z } from "zod";
import {
  firstWordForm,
  biodataForm,
  primaryInfoForm,
  generalInfoForm,
  addressInfoForm,
} from "./validations";

export type FirstWordForm = z.infer<typeof firstWordForm>;
export type PrimaryInfoForm = z.infer<typeof primaryInfoForm>;
export type GeneralInfoForm = z.infer<typeof generalInfoForm>;
export type AddressInfoForm = z.infer<typeof addressInfoForm>;

export type BiodataForm = z.infer<typeof biodataForm>;

export interface BiodataFormProps {
  biodataForm: BiodataForm;
  setBiodataForm: (data: BiodataForm) => void;
  setCurrentStep: (step: string) => void;
}
