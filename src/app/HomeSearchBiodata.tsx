// src/app/HomeSearchBiodata.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  biodataTypes,
  maritalStatuses,
  religiousLifestyle,
} from "@/lib/consts";
import { districtsAndUpazilas } from "@/lib/districtsAndUpazilas";
import { setFilterData } from "@/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomeSearchBiodata() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [range, setRange] = useState([18, 80]);
  const [biodataType, setBiodataType] = useState("all");
  const [maritalStatus, setMaritalStatus] = useState("all");
  const [state, setState] = useState("all");
  const [muslimType, setMuslimType] = useState("all");

  const handleSearchClick = () => {
    const filters = {
      biodataType: biodataType !== "all" ? biodataType : "",
      maritalStatus: maritalStatus !== "all" ? maritalStatus : "",
      permanentState: state !== "all" ? state : "",
      religiousLifestyle: muslimType !== "all" ? muslimType : "",
      ageMin: range[0],
      ageMax: range[1],
    };
    console.log("Dispatching Filters:", filters); // Debug
    dispatch(setFilterData(filters));
    router.push("/biodatas");
  };

  return (
    <div className="bg-white p-8 shadow-lg flex flex-wrap">
      <div className="w-1/3 space-y-2 p-2">
        <Label>আমি খুঁজছি</Label>
        <Select value={biodataType} onValueChange={setBiodataType}>
          <SelectTrigger>
            <SelectValue placeholder="সকল বায়োডাটা" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল বায়োডাটা</SelectItem>
            {biodataTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/3 space-y-2 p-2">
        <Label>বৈবাহিক অবস্থা</Label>
        <Select value={maritalStatus} onValueChange={setMaritalStatus}>
          <SelectTrigger>
            <SelectValue placeholder="সকল অবস্থা" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল অবস্থা</SelectItem>
            {maritalStatuses
              .filter((m) => m.for === biodataType || m.for === "both")
              .map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/3 space-y-2 p-2">
        <Label>স্থায়ী জেলা</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger>
            <SelectValue placeholder="সকল ঠিকানা" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল ঠিকানা</SelectItem>
            {Object.keys(districtsAndUpazilas).map((district) => (
              <SelectItem
                key={districtsAndUpazilas[district].value}
                value={districtsAndUpazilas[district].value}
              >
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-1/3 space-y-2 p-2">
        <Label>ধর্মীয় লাইফস্টাইল</Label>
        <Select value={muslimType} onValueChange={setMuslimType}>
          <SelectTrigger>
            <SelectValue placeholder="সকল" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সকল</SelectItem>
            {religiousLifestyle.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.title}
              </SelectItem>
            ))}
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
    </div>
  );
}
