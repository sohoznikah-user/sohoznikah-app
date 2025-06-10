// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/PersonalInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { characteristics, specialCatagories } from "@/lib/consts";
import { PersonalInfoFormData } from "@/lib/types";
import { getTitleById } from "@/utils/getBanglaTitle";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";

export default function PersonalInfo({
  biodata,
  personalInfoFormData,
}: {
  biodata?: IBiodata;
  personalInfoFormData: PersonalInfoFormData;
}) {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center  text-3xl font-normal">
          ব্যক্তিগত তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার কি দাড়ি পছন্দ?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {personalInfoFormData?.beardStatus}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            বাড়ির বাহিরে সাধারণত কী ধরণের পোশাক পরতে পছন্দ করেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {personalInfoFormData?.preferredOutfit}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            নাটক/সিনেমা/সিরিয়াল/গান/খেলা এসবের কোনটি দেখেন বা শুনেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {personalInfoFormData?.entertainmentPreferences}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মানসিক বা শারীরিক কোনো রোগ আছে কি?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {personalInfoFormData?.healthConditions}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">নিজের কিছু গুণাবলী চিহ্নিত করুন</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(
              characteristics,
              personalInfoFormData?.personalTraits
            )}
          </div>
        </div>

        {personalInfoFormData?.genderEqualityView && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              নারী-পুরুষ সমঅধীকার বিষয়টাকে আপনি কিভাবে দেখেন?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {personalInfoFormData?.genderEqualityView}
            </div>
          </div>
        )}

        {personalInfoFormData?.lgbtqOpinion && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              সমকামিতা বা LGBTQ সম্পর্কে আপনার ধারণা কি?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {personalInfoFormData?.lgbtqOpinion}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনার ক্ষেত্রে প্রযোজ্য এমন বিশেষ কোনো অবস্থা বা কার্যক্রম:
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {getTitleById(
              specialCatagories,
              personalInfoFormData?.specialConditions
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">নিজের মতো করে নিজের সম্পর্কে কিছু লিখুন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {personalInfoFormData?.aboutYourself}
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">
          <div className="w-1/2">
            রাজনীতি নিয়ে আপনার দৃষ্টিভঙ্গি কি? এর সাথে যুক্ত থাকলে বিস্তারিত
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">অবসর সময়ে কি করতে পছন্দ করেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">সামাজিক বা ধর্মীয় কোনো কাজে যুক্ত আছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনার পছন্দের কিছু বইয়ের নাম (যদি পড়ে থাকেন)
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">দৈনন্দিন খাবারে কি কি পছন্দ এবং অপছন্দ?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনার পছন্দের কয়েকজন ব্যক্তিত্বের নাম যাদেরকে নিয়মিত ফলো করেন
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার জীবনের লক্ষ্য কি?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">কোন কোন সোসাল মিডিয়া ব্যবহার করেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার আগ্রহ ও শখ কি কি?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div> */}
      </CardContent>
    </Card>
  );
}
