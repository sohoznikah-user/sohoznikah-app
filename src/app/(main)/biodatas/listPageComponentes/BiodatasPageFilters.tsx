"use client";

import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function BiodatasPageFilters() {
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 80]);
  const [heightRange, setHeightRange] = useState<[number, number]>([36, 84]);

  return (
    <div className="w-72 bg-white ml-4 px-4 space-y-2">
      <div className="flex items-center justify-center text-center text-[#1f4f69] pb-2">
        <div className="pb-1 border-b border-[#1f4f69]">ফিল্টার করুন</div>
      </div>
      <div className="flex justify-center mb-4">
        <button className="mr-[-1rem] rounded-xl py-3 text-white px-4 z-10 bg-gradient-to-r from-[#e25a6f] to-[#016ca7]">
          আমি খুঁজছি
        </button>
        <button className="py-3 rounded-xl text-[#989898] pr-4 pl-6 border border-[#989898]">
          আমাকে খুঁজছে
        </button>
        {/* <button className="mr-[-1rem] rounded-xl py-3 text-[#989898] pl-4 pr-6 border border-[#989898]">
          আমি খুঁজছি
        </button>
        <button className="py-3 rounded-xl text-white px-4 z-10 bg-gradient-to-r from-[#e25a6f] to-[#016ca7]">
          আমাকে খুঁজছে
        </button> */}
      </div>
      <form className="flex flex-col space-y-2">
        <Accordion type="multiple" className="flex flex-col space-y-2 mb-2">
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="বায়োডাটার ধরন"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              বায়োডাটার ধরন
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="বৈবাহিক অবস্থা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              বৈবাহিক অবস্থা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="বয়স"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              বয়স
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex">
                <div className="text-[#1f4f69]">{ageRange[0]}</div>
                <Slider
                  value={ageRange}
                  onValueChange={setAgeRange}
                  min={18}
                  max={80}
                  step={1}
                  className="w-full"
                />
                <div className="text-[#1f4f69]">{ageRange[1]}</div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="উচ্চতা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              উচ্চতা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex">
                <div className="text-[#1f4f69]">{heightRange[0]}</div>
                <Slider
                  value={heightRange}
                  onValueChange={setHeightRange}
                  min={18}
                  max={80}
                  step={1}
                  className="w-full"
                />
                <div className="text-[#1f4f69]">{heightRange[1]}</div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="গাত্রবর্ণ"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              গাত্রবর্ণ
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="স্থায়ী ঠিকানা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              স্থায়ী ঠিকানা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="বর্তমান ঠিকানা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              বর্তমান ঠিকানা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="শিক্ষা মাইগ্রেশন"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              শিক্ষা মাইগ্রেশন
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="পেশা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              পেশা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="শিক্ষা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              শিক্ষা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="পরিবারের আর্থসামাজিক অবস্থা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              পরিবারের আর্থসামাজিক অবস্থা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="মাজহাব/মাসলাহ"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              মাজহাব/মাসলাহ
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="রক্তের গ্রুপ"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              রক্তের গ্রুপ
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border border-gray-300 rounded-xl px-4"
            value="বিশেষ অবস্থা"
          >
            <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
              বিশেষ অবস্থা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="male" />
                <Label htmlFor="male">পুরুষ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="female" />
                <Label htmlFor="female">নারী</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </div>
  );
}
