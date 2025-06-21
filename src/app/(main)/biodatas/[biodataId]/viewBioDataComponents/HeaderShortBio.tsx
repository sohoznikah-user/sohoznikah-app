// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/HeaderShortBio.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  bloodGroups,
  degreeTypes,
  familyBackgrounds,
  heights,
  maritalStatuses,
  nationalities,
  occupationsList,
  religiousLifestyle,
  skinTones,
  weights,
} from "@/lib/consts";
import { BiodataFormData } from "@/lib/types";
import { getDistrictTitle, getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";
import { format } from "date-fns";

export default function HeaderShortBio({
  biodata,
  biodataFormData,
}: {
  biodata: IBiodata;
  biodataFormData: BiodataFormData;
}) {
  const {
    primaryInfoFormData,
    generalInfoFormData,
    educationInfoFormData,
    occupationInfoFormData,
    addressInfoFormData,
    familyInfoFormData,
    religiousInfoFormData,
  } = biodataFormData as BiodataFormData;

  const bangladeshAddress = addressInfoFormData?.addresses?.find(
    (addr) => addr.location === "bangladesh"
  );
  // console.log("biodataFormData", biodata?.biodataFormData);

  return (
    <Card className=" bg-white text-black border-none rounded-4xl lg:max-w-[450px] w-full min-w-auto">
      <CardHeader className="flex items-center">
        <div className="text-lg text-white bg-[#016ca7] p-4 rounded-xl">
          {`${primaryInfoFormData?.biodataType === "BRIDE" ? "পাত্রীর" : "পাত্রের"} `}
          সংক্ষিপ্ত বিবরণ
        </div>
      </CardHeader>
      <CardContent className="lg:px-10 md:px-7 px-5">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>বৈবাহিক অবস্থা</div>
            <div>
              {getTitleById(
                maritalStatuses,
                generalInfoFormData?.maritalStatus
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>জন্মসন</div>
            <div>
              {generalInfoFormData?.dateOfBirth
                ? format(new Date(generalInfoFormData?.dateOfBirth), "yyyy")
                : "--"}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>উচ্চতা</div>
            <div>{getTitleById(heights, generalInfoFormData?.height)}</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>গাত্রবর্ণ</div>
            <div>{getTitleById(skinTones, generalInfoFormData?.skinTone)}</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>শিক্ষা</div>
            <div>
              {getTitleById(degreeTypes, educationInfoFormData?.highestDegree)}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div className="mr-5">পেশা</div>
            <p className="text-end">
              {getTitleById(
                occupationsList,
                occupationInfoFormData?.occupations
              )}
            </p>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>জেলা</div>
            <div>{getDistrictTitle(bangladeshAddress?.state)}</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>ওজন</div>
            <div>{getTitleById(weights, generalInfoFormData?.weight)}</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>রক্তের গ্রুপ</div>
            <div>
              {getTitleById(bloodGroups, generalInfoFormData?.bloodGroup)}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>পরিবার</div>
            <div>
              {getTitleById(
                familyBackgrounds,
                familyInfoFormData?.familyBackground
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>জাতীয়তা</div>
            <div>
              {getTitleById(nationalities, generalInfoFormData?.nationality)}
            </div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-100">
            <div>ধর্মীয় লাইফস্টাইল</div>
            <div>
              {getTitleById(religiousLifestyle, religiousInfoFormData?.type)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
