"use client";

import { MouseEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HomeSearchBiodata() {
  const router = useRouter();
  const [range, setRange] = useState<[number, number]>([18, 80]);

  const handleSearchClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/biodatas");
  };

  return (
    <form className="bg-white p-8 shadow-lg flex flex-wrap">
      <div className="w-1/3 space-y-2 p-2">
        <Label
          className="block font-medium text-[#1f4f69] text-center"
          htmlFor="biodataType"
        >
          আমি খুঁজছি
        </Label>
        <Select>
          <SelectTrigger className="w-full border rounded-md focus:ring-2 focus:ring-blue-400">
            <SelectValue placeholder="আমি খুঁজছি" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল বায়োডাটা</SelectItem>
            <SelectItem value="male">পুরুষ</SelectItem>
            <SelectItem value="female">নারী</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/3 space-y-2 p-2">
        <Label
          className="block font-medium text-[#1f4f69] text-center"
          htmlFor="maritalStatus"
        >
          বৈবাহিক অবস্থা
        </Label>
        <Select>
          <SelectTrigger className="w-full border rounded-md focus:ring-2 focus:ring-blue-400">
            <SelectValue placeholder="বৈবাহিক অবস্থা" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল অবস্থা</SelectItem>
            <SelectItem value="male">পুরুষ</SelectItem>
            <SelectItem value="female">নারী</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/3 space-y-2 p-2">
        <Label
          className="block font-medium text-[#1f4f69] text-center"
          htmlFor="address"
        >
          স্থায়ী ঠিকানা
        </Label>
        <Select>
          <SelectTrigger className="w-full border rounded-md focus:ring-2 focus:ring-blue-400">
            <SelectValue placeholder="স্থায়ী ঠিকানা" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল ঠিকানা</SelectItem>
            <SelectItem value="male">পুরুষ</SelectItem>
            <SelectItem value="female">নারী</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/3 space-y-2 p-2">
        <Label
          className="block font-medium text-[#1f4f69] text-center"
          htmlFor="religious"
        >
          ধর্মীয় লাইফস্টাইল
        </Label>
        <Select>
          <SelectTrigger className="w-full border rounded-md focus:ring-2 focus:ring-blue-400">
            <SelectValue placeholder="ধর্মীয় লাইফস্টাইল" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল</SelectItem>
            <SelectItem value="male">পুরুষ</SelectItem>
            <SelectItem value="female">নারী</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/3 space-y-3 p-2">
        <Label
          className="block font-medium text-[#1f4f69] text-center"
          htmlFor="religious"
        >
          বয়স
        </Label>
        <div className="flex items-center space-x-1">
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

      <div className="w-1/3 space-y-1 p-2">
        <p className="text-center text-sm text-gray-700">বিসমিল্লাহ</p>
        <Button
          className="w-full p-2 bg-[#E25A6F] text-white rounded hover:bg-[#D14A5F]"
          onClick={handleSearchClick}
        >
          খুঁজুন
        </Button>
      </div>
    </form>
  );
}
