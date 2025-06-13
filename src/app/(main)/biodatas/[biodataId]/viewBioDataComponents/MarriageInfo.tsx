// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/MarriageInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BiodataFormData } from "@/lib/types";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";
export default function MarriageInfo({
  biodata,
  biodataFormData,
}: {
  biodata: IBiodata;
  biodataFormData: BiodataFormData;
}) {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black max-w-full min-w-auto mx-auto">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center  text-3xl font-normal">
          বিয়ে সংক্রান্ত তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        {/* conditional for male*/}
        {biodataFormData?.marriageInfoFormData?.reasonForRemarriage && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              বিবাহিত অবস্থায় আবার বিবাহে অগ্রসর হওয়ার কারণ?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.reasonForRemarriage}
            </div>
          </div>
        )}
        {biodataFormData?.marriageInfoFormData?.currentSpouseAndChildren && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              বর্তমানে আপনার স্ত্রী এবং সন্তান সংখ্যা কত?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.currentSpouseAndChildren}
            </div>
          </div>
        )}
        {biodataFormData?.marriageInfoFormData
          ?.previousMarriageAndDivorceDetails && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              পূর্বের বিবাহ এবং ডিভোর্সের তারিখ এবং ডিভোর্সের কারণ?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {
                biodataFormData?.marriageInfoFormData
                  ?.previousMarriageAndDivorceDetails
              }
            </div>
          </div>
        )}
        {biodataFormData?.marriageInfoFormData?.spouseDeathDetails && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              {biodata?.biodataType === "GROOM" &&
                biodataFormData?.generalInfoFormData?.maritalStatus ===
                  "widowed_male" &&
                "স্ত্রী কবে, কিভাবে মারা গিয়েছিলেন এবং বিবাহিত জীবনের সময়কাল কত ছিল?"}
              {biodata?.biodataType === "BRIDE" &&
                biodataFormData?.generalInfoFormData?.maritalStatus ===
                  "widowed_female" &&
                " স্বামী কবে, কিভাবে মারা গিয়েছিলেন এবং বিবাহিত জীবনের সময়কাল কত ছিল?"}
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.spouseDeathDetails}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.childrenDetails && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              বর্তমানে আপনার সন্তান সংখ্যা কত এবং কার কাছে থাকে?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.childrenDetails}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.guardianApproval && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">অভিভাবক আপনার বিয়েতে রাজি আছেন?</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.guardianApproval}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.continueStudy && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              {biodata?.biodataType === "GROOM"
                ? "বিয়ের পর স্ত্রীকে পড়াশোনা করতে দিতে চান?"
                : "বিয়ের পর পড়াশোনা চালিয়ে যেতে চান? (ছাত্রী হলে)"}
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.continueStudy}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.careerPlan && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              {biodata?.biodataType === "GROOM"
                ? "বিয়ের পর স্ত্রী চাইলে চাকরি বা ব্যবসা করতে দিবেন?"
                : "আপনি কি বিয়ের পর চাকরি বা ব্যবসা করতে ইচ্ছুক?"}
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.careerPlan}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.residence && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              {biodata?.biodataType === "GROOM"
                ? "বিয়ের পর স্ত্রীকে নিয়ে কোথায় থাকবেন?"
                : "যৌথ বা একক পরিবারে থাকার ব্যাপারে আপনি কোনটি পছন্দ করেন?"}
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.residence}
            </div>
          </div>
        )}

        {/* Male only */}
        {biodataFormData?.marriageInfoFormData?.arrangeHijab && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              বাড়িতে বা বাহিরে স্ত্রী পর্দা করতে চাইলে পর্দার ব্যবস্থা রাখতে
              পারবেন?
            </div>

            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.arrangeHijab}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.dowryExpectation && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              {biodata?.biodataType === "GROOM"
                ? "বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক / উপহার / অর্থ আশা করবেন কিনা?"
                : "বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রপক্ষকে যৌতুক / উপহার / অর্থ দিতে ইচ্ছুক?"}
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.dowryExpectation}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.allowShowingPhotoOnline && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              পাত্রপক্ষ/পাত্রীপক্ষ অনলাইনে আপনার ছবি দেখতে চাইলে দেখাতে রাজি
              আছেন?
            </div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.allowShowingPhotoOnline}
            </div>
          </div>
        )}

        {biodataFormData?.marriageInfoFormData?.additionalMarriageInfo && (
          <div className="flex items-center space-x-2">
            <div className="w-1/2">বিয়ে সংক্রান্ত আরো কিছু:</div>
            <div className="w-1/2 pl-2 border-l border-gray-200">
              {biodataFormData?.marriageInfoFormData?.additionalMarriageInfo}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
