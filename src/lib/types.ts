import { z } from "zod";
import { firstWordForm, biodataForm, primaryInfoForm } from "./validations";

export type FirstWordForm = z.infer<typeof firstWordForm>;
export type PrimaryInfoForm = z.infer<typeof primaryInfoForm>;

export type BiodataForm = z.infer<typeof biodataForm>;

export interface BiodataFormProps {
  biodataForm: BiodataForm;
  setBiodataForm: (data: BiodataForm) => void;
  setCurrentStep: (step: string) => void;
}
