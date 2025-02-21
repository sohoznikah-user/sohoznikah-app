import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OccupationInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          পেশা
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পেশা সম্পর্কে বিস্তারিত লিখুন:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাসিক আয়:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
      </CardContent>
    </Card>
  );
}
