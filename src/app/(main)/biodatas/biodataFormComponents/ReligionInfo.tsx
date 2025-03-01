"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function ReligionInfo() {
  const isMale = true;
  const [muslimType, setMuslimType] = useState<string>(null);

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
      {muslimType}
      <div className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            <div>
              আপনি কি আপনার জীবনকে পরিপূর্ণ ভাবে ইসলামিক বিধি-বিধান অনুযায়ী
              পরিচালনা করেন?
            </div>
            <div className="text-xs text-[#A30000]">
              প্রতিটি অপশনের বিস্তারিত ব্যাখ্যা পড়ে উত্তর দিন।
            </div>
          </Label>
          <RadioGroup
            className="flex"
            value={muslimType}
            onValueChange={setMuslimType}
          >
            <div className="border border-gray-300 p-4 rounded-3xl space-y-6">
              <div className="min-h-32 border border-gray-300 bg-[#f6f6f6] p-4 rounded-xl space-x-2 flex items-center justify-center">
                <RadioGroupItem value="nonPracticing" />
                <Label className="leading-5 space-y-2">
                  <div className="text-black leading-5">
                    সেরকমভাবে মেনে চলা হয় না
                  </div>
                  <div>(জেনারেল/নন-প্রাক্টিসিং)</div>
                </Label>
              </div>
              <Label className="text-xs leading-4 space-y-2 text-[#A30000]">
                <div>অর্থাৎ,</div>
                <div>১. অনিয়মিতভাবে ৫ ওয়াক্ত বা এর কম সালাত আদায় করা হয়।</div>
                <div>২. সকল ক্ষেত্রে হালাল-হারাম বাছাই করা হয় না।</div>
                <div>৩. মাহরাম-নন মাহরাম মেইনটেইন করা হয় না।</div>
                <div>
                  ৪. হারাম উপার্জন, ব্যাংকিং সুদ, ফ্রি-মিক্সিং, গান-বাজনা থেকে
                  বিরত থাকা হয় না।
                </div>
                <div>
                  ৫. পরিপূর্ন ভাবে ইসলামের বিধিবিধান পালনে তেমন চেষ্টা বা আগ্রহ
                  নেই।
                </div>
              </Label>
            </div>
            <div className="border border-gray-300 p-4 rounded-3xl space-y-6">
              <div className="min-h-32 border border-gray-300 bg-[#f6f6f6] p-4 rounded-xl space-x-2 flex items-center justify-center">
                <RadioGroupItem value="tryingPracticing" />
                <Label className="leading-5 space-y-2">
                  <div className="text-black">
                    পরিপূর্ণভাবে মেনে চলা হয় না কিন্তু প্রবল ইচ্ছা আছে এবং
                    চেষ্টা করছি
                  </div>
                  <div>(প্রাক্টিসিংয়ের চেষ্টায় আছি)</div>
                </Label>
              </div>
              <Label className="text-xs leading-4 space-y-2 text-[#A30000]">
                <div>অর্থাৎ,</div>
                <div>১. নিয়মিত ৫ ওয়াক্ত সালাত আদায় করছেন।</div>
                <div>২. হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত থাকছেন।</div>
                <div>৩. কিন্তু গান-বাজনা থেকে এখনো দূরে থাকা হয় না।</div>
                <div>
                  ৪. সুন্নতি দাড়ি, টাখনুর উপর প্যান্ট বা পর্দা এখনো মেনে চলতে
                  পারছেন না।
                </div>
                <div>
                  ৫. এর জন্য প্রবল অনুশোচনা কাজ করে এবং পরিপূর্ন ভাবে ইসলামের
                  বিধিবিধান পালনের চেষ্টা করা হয়।
                </div>
              </Label>
            </div>
            <div className="border border-gray-300 p-4 rounded-3xl space-y-6">
              <div className="min-h-32 border border-gray-300 bg-[#f6f6f6] p-4 rounded-xl space-x-2 flex items-center justify-center">
                <RadioGroupItem value="fullPracticing" />
                <Label className="leading-5 space-y-2">
                  <div className="text-black leading-5">
                    জি পরিপূর্ণভাবে মেনে চলি এবং সর্বদা চেষ্টায় থাকি
                  </div>
                  <div>(পূর্ণ ধার্মিক/ প্র্যাক্টিসিং)</div>
                </Label>
              </div>
              <Label className="text-xs leading-4 space-y-2 text-[#A30000]">
                <div>অর্থাৎ,</div>
                <div>১. বিশুদ্ধ ঈমান-আকিদা পোষণ করছেন।</div>
                <div>২. নিয়মিত ৫ ওয়াক্ত সালাত আদায় করছেন।</div>
                <div>৩. পরিপূর্ণ হালাল উপার্জন করছেন ।</div>
                <div>
                  ৪. ফরজ, ওয়াজিব ইবাদতের পাশাপাশি সুন্নাত, নফল আমল করার চেষ্টা
                  করেন।
                </div>
                <div>৫. গান-বাজনা, নাটক-সিনেমা থেকে দূরে থাকছেন।</div>
                <div>
                  ৬. পুরুষেরা সুন্নতি দাড়ি, টাখনুর উপর প্যান্ট, ইসলামিক পোশাক
                  মেনে চলেন, নারীরা নিকাব সহ পর্দা করছেন।
                </div>
                <div>
                  ৭. বাহিরে পর্দা মেনে চলা অর্থাৎ বেগানা নারী-পুরুষের ক্ষেত্রে
                  চক্ষু অবনত রাখছেন।
                </div>
                <div>
                  ৮. মাহরাম-নন মাহরাম মেইনটেইন করেন এবং ফ্রী মিক্সিং এড়িয়ে চলেন।
                </div>
                <div>
                  ৯. সকল প্রকার হারাম ও কবীরা গুনাহ থেকে বেঁচে থাকার সর্বাত্মক
                  প্রচেষ্টায় থাকেন।
                </div>
                <div>
                  ১০. ইসলাম বিরোধী সকল কাজকে অপছন্দ করেন এবং জীবনটাকে
                  পরিপূর্ণভাবে কোরআন-সুন্নাহ মোতাবেক সাজাতে থাকেন।
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="biodataType">
            ধর্মীয় কোন মতাদর্শ মেনে চলেন?
          </Label>
          <RadioGroup className="w-full flex flex-wrap gap-0">
            {religiousIdeologies.map((x) => (
              <div key={x} className="w-1/4 flex items-center space-x-2 mb-2">
                <RadioGroupItem value={x} id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="biodataType">
            কোন মাজহাব / মানহাজ অনুসরণ করেন?
          </Label>
          <RadioGroup className="w-full flex flex-wrap gap-0">
            {madhhabs.map((x) => (
              <div key={x} className="w-1/4 flex items-center space-x-2 mb-2">
                <RadioGroupItem value={x} id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়া হয়?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        {["tryingPracticing", "fullPracticing"].includes(muslimType) && (
          <div className="flex flex-col space-y-4">
            <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
              আপনার কি নামাজ কাযা হয়?
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
            শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন?
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>

        {["tryingPracticing", "fullPracticing"].includes(muslimType) && (
          <>
            <div className="flex flex-col space-y-4">
              <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
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
        {muslimType === "fullPracticing" && isMale && (
          <>
            <div className="flex flex-col space-y-4">
              <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
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
        {muslimType === "fullPracticing" && !isMale && (
          <>
            <div className="flex flex-col space-y-4">
              <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
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
        {muslimType === "fullPracticing" && (
          <>
            <div className="flex flex-col space-y-4">
              <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
                মাহরাম/গাইরে-মাহরাম মেনে চলেন কি?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
                পীর-মুরিদ ও মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?
              </Label>
              <Input
                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                id="emailMobileNumber"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
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
      </div>
      <div className="max-w-4xl w-full space-x-2">
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
