// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/FamilyInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  familyBackgrounds,
  familyTypes,
  siblingSerialOptions,
} from "@/lib/consts";
import { FamilyInfoFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";

export default function FamilyInfo({
  biodata,
  familyInfoFormData,
}: {
  biodata?: IBiodata;
  familyInfoFormData: FamilyInfoFormData;
}) {
  // console.log("familyInfoFormData", familyInfoFormData);
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          পারিবারিক তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার পিতা-মাতা উভয়েই জীবিত আছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.parentsAlive}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পিতার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.fatherOccupation}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাতার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.motherOccupation}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-1/2">ভাই-বোন সম্পর্কে তথ্য:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.siblings?.map((sibling: any) => (
              <div key={sibling.serial}>
                {getTitleById(siblingSerialOptions, sibling.serial)}:{" "}
                {sibling.type}, {sibling.occupation}, {sibling.maritalStatus}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2"> চাচা কতজন এবং কি করেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.fatherSideDetail}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2"> মামা কতজন এবং কি করেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.motherSideDetail}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পরিবারের ধরণ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(familyTypes, familyInfoFormData?.familyType)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পরিবারের অর্থনৈতিক অবস্থা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(
              familyBackgrounds,
              familyInfoFormData?.familyBackground
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনি সহ আপনার পরিবারের নিজস্ব বাড়িতে থাকা হয় নাকি ভাড়া বাড়িতে?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.livingCondition}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনাদের বাড়ি-ঘরের বা সম্পত্তির হাল্কা বিবরন দিন:
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.wealthDescription}
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">
          <div className="w-1/2">পারিবারিক বিষয়ে আরো কিছু:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {familyInfoFormData?.familyOtherDetails}
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
