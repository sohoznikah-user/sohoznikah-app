"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function BiodatasPageSidebar() {
  const [range, setRange] = useState<[number, number]>([18, 80]);

  return (
    <div className="w-72 bg-white p-4 space-y-2">
      <div className="flex mb-4">
        <button className="text-sm text-white px-4 py-3 rounded-md w-1/2 border border-[#016ca7] bg-gradient-to-r from-[#e25a6f] to-[#016ca7]">
          আমি খুঁজছি
        </button>
        <button className="text-sm text-[#989898] px-4 py-3 rounded-md w-1/2 border border-[#989898]">
          আমাকে খুঁজছে
        </button>
      </div>
      <form className="flex flex-col space-y-2">
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            বায়োডাটার ধরন
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="বায়োডাটার ধরন" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                বায়োডাটার ধরন
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            বৈবাহিক অবস্থা
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="বৈবাহিক অবস্থা" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                বৈবাহিক অবস্থা
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            বয়স
          </Label>
          <div className="flex">
            <div className="text-[#1f4f69]">{range[0]}</div>
            <Slider
              value={range}
              onValueChange={setRange}
              min={18}
              max={80}
              step={1}
              className="w-full"
            />
            <div className="text-[#1f4f69]">{range[1]}</div>
          </div>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            উচ্চতা
          </Label>
          <div className="flex">
            <div className="text-[#1f4f69]">{range[0]}</div>
            <Slider
              value={range}
              onValueChange={setRange}
              min={18}
              max={80}
              step={1}
              className="w-full"
            />
            <div className="text-[#1f4f69]">{range[1]}</div>
          </div>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            গাত্রবর্ণ
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="গাত্রবর্ণ" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                গাত্রবর্ণ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            স্থায়ী ঠিকানা
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="স্থায়ী ঠিকানা" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                স্থায়ী ঠিকানা
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            বর্তমান ঠিকানা
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="বর্তমান ঠিকানা" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                বর্তমান ঠিকানা
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            শিক্ষা মাইগ্রেশন
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="শিক্ষা মাইগ্রেশন" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                শিক্ষা মাইগ্রেশন
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            পেশা
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="পেশা" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                পেশা
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            শিক্ষা
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="শিক্ষা" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                শিক্ষা
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            পরিবারের আর্থসামাজিক অবস্থা
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="পরিবারের আর্থসামাজিক অবস্থা" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                পরিবারের আর্থসামাজিক অবস্থা
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            মাজহাব/মাসলাহ
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="মাজহাব/মাসলাহ" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                মাজহাব/মাসলাহ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            রক্তের গ্রুপ
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="রক্তের গ্রুপ" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                রক্তের গ্রুপ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            className="block font-medium text-[#1f4f69]"
            htmlFor="religious"
          >
            বিশেষ অবস্থা
          </Label>
          <Select>
            <SelectTrigger className="text-[#1f4f69]">
              <SelectValue placeholder="বিশেষ অবস্থা" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1f4f69]">
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="all"
              >
                সকল বায়োডাটা
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="male"
              >
                পুরুষ
              </SelectItem>
              <SelectItem
                className="focus:bg-[#E25A6F] focus:text-white"
                value="female"
              >
                নারী
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
}
