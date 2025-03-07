import {
  FirstWordsFormData,
  GeneralInfoFormData,
  PrimaryInfoFormData,
} from "@/lib/types";
import {
  CreateBiodataResponse,
  UpdateBiodataResponse,
} from "../interfaces/biodata.interfaces";
import { http } from "./base";

export const createBiodata = async (
  data: FirstWordsFormData
): Promise<CreateBiodataResponse> => {
  //   const result = await http.post<CreateBiodataResponse>(`/biodatas`);
  //   return result.data;
  console.log(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "12345",
        status: "draft",
      });
    }, 1000); // Simulate network delay
  });
};

export const updatePrimaryInfo = async (
  id: string,
  data: PrimaryInfoFormData
): Promise<UpdateBiodataResponse> => {
  const result = await http.patch<UpdateBiodataResponse>(
    `/biodatas/${id}/primary-info`
  );
  return result.data;
};

export const updateGeneralInfo = async (
  id: string,
  data: GeneralInfoFormData
): Promise<UpdateBiodataResponse> => {
  const result = await http.patch<UpdateBiodataResponse>(
    `/biodatas/${id}/general-info`
  );
  return result.data;
};
