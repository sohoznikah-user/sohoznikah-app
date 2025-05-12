// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/MarriageInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarriageInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          বিয়ে সংক্রান্ত তথ্য
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">অভিভাবক আপনার বিয়েতে রাজি আছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          {/* <div className="w-1/2">বিয়ের পর স্ত্রীকে পড়াশোনা করতে দিতে চান?</div> */}
          <div className="w-1/2">
            বিয়ের পর পড়াশোনা চালিয়ে যেতে চান? (ছাত্রী হলে)
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ইচ্ছা নাই, তবে করতে চাইলে করতে পারবে
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* <div className="w-1/2">
            বিয়ের পর স্ত্রী চাইলে চাকরি বা ব্যবসা করতে দিবেন?
          </div> */}
          <div className="w-1/2">
            আপনি কি বিয়ের পর চাকরি বা ব্যবসা করতে ইচ্ছুক?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            ইচ্ছা নাই, তবে করতে চাইলে করতে পারবে
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* <div className="w-1/2">বিয়ের পর স্ত্রীকে নিয়ে কোথায় থাকবেন?</div> */}
          <div className="w-1/2">
            যৌথ বা একক পরিবারে থাকার ব্যাপারে আপনি কোনটি পছন্দ করেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Male only */}
          <div className="w-1/2">
            বাড়িতে বা বাহিরে স্ত্রী পর্দা করতে চাইলে পর্দার ব্যবস্থা রাখতে
            পারবেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক বা উপহার
            বা অর্থ আশা করবেন কিনা?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            পাত্রপক্ষ/পাত্রীপক্ষ অনলাইনে আপনার ছবি দেখতে চাইলে দেখাতে রাজি আছেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বিয়ে সংক্রান্ত আরো কিছু:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            নিম্ন মধ্যবিত্ত
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
