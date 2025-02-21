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
          <div className="w-1/2">পিতার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাতার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ভাই কয়জন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বোন কয়জন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ভাইদের সম্পর্কে তথ্য:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বোনদের সম্পর্কে তথ্য:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">চাচা মামাদের সম্পর্কে তথ্য:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পরিবারের অর্থনৈতিক অবস্থা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পারিবারিক পরিবেশ এবং বৈশিষ্ট্য:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            পরিবারের সামাজিক ও অর্থনৈতিক অবস্থার বর্ণনা:
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
