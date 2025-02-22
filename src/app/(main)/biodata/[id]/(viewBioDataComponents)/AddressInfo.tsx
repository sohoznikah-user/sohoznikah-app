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
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী জেলা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী উপজেলা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী বাড়ির ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী দেশ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ফরেইন সিটিজেনশিপ
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী স্টেট(যদি থাকে):</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ফরেইন সিটিজেনশিপ
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী শহর:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ফরেইন সিটিজেনশিপ
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান জেলা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান উপজেলা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান বাড়ির ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">বাংলাদেশ</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান দেশ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ফরেইন সিটিজেনশিপ
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান স্টেট(যদি থাকে):</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ফরেইন সিটিজেনশিপ
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান শহর:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ফরেইন সিটিজেনশিপ
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">কোথায় বেড়ে উঠেছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
      </CardContent>
    </Card>
  );
}
