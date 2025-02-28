"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function ReligionInfo() {
  const isMale = true;
  const [muslimType, setMuslimType] = useState<string>(null);
  const muslimTypes = [
    {
      id: "nonPracticing",
      value: `সেরকমভাবে মেনে চলা হয় না - (জেনারেল/নন-প্রাক্টিসিং) অর্থাৎ,
			১. অনিয়মিতভাবে ৫ ওয়াক্ত বা এর কম সালাত আদায় করা হয়। 
			২. সকল ক্ষেত্রে হালাল-হারাম বাছাই করা হয় না। 
			৩. মাহরাম-নন মাহরাম মেইনটেইন করা হয় না। 
			৪. হারাম উপার্জন, ব্যাংকিং সুদ, ফ্রি-মিক্সিং, গান-বাজনা থেকে বিরত থাকা হয় না।
			৫. পরিপূর্ন ভাবে ইসলামের বিধিবিধান পালনে তেমন চেষ্টা বা আগ্রহ নেই।`,
    },
    {
      id: "practicing",
      value: `পরিপূর্ণভাবে মেনে চলা হয় না কিন্তু প্রবল ইচ্ছা আছে এবং চেষ্টা করছি - (প্রাক্টিসিংয়ের চেষ্টায় আছি) অর্থাৎ,
			১. নিয়মিত ৫ ওয়াক্ত সালাত আদায় করছেন। 
			২. হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত থাকছেন। 
			৩. কিন্তু গান-বাজনা থেকে এখনো দূরে থাকা হয় না। 
			৪. সুন্নতি দাড়ি, টাখনুর উপর প্যান্ট বা পর্দা এখনো মেনে চলতে পারছেন না।
			৫. এর জন্য প্রবল অনুশোচনা কাজ করে এবং পরিপূর্ন ভাবে ইসলামের বিধিবিধান পালনের চেষ্টা করা হয়।`,
    },
    {
      id: "tryingPracticing",
      value: `জি পরিপূর্ণভাবে মেনে চলি এবং সর্বদা চেষ্টায় থাকি - (পূর্ণ ধার্মিক/ প্র্যাক্টিসিং) অর্থাৎ,
			১. বিশুদ্ধ ঈমান-আকিদা পোষণ করছেন।
			২. নিয়মিত ৫ ওয়াক্ত সালাত আদায় করছেন। 
			৩. পরিপূর্ণ হালাল উপার্জন করছেন । 
			৪. ফরজ, ওয়াজিব ইবাদতের পাশাপাশি সুন্নাত, নফল আমল করার চেষ্টা করেন।
			৫. গান-বাজনা, নাটক-সিনেমা থেকে দূরে থাকছেন। 
			৬. পুরুষেরা সুন্নতি দাড়ি, টাখনুর উপর প্যান্ট, ইসলামিক পোশাক মেনে চলেন, নারীরা নিকাব সহ পর্দা করছেন।
			৭. বাহিরে পর্দা মেনে চলা অর্থাৎ বেগানা নারী-পুরুষের ক্ষেত্রে চক্ষু অবনত রাখছেন।
			৮. মাহরাম-নন মাহরাম মেইনটেইন করেন এবং ফ্রী মিক্সিং এড়িয়ে চলেন। 
			৯. সকল প্রকার হারাম ও কবীরা গুনাহ থেকে বেঁচে থাকার সর্বাত্মক প্রচেষ্টায় থাকেন। 
			১০. ইসলাম বিরোধী সকল কাজকে অপছন্দ করেন এবং জীবনটাকে পরিপূর্ণভাবে কোরআন-সুন্নাহ মোতাবেক সাজাতে থাকেন।`,
    },
  ];

  const religiousIdeologies = ["সুন্নি", "শিয়া", "অন্যান্য", "জানা নেই"];

  const madhhabs = [
    "হানাফি",
    "সালাফি/আহলে হাদিস",
    "মালিকী",
    "হাম্বলি",
    "অন্যান্য",
    "জানা নেই",
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">ধর্মীয় লাইফস্টাইল</div>
      <div className="max-w-5xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex items-center space-y-2">
          <Label className="w-1/3 mr-3 text-md space-y-1">
            আপনি কি আপনার জীবনকে পরিপূর্ণ ভাবে ইসলামিক বিধি-বিধান অনুযায়ী
            পরিচালনা করেন?
          </Label>
          <RadioGroup
            className="w-full flex flex-wrap space-y-4 gap-0"
            value={muslimType}
            onValueChange={setMuslimType}
          >
            {muslimTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id} className="space-y-1">
                  {type.value.split("\n").map((line, index) => (
                    <div key={index} className={index > 0 ? "text-xs" : "pb-1"}>
                      {line}
                    </div>
                  ))}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center space-y-2">
          <Label className="w-1/3 mr-3 text-md space-y-1" htmlFor="biodataType">
            ধর্মীয় কোন মতাদর্শ মেনে চলেন?
          </Label>
          <RadioGroup className="w-full flex flex-wrap mb-2 gap-0">
            {religiousIdeologies.map((x) => (
              <div key={x} className="w-1/4 flex items-center space-x-2">
                <RadioGroupItem value={x} id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center space-y-2">
          <Label className="w-1/3 mr-3 text-md space-y-1" htmlFor="biodataType">
            কোন মাজহাব / মানহাজ অনুসরণ করেন?
          </Label>
          <RadioGroup className="w-full flex flex-wrap mb-2 gap-0">
            {madhhabs.map((x) => (
              <div key={x} className="w-1/4 flex items-center space-x-2">
                <RadioGroupItem value={x} id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়া হয়?
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
            শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>

        {["tryingPracticing", "practicing"].includes(muslimType) && (
          <>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                আপনার কি নামাজ কাযা হয়?
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
                হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত আছেন কি?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
          </>
        )}
        {muslimType === "practicing" && (
          <>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                মাহরাম/গাইরে-মাহরাম মেনে চলেন কি?
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
                পীর-মুরিদ ও মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?
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
                কত সাল/সময় থেকে পরিপূর্ণভাবে দ্বীনের পথে চলা শুরু করেছেন?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
          </>
        )}
        {muslimType === "practicing" && isMale && (
          <>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                টাখনুর উপরে কাপড় পরেন কিনা?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
          </>
        )}
        {muslimType === "practicing" && !isMale && (
          <>
            <div className="flex items-center space-y-2">
              <Label
                className="w-1/3 mr-3 text-md space-y-1"
                htmlFor="emailMobileNumber"
              >
                আপনি কি নিকাব সহ পর্দা করেন?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
          </>
        )}
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
