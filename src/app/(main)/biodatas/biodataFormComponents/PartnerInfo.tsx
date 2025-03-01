import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PartnerInfo() {
  const isMale = false;
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
  const religiousEducationQualities = [
    "হাফেজা",
    "আলেমা",
    "ক্বারিয়া",
    "দাঈয়া",
    "মুফতিয়া",
    "মুহাদ্দিসা",
    "তালিবে কুরআন",
    "ততাজবীদ শিক্ষার্থী",
    "মুয়াল্লিমুন ফি তালিম",
    "ইসলামিক স্কলার",
    "জরুরী নয়",
  ];

  let maritalStatuses = [];
  if (isMale) {
    maritalStatuses = ["অবিবাহিত", "ডিভোর্সড", "বিধবা"];
  } else {
    maritalStatuses = ["অবিবাহিত", "বিবাহিত", "ডিভোর্সড", "বিপত্নীক"];
  }

  let specialCatagories = [
    "সমাজ সেবক",
    "নওমুসলিম",
    "প্রবাসী",
    "ফরেইন সিটিজেন",
    "শিক্ষার্থী",
    "চাকরির সন্ধানে আছে",
    "চাকরিজীবী",
    "প্রতিবন্ধী",
    "এতিম",
    "বন্ধ্যা/ইনফার্টিলিটি",
    "শর্ট ডিভোর্সড",
    `সিঙ্গেল ${isMale ? "মাদার" : "ফাদার"}`,
    "স্বল্প উচ্চতার মানুষ",
    "কোনোটিই নয়",
  ];

  if (!isMale) {
    specialCatagories = [...specialCatagories, "তাবলীগ"];
  }

  const muslimTypes = [
    "জেনারেল/নন-প্রাক্টিসিং",
    "প্রাক্টিসিংয়ে চেষ্টারত",
    "পূর্ণ ধার্মিক/ প্র্যাক্টিসিং",
  ];

  const professions = [
    "ব্যাবসা",
    "সরকারি চাকরিজীবী",
    "বেসরকারি চাকরিজীবী",
    "হোম টিউটর",
    "শিক্ষক/শিক্ষিকা",
    "আইনজীবী",
    "ইঞ্জিনিয়ার",
    "ডাক্তার",
    "নার্স",
    "ফার্মাসিস্ট",
    "প্যারামেডিক",
    "থেরাপিস্ট",
    "মেডিকেল টেকনোলজিস্ট ",
    "মেডিক্যাল অ্যাসিস্ট্যান্ট ",
    "সামরিক জব",
    "বেসামরিক জব",
    "আধা সামরিক জব",
    "ইমাম",
    "মুয়াজ্জিন",
    "পাইলট",
    "ফ্রিল্যান্সার",
    "শিক্ষার্থী",
    "MBBS/BDS শিক্ষার্থী",
    "প্রবাসী-প্রবাস জব",
    "মিস্ত্রী/কায়িক শ্রম",
    "কৃষিকাজ",
    "খামারি",
    "চাকরির সন্ধানরত/বেকার",
    "পারিবারিক সম্পত্তি",
    "পেশা নেই/কর্মহীন",
    "অন্যান্য",
  ];

  const familyBackgrounds = [
    "উচ্চবিত্ত",
    "উচ্চ মধ্যবিত্ত",
    "মধ্যবিত্ত",
    "নিম্ন মধ্যবিত্ত",
    "নিম্নবিত্ত",
  ];

  const blackSkinOptions = ["জি", "না", "দেখা যেতে পারে"];
  const partnerLocationOptions = ["শহরে বসবাসকারী", "গ্রামে বসবাসকারী", "উভয়ই"];
  const secondMarriageOptions = ["হ্যা", "না"];

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">
        যেমন জীবনসঙ্গী আশা করেন
      </div>
      <div className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            কাঙ্খিত বয়স:
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            কাঙ্খিত গাত্রবর্ণ:
          </Label>
          <div className="w-full flex flex-wrap">
            {skinTones.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="biodataType">
            কাঙ্খিত উচ্চতা:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="কাঙ্খিত উচ্চতা" />
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
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            শিক্ষাগত যোগ্যতা:
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            দ্বীনি শিক্ষাগত যোগ্যতা:
          </Label>
          <div className="w-full flex flex-wrap">
            {religiousEducationQualities.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            কাঙ্খিত ঠিকানা:
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            বৈবাহিক অবস্থা:
          </Label>
          <div className="w-full flex flex-wrap">
            {maritalStatuses.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            আপনি কোন কোন বিশেষ ক্যাটাগরিতে আগ্রহী?
          </Label>
          <div className="w-full flex flex-wrap">
            {specialCatagories.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            ধর্মীয় লাইফস্টাইল:
          </Label>
          <div className="w-full flex flex-wrap">
            {muslimTypes.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            পেশা:
          </Label>
          <div className="w-full flex flex-wrap">
            {professions.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            পরিবারের অর্থনৈতিক অবস্থা:
          </Label>
          <div className="w-full flex flex-wrap">
            {familyBackgrounds.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2 mb-4">
                <Checkbox id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="biodataType">
            আল্লাহ যাদেরকে গাঢ় ত্বক বা কালো বর্ণ দিয়েছেন, এরকম পাত্রীর প্রতি
            আপনি আগ্রহী?
          </Label>
          <RadioGroup className="w-full flex flex-wrap gap-0">
            {blackSkinOptions.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2">
                <RadioGroupItem value={x} id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {!isMale && (
          <div className="flex flex-col space-y-4">
            <Label className="text-md space-y-1" htmlFor="biodataType">
              মাসনা বা দ্বিতীয় বিবাহে আগ্রহী এমন পাত্রের প্রতি আগ্রহী আছেন?
            </Label>
            <RadioGroup className="w-full flex flex-wrap gap-0">
              {secondMarriageOptions.map((x) => (
                <div key={x} className="w-1/3 flex items-center space-x-2">
                  <RadioGroupItem value={x} id={x} />
                  <Label htmlFor={x}>{x}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="biodataType">
            জীবনসঙ্গী নির্বাচনে শহর নাকি গ্রাম, কোনটিকে প্রাধান্য দিবেন?
          </Label>
          <RadioGroup className="w-full flex flex-wrap gap-0">
            {partnerLocationOptions.map((x) => (
              <div key={x} className="w-1/3 flex items-center space-x-2">
                <RadioGroupItem value={x} id={x} />
                <Label htmlFor={x}>{x}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            <div>জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলী আশা করেন:</div>
            <div className="text-xs">
              (অর্থাৎ কাঙ্খিত জীবনসঙ্গীর স্বভাব, দ্বীনদারিতা, চারিত্রীক গুণাবলী
              কেমন আশা করেন। বিশেষ কোনো কার্যক্রম বা চাওয়া থাকলে জানাতে পারেন।)
            </div>
          </Label>
          <Textarea
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
          />
        </div>
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
