// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/FamilyInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FamilyInfo() {
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
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পিতার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাতার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনারা ভাই-বোন কতজন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ভাই-বোন কে কি করেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">চাচা মামাদের পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পরিবারের ধরণ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">যৌথ পরিবার</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পরিবারের অর্থনৈতিক অবস্থা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            নিম্ন মধ্যবিত্ত
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনি সহ আপনার পরিবারের নিজস্ব বাড়িতে থাকা হয় নাকি ভাড়া বাড়িতে?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনাদের বাড়ি-ঘরের বা সম্পত্তির হাল্কা বিবরন দিন:
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পারিবারিক বিষয়ে আরো কিছু:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
      </CardContent>
    </Card>
  );
}
