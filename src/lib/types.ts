import { z } from "zod";
import {
  firstWordForm,
  biodataCreateForm,
  biodataEditForm,
} from "./validations";

export type FirstWordForm = z.infer<typeof firstWordForm>;

export type BiodataCreateForm = z.infer<typeof biodataCreateForm>;
export type BiodataEditForm = z.infer<typeof biodataEditForm>;

export interface BiodataFormProps {
  biodataForm: BiodataCreateForm | BiodataEditForm;
  setBiodataForm: (data: BiodataCreateForm | BiodataEditForm) => void;
}
