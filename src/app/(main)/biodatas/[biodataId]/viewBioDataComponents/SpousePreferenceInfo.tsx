// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/SpousePreferenceInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  education,
  familyBackgrounds,
  heights,
  occupationsList,
  religiousLifestyle,
  skinTones,
} from "@/lib/consts";
import { SpousePreferenceInfoFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";

export default function SpousePreferenceInfo({
  biodata,
  spousePreferenceInfoFormData,
}: {
  biodata: IBiodata;
  spousePreferenceInfoFormData: SpousePreferenceInfoFormData;
}) {
  // console.log("spousePreferenceInfoFormData", spousePreferenceInfoFormData);
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black box-border ">
      {spousePreferenceInfoFormData && (
        <>
          <CardHeader>
            <CardTitle className="text-[#004972] text-center  text-3xl font-normal">
              যেমন জীবনসঙ্গী আশা করেন
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-4 space-y-2">
            {spousePreferenceInfoFormData?.age && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">কাঙ্খিত বয়স:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {spousePreferenceInfoFormData?.age}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.skinTone && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">কাঙ্খিত গাত্রবর্ণ:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {getTitleById(
                    skinTones,
                    spousePreferenceInfoFormData?.skinTone
                  )}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.height && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">কাঙ্খিত উচ্চতা:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {getTitleById(heights, spousePreferenceInfoFormData?.height)}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.educationalQualification && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">শিক্ষাগত যোগ্যতা:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {getTitleById(
                    education,
                    spousePreferenceInfoFormData?.educationalQualification
                  )}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.qualities && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">বিশেষ শিক্ষাগত যোগ্যতা:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200 ">
                  {spousePreferenceInfoFormData?.qualities}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.address && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">ঠিকানা:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {spousePreferenceInfoFormData?.address}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.maritalStatus && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">বৈবাহিক অবস্থা:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  অবিবাহিত, ডিভোর্সড
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.specialCategory && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">
                  আপনি কোন কোন বিশেষ ক্যাটাগরিতে আগ্রহী?
                </div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  ফরেইন সিটিজেন, শর্ট ডিভোর্সড
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.religiousType && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">ধর্মীয় লাইফস্টাইল:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {getTitleById(
                    religiousLifestyle,
                    spousePreferenceInfoFormData?.religiousType
                  )}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.occupation && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">পেশা:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {getTitleById(
                    occupationsList,
                    spousePreferenceInfoFormData?.occupation
                  )}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.familyBackground && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">পরিবারের অর্থনৈতিক অবস্থা:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {getTitleById(
                    familyBackgrounds,
                    spousePreferenceInfoFormData?.familyBackground
                  )}
                </div>
              </div>
            )}
            {spousePreferenceInfoFormData?.skinTone && (
              <div className="flex items-center space-x-2">
                <div className="w-1/2">কাঙ্খিত গাত্রবর্ণ:</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  {getTitleById(
                    skinTones,
                    spousePreferenceInfoFormData?.skinTone
                  )}
                </div>
              </div>
            )}

            {/* </div>    
            <div className="w-1/2 pl-2 border-l border-gray-200">
              দেখা যেতে পারে
            </div>
          </div> */}
            {/* <div className="flex items-center space-x-2">
            <div className="w-1/2">
              মাসনা বা দ্বিতীয় বিবাহে আগ্রহী এমন পাত্রের প্রতি আগ্রহী আছেন?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              দেখা যেতে পারে
            </div>
          </div> */}
            <div className="flex items-center space-x-2">
              <div className="w-1/2">
                জীবনসঙ্গী নির্বাচনে শহর নাকি গ্রাম, কোনটিকে প্রাধান্য দিবেন?
              </div>
              <div className="w-1/2 pl-2 border-l border-gray-200">
                {spousePreferenceInfoFormData?.address}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1/2">
                {spousePreferenceInfoFormData?.qualities}
              </div>
              <div className="w-1/2 pl-2 border-l border-gray-200">
                {spousePreferenceInfoFormData?.qualities}
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
