// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/GeneralInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  heights,
  maritalStatuses,
  nationalities,
  skinTones,
  weights,
} from "@/lib/consts";
import { GeneralInfoFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";
import { format } from "date-fns";

export default function GeneralInfo({
  biodata,
  generalInfoFormData,
}: {
  biodata?: IBiodata;
  generalInfoFormData: GeneralInfoFormData;
}) {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black max-w-full min-w-auto mx-auto">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center   text-3xl font-normal">
          সাধারণ তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">জন্ম তারিখ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {generalInfoFormData?.dateOfBirth
              ? format(new Date(generalInfoFormData?.dateOfBirth), "yyyy")
              : "--"}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বৈবাহিক অবস্থা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(maritalStatuses, generalInfoFormData?.maritalStatus)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">গাত্রবর্ণ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(skinTones, generalInfoFormData?.skinTone)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">উচ্চতা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(heights, generalInfoFormData?.height)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ওজন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(weights, generalInfoFormData?.weight)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">রক্তের গ্রুপ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {generalInfoFormData?.bloodGroup}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">জাতীয়তা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(nationalities, generalInfoFormData?.nationality)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
