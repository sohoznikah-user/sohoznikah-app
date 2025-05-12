// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/SpousePreferenceInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpousePreferenceInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          যেমন জীবনসঙ্গী আশা করেন
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">কাঙ্খিত বয়স:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">কাঙ্খিত গাত্রবর্ণ:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            উজ্জ্বল ফর্সা
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">কাঙ্খিত উচ্চতা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">৫'২"</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">শিক্ষাগত যোগ্যতা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বিশেষ শিক্ষাগত যোগ্যতা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">মুহাদ্দিসা</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বৈবাহিক অবস্থা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            অবিবাহিত, ডিভোর্সড
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনি কোন কোন বিশেষ ক্যাটাগরিতে আগ্রহী?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ফরেইন সিটিজেন, শর্ট ডিভোর্সড
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ধর্মীয় লাইফস্টাইল:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            পূর্ণ ধার্মিক/ প্র্যাক্টিসিং
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পেশা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">পরিবারের অর্থনৈতিক অবস্থা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            নিম্ন মধ্যবিত্ত
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আল্লাহ যাদেরকে গাঢ় ত্বক বা কালো বর্ণ দিয়েছেন, এরকম পাত্রীর প্রতি
            আপনি আগ্রহী?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            দেখা যেতে পারে
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">
          <div className="w-1/2">
            মাসনা বা দ্বিতীয় বিবাহে আগ্রহী এমন পাত্রের প্রতি আগ্রহী আছেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            দেখা যেতে পারে
          </div>
        </div> */}
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            জীবনসঙ্গী নির্বাচনে শহর নাকি গ্রাম, কোনটিকে প্রাধান্য দিবেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            শহরে বসবাসকারী
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলী আশা করেন:
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            পূর্ণ ধার্মিক/ প্র্যাক্টিসিং
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
