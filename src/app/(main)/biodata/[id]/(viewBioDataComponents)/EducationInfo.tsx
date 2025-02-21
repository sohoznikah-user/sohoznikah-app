import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EducationInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          শিক্ষাগত যোগ্যতা
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ডিগ্রির নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বিভাগ/বিষয়:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পাশের সন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">শিক্ষাপ্রতিষ্ঠানের নাম:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            বিশেষ দ্বীনি বা দুনিয়াবি যোগ্যতা (যদি থাকে):
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
      </CardContent>
    </Card>
  );
}
