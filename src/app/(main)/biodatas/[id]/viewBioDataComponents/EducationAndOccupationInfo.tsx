// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/EducationAndOccupationInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  educationTypes,
  occupationsList,
  religiousEducation,
} from "@/lib/consts";
import { EducationInfoFormData, OccupationInfoFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";
import { ArrowRight } from "lucide-react";

export default function EducationAndOccupationInfo({
  biodata,
  educationInfoFormData,
  occupationInfoFormData,
}: {
  biodata?: IBiodata;
  educationInfoFormData: EducationInfoFormData;
  occupationInfoFormData: OccupationInfoFormData;
}) {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          শিক্ষাগত যোগ্যতা
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">শিক্ষার ধরণ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(educationTypes, educationInfoFormData?.type)}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-1/2">শিক্ষাগত যোগ্যতা</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {educationInfoFormData?.degrees?.map((deg) => (
              <ul key={deg.degreeType}>
                <li className="flex justify-start items-center gap-3">
                  <ArrowRight size={19} /> {deg?.name}, {deg.passYear},{" "}
                  {deg.group}, {deg.institute}
                </li>
              </ul>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-1/2">দ্বীনি শিক্ষাগত যোগ্যতা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            <div>
              {getTitleById(
                religiousEducation,
                educationInfoFormData?.religiousEducation
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          পেশা
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(occupationsList, occupationInfoFormData?.occupations)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পেশা নিয়ে বিস্তারিত লিখুন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {occupationInfoFormData?.detail}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাসিক আয়:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {occupationInfoFormData?.monthlyIncome}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
