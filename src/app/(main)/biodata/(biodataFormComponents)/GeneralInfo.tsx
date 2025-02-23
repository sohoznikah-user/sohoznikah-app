import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GeneralInfo() {
  const isMale = true;
  let maritalStatuses = [];
  if (isMale) {
    maritalStatuses = ["অবিবাহিত", "বিবাহিত", "ডিভোর্সড", "বিপত্নীক"];
  } else {
    maritalStatuses = ["অবিবাহিত", "ডিভোর্সড", "বিধবা"];
  }
  const skinTones = [
    "গাঢ় ত্বক",
    "শ্যামলা",
    "উজ্জ্বল শ্যামলা",
    "ফর্সা",
    "উজ্জ্বল ফর্সা",
  ];
  const heights = [
    "৪ ফুটের কম",
    "৪'",
    "৪'১\"",
    "৪'২\"",
    "৪'৩\"",
    "৪'৪\"",
    "৪'৫\"",
    "৪'৬\"",
    "৪'৭\"",
    "৪'৮\"",
    "৪'৯\"",
    "৪'১০\"",
    "৪'১১\"",
    "৫'",
    "৫'১\"",
    "৫'২\"",
    "৫'৩\"",
    "৫'৪\"",
    "৫'৫\"",
    "৫'৬\"",
    "৫'৭\"",
    "৫'৮\"",
    "৫'৯\"",
    "৫'১০\"",
    "৫'১১\"",
    "৬'",
    "৬'১\"",
    "৬'২\"",
    "৬'৩\"",
    "৬'৪\"",
    "৬'৫\"",
    "৬'৬\"",
    "৬'৭\"",
    "৬'৮\"",
    "৬'৯\"",
    "৬'১০\"",
    "৬'১১\"",
    "৭'",
    "৭ ফুটের বেশি",
  ];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const nationalities = ["বাংলাদেশী", "ফরেইন সিটিজেন"];

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">প্রাথমিক তথ্য</div>
      <div className="max-w-5xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            <div>জন্ম তারিখ:</div>
            <div className="text-xs">(আসল, সার্টিফিকেট অনুযায়ী নয়)</div>
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3  mr-3 text-md space-y-1"
            htmlFor="biodataType"
          >
            বৈবাহিক অবস্থা:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="বৈবাহিক অবস্থা" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {maritalStatuses.map((x) => (
                <SelectItem
                  key={x}
                  className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                  value={x}
                >
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3  mr-3 text-md space-y-1"
            htmlFor="biodataType"
          >
            গাত্রবর্ণ:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="গাত্রবর্ণ" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {skinTones.map((x) => (
                <SelectItem
                  key={x}
                  className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                  value={x}
                >
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3  mr-3 text-md space-y-1"
            htmlFor="biodataType"
          >
            উচ্চতা:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="উচ্চতা" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {heights.map((x) => (
                <SelectItem
                  key={x}
                  className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                  value={x}
                >
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            ওজন
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3  mr-3 text-md space-y-1"
            htmlFor="biodataType"
          >
            রক্তের গ্রুপ:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="রক্তের গ্রুপ" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {bloodGroups.map((x) => (
                <SelectItem
                  key={x}
                  className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                  value={x}
                >
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3  mr-3 text-md space-y-1"
            htmlFor="biodataType"
          >
            জাতীয়তা:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="জাতীয়তা" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {nationalities.map((x) => (
                <SelectItem
                  key={x}
                  className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                  value={x}
                >
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
