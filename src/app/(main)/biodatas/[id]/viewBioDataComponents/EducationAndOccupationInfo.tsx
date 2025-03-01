import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EducationAndOccupationInfo() {
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
          <div className="w-1/2 pl-2 border-l border-gray-200">জেনারেল</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ডিগ্রীর নাম(এস.এস.সি/দাখিল/সমমান):</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">এস.এস.সি</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ডিগ্রীর নাম(এইচ.এস.সি/আলিম/সমমান):</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">এইচ.এস.সি</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ডিগ্রীর নাম(ডিপ্লোমা):</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">ডিপ্লোমা</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ডিগ্রীর নাম(অনার্স/ফাজিল/সমমান):</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">অনার্স</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ডিগ্রীর নাম(মাস্টার্স/কামিল/সমমান):</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">মাস্টার্স</div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            বেসরকারি চাকরিজীবী
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পেশা নিয়ে বিস্তারিত লিখুন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            বেসরকারি চাকরিজীবী
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাসিক আয়:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">মাস্টার্স</div>
        </div>
      </CardContent>
    </Card>
  );
}
