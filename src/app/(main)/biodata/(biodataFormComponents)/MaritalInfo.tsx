import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MaritalInfo() {
  const isMale = true;
  const afterMarriageJobMaleOptions = [
    "না, আমি একদমই চাই না",
    "হ্যা, অবশ্যই করতে পারবে",
    "ইচ্ছা নাই, তবে করতে চাইলে করতে পারবে",
    "পরিপূর্ণ পর্দা মেনে করতে পারলে ঠিক আছে",
    "বাসায় থেকে কিছু করতে চাইলে করবে",
    "খুব প্রয়োজন হলে বিবেচনা করা হবে",
    "সমাজসেবা/দ্বীনের খেদমত করতে চাইলে করতে পারবে",
  ];
  const afterMarriageJobFemaleOptions = [
    "না, একদমই ইচ্ছা নেই",
    "চাকরি করতে ইচ্ছুক (আলোচনা/অনুমতি সাপেক্ষে)",
    "ব্যবসা করতে ইচ্ছুক (আলোচনা/অনুমতি সাপেক্ষে)",
    "ঘরে বসে/অনলাইনে কিছু করতে ইচ্ছুক",
    "সমাজসেবা/দ্বীনের খেদমত করতে ইচ্ছুক (অনলাইনে/অফলাইনে)",
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">বিয়ে সংক্রান্ত তথ্য</div>
      <div className="max-w-5xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            <div>অভিভাবক আপনার বিয়েতে রাজি আছেন?</div>
            <div className="text-xs">
              (যদি অভিভাবক রাজি নাও থাকে তাহলে এর কারণ লিখুন এবং সেক্ষেত্রে আপনি
              কেন বিবাহে আগাচ্ছেন সেটা বিস্তারিত লিখুন।)
            </div>
          </Label>
          <Textarea
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
          />
        </div>
        {isMale && (
          <>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                বিয়ের পর স্ত্রীকে পড়াশোনা করতে দিতে চান?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                বিয়ের পর স্ত্রী চাইলে চাকরি বা ব্যবসা করতে দিবেন?
              </Label>
              <div className="w-full flex flex-wrap">
                {afterMarriageJobMaleOptions.map((x) => (
                  <div
                    key={x}
                    className="w-1/2 flex items-center space-x-2 mb-4"
                  >
                    <Checkbox id={x} />
                    <Label htmlFor={x}>{x}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                বিয়ের পর স্ত্রীকে নিয়ে কোথায় থাকবেন?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                বাড়িতে বা বাহিরে স্ত্রী পর্দা করতে চাইলে পর্দার ব্যবস্থা রাখতে
                পারবেন?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক বা
                উপহার বা অর্থ আশা করবেন কিনা?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
          </>
        )}
        {!isMale && (
          <>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                বিয়ের পর পড়াশোনা চালিয়ে যেতে চান? (ছাত্রী হলে)
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                আপনি কি বিয়ের পর চাকরি বা ব্যবসা করতে ইচ্ছুক?
              </Label>
              <div className="w-full flex flex-wrap">
                {afterMarriageJobFemaleOptions.map((x) => (
                  <div
                    key={x}
                    className="w-1/2 flex items-center space-x-2 mb-4"
                  >
                    <Checkbox id={x} />
                    <Label htmlFor={x}>{x}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                যৌথ বা একক পরিবারে থাকার ব্যাপারে আপনি কোনটি পছন্দ করেন?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
          </>
        )}
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            {isMale ? "পাত্রীপক্ষ" : "পাত্রপক্ষ"} অনলাইনে আপনার ছবি দেখতে চাইলে
            দেখাতে রাজি আছেন?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            <div>
              বিয়ে সংক্রান্ত আরো কিছু জানাতে চাইলে এখানে লিখুন: অন্যথায় খালি
              রাখুন।
            </div>
            <div className="text-xs">
              (যেমন: পাত্র-পাত্রী সাক্ষাতের ব্যাপারে, অভিভাবকদের মতামত নিয়ে,
              কেমন বিয়ে চান, বিয়ের পর কোন কোন বিষয় ছাড় দিতে রাজি নন ইত্যাদি কিছু
              জানানোর থাকলে লিখুন।)
            </div>
          </Label>
          <Textarea
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
          />
        </div>
      </div>
      <div className="max-w-5xl w-ful space-x-2">
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Previous
        </Button>
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Next
        </Button>
      </div>
    </div>
  );
}
