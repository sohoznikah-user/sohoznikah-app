// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/PrimaryInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { biodataFor, biodataTypes } from "@/lib/consts";
import { PrimaryInfoFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";

export default function PrimaryInfo({
  biodata,
  primaryInfoFormData,
}: {
  biodata?: IBiodata;
  primaryInfoFormData: PrimaryInfoFormData;
}) {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center  text-3xl font-normal">
          প্রাথমিক তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বায়োডাটার ধরন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(biodataTypes, primaryInfoFormData?.biodataType)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বায়োডাটা কার জন্য তৈরী করছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(biodataFor, primaryInfoFormData?.biodataFor)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পাত্র/পাত্রীর সম্পূর্ণ নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {primaryInfoFormData?.fullName}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পিতার নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {primaryInfoFormData?.fatherName}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাতার নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {primaryInfoFormData?.motherName}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
