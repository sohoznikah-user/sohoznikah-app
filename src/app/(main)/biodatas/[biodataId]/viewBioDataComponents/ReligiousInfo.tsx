// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/ReligiousInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  madhhabs,
  religiousIdeologies,
  religiousLifestyle,
  yesNoOptions,
} from "@/lib/consts";
import { PrimaryInfoFormData, ReligiousInfoFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";

export default function ReligiousInfo({
  biodata,
  religiousInfoFormData,
  primaryInfoFormData,
}: {
  biodata?: IBiodata;
  religiousInfoFormData: ReligiousInfoFormData;
  primaryInfoFormData: PrimaryInfoFormData;
}) {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black max-w-full min-w-auto mx-auto">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center  text-3xl font-normal">
          ধর্মীয় লাইফস্টাইল
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনি কি আপনার জীবনকে পরিপূর্ণ ভাবে ইসলামিক বিধি-বিধান অনুযায়ী
            পরিচালনা করেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(religiousLifestyle, religiousInfoFormData?.type)}
          </div>
        </div>

        {/* Non Practicing */}
        {religiousInfoFormData?.ideology && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">ধর্মীয় কোন মতাদর্শ মেনে চলেন?</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(
                religiousIdeologies,
                religiousInfoFormData?.ideology
              )}
            </div>
          </div>
        )}

        {religiousInfoFormData?.madhab && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">কোন মাজহাব / মানহাজ অনুসরণ করেন?</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(madhhabs, religiousInfoFormData?.madhab)}
            </div>
          </div>
        )}

        {religiousInfoFormData?.praysFiveTimes && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়া হয়?</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(
                yesNoOptions,
                religiousInfoFormData?.praysFiveTimes
              )}
            </div>
          </div>
        )}

        {religiousInfoFormData?.canReciteQuranProperly && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন?</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(
                yesNoOptions,
                religiousInfoFormData?.canReciteQuranProperly
              )}
            </div>
          </div>
        )}

        {/* Try Practicing */}
        {religiousInfoFormData?.hasQazaPrayers && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">আপনার কি নামাজ কাযা হয়?</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(
                yesNoOptions,
                religiousInfoFormData?.hasQazaPrayers
              )}
            </div>
          </div>
        )}

        {religiousInfoFormData?.avoidsHaramIncome && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত আছেন কি?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(
                yesNoOptions,
                religiousInfoFormData?.avoidsHaramIncome
              )}
            </div>
          </div>
        )}

        {/* Practicing Common */}
        {religiousInfoFormData?.followsMahramRules && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">মাহরাম/গাইরে-মাহরাম মেনে চলেন কি?</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(
                yesNoOptions,
                religiousInfoFormData?.followsMahramRules
              )}
            </div>
          </div>
        )}

        {religiousInfoFormData?.modestDressing && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              {primaryInfoFormData?.biodataType === "GROOM"
                ? "টাখনুর উপরে কাপড় পরেন কিনা?"
                : "আপনি কি নিকাব সহ পর্দা করেন?"}
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {getTitleById(
                yesNoOptions,
                religiousInfoFormData?.modestDressing
              )}
            </div>
          </div>
        )}

        {religiousInfoFormData?.beliefAboutPirMurshidAndMazar && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              পীর-মুরিদ ও মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {religiousInfoFormData?.beliefAboutPirMurshidAndMazar}
            </div>
          </div>
        )}

        {religiousInfoFormData?.practicingSince && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              কত সাল/সময় থেকে পরিপূর্ণভাবে দ্বীনের পথে চলা শুরু করেছেন?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {religiousInfoFormData?.practicingSince}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
