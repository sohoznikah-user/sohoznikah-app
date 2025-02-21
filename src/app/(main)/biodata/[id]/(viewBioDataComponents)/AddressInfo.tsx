import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddressInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          ঠিকানা
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
            নিজের জন্য নিজের জন্য নিজের জন্য নিজের জন্য
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">কোথায় বেড়ে উঠেছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমানে কোথায় অবস্থান করছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            ঠিকানা বা অবস্থান সম্পর্কে বিস্তারিত কিছু লিখুন
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
      </CardContent>
    </Card>
  );
}
