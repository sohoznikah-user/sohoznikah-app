import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PersonalInfo() {
  const isMale = true;
  const characteristics = [
    "ইন্ট্রোভার্ট",
    "এক্সট্রোভার্ট",
    "সাংসারিক",
    "মিশুক",
    "শান্ত-শিষ্ট",
    "ধৈর্যশীল",
    "ভালবাসাপ্রবণ",
    "সাপোর্টিভ",
    "সচেতন",
    "ইমোশনাল",
    "দয়ালু",
    "দানশীল",
    "সংস্কৃতিমনা",
    "ধার্মিক",
    "যত্নশীল",
    "দায়িত্ববান",
    "প্রতিবাদী",
    "রাগী",
    "অস্থির",
    "একগুঁয়ে",
    "খুঁতখুঁতে",
  ];
  let specialCatagories = [
    "আমি একজন সমাজ সেবক",
    "আমি দ্বীনের খেদমতে আছি",
    "আমি একজন নওমুসলিম",
    "আমি প্রতিবন্ধী",
    "আমি প্রতিবন্ধী",
    "আমি এতিম",
    "আমি বন্ধ্যাত্ব সমস্যায় ভুগছি",
    "আমি শর্ট ডিভোর্সি",
    "আমি স্বল্প উচ্চতার মানুষ আলহামদুলিল্লাহ",
    "আমি শহরে বসবাসকারী",
    "আমি গ্রামে বসবাসকারী",
  ];

  if (isMale) {
    specialCatagories = [
      ...specialCatagories,
      "আমি তাবলীগ এর সাথে যুক্ত",
      "আমি সিঙ্গেল ফাদার-সন্তান আছে কিন্তু মা নেই বা দায়িত্বে নেই",
    ];
  } else {
    specialCatagories = [
      ...specialCatagories,
      "আমি সিঙ্গেল মাদার-সন্তান আছে কিন্তু বাবা নেই বা দায়িত্বে নেই",
    ];
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">ব্যক্তিগত তথ্য</div>
      <div className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
        {isMale && (
          <div className="flex flex-col space-y-4">
            <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
              আপনি দাড়ি রেখেছেন কি?
            </Label>
            <Textarea
              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
              id="emailMobileNumber"
            />
          </div>
        )}
        {!isMale && (
          <div className="flex flex-col space-y-4">
            <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
              আপনার কি দাড়ি পছন্দ?
            </Label>
            <Input
              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
              id="emailMobileNumber"
              type="text"
            />
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            বাড়ির বাহিরে সাধারণত কী ধরণের পোশাক পড়তে পছন্দ করেন?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            নাটক/সিনেমা/সিরিয়াল/গান/খেলা এসবের কোনটি দেখেন বা শুনেন?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            মানসিক বা শারীরিক কোনো রোগ আছে কি? থাকলে বিস্তারিত লিখুন।
          </Label>
          <Textarea
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            নিজের কিছু গুণাবলী চিহ্নিত করুন:
          </Label>
          <div className="w-full flex flex-wrap">
            {characteristics.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            নারী-পুরুষ সমঅধীকার বিষয়টাকে আপনি কিভাবে দেখেন?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            সমকামিতা বা LGBTQ সম্পর্কে আপনার ধারণা কি?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            আপনার ক্ষেত্রে প্রযোজ্য এমন বিশেষ কোনো অবস্থা বা কার্যক্রম:
          </Label>
          <div className="w-full flex flex-wrap">
            {specialCatagories.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label className="leading-5" htmlFor={x}>
                  {x}
                </Label>
              </div>
            ))}
          </div>
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
