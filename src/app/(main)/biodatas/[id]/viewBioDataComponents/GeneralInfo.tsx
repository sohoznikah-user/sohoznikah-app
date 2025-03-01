import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneralInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          সাধারণ তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">জন্ম তারিখ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            পাত্রের বায়োডাটা
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বৈবাহিক অবস্থা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">অবিবাহিত</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">গাত্রবর্ণ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            উজ্জ্বল ফর্সা
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">উচ্চতা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">৫'১"</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ওজন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">রক্তের গ্রুপ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">AB−</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">জাতীয়তা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            বাংলাদেশী, ফরেইন সিটিজেন
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
