// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/HeaderSpousePreferenceRequierment.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  degreeTypes,
  familyBackgrounds,
  heights,
  maritalStatuses,
  occupationsList,
  religiousLifestyle,
  skinTones,
} from "@/lib/consts";
import { BiodataFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";

export default function HeaderSpousePreferenceRequierment({
  biodata,
  biodataFormData,
}: {
  biodata: any;
  biodataFormData: BiodataFormData;
}) {
  const { spousePreferenceInfoFormData } = biodataFormData;

  // console.log("biodataFormData", biodata?.biodataFormData);

  return (
    <Card className="w-1/2 bg-white text-black border-none rounded-4xl">
      <CardHeader className="flex items-center">
        <div className="text-lg text-white bg-[#016ca7] p-4 rounded-xl">
          যেমন জীবনসঙ্গী আশা করেন
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>বৈবাহিক অবস্থা</div>
            <div>
              {getTitleById(
                maritalStatuses,
                spousePreferenceInfoFormData?.maritalStatus
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>বয়স</div>
            <div>{spousePreferenceInfoFormData?.age}</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>উচ্চতা</div>
            <div>
              {getTitleById(heights, spousePreferenceInfoFormData?.height)}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>গাত্রবর্ণ</div>
            <div>
              {getTitleById(skinTones, spousePreferenceInfoFormData?.skinTone)}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>শিক্ষা</div>
            <div>
              {getTitleById(
                degreeTypes,
                spousePreferenceInfoFormData?.educationalQualification
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>পেশা</div>
            <div>
              {getTitleById(
                occupationsList,
                spousePreferenceInfoFormData?.occupation
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>জেলা</div>
            <div>{spousePreferenceInfoFormData?.address}</div>
          </div>

          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>পরিবার</div>
            <div>
              {getTitleById(
                familyBackgrounds,
                spousePreferenceInfoFormData?.familyBackground
              )}
            </div>
          </div>

          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>ধর্মীয় লাইফস্টাইল</div>
            <div>
              {getTitleById(
                religiousLifestyle,
                spousePreferenceInfoFormData?.religiousType
              )}
            </div>
          </div>
          {spousePreferenceInfoFormData?.qualities && (
            <div className="flex flex-col justify-start items-stretch text-sm pb-2 border-b border-gray-200 gap-2">
              <div className="">জীবনসঙ্গী সম্পর্কে</div>
              <p className="text-justify">
                {spousePreferenceInfoFormData?.qualities.slice(0, 120)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
