// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/PrimaryInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrimaryInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          প্রাথমিক তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বায়োডাটার ধরন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            পাত্রের বায়োডাটা
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বায়োডাটা কার জন্য তৈরী করছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পাত্র/পাত্রীর সম্পূর্ণ নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পিতার নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাতার নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
      </CardContent>
    </Card>
  );
}
