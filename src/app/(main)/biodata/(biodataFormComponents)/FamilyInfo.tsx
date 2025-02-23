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
import { Textarea } from "@/components/ui/textarea";

export default function FamilyInfo() {
  const familyTypes = ["একক পরিবার", "যৌথ পরিবার"];
  const familyBackgrounds = [
    "উচ্চবিত্ত",
    "উচ্চ মধ্যবিত্ত",
    "মধ্যবিত্ত",
    "নিম্ন মধ্যবিত্ত",
    "নিম্নবিত্ত",
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">প্রাথমিক তথ্য</div>
      <div className="max-w-5xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            আপনার পিতা-মাতা উভয়েই জীবিত আছেন?
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
            <div>পিতার পেশা:</div>
            <div className="text-xs">
              <div>-চাকরিজীবী হলে পদবি সহ কি ধরণের চাকরি তা লিখবেন।</div>
              <div>-ব্যাবসায়ী হলে কি ধরণের ব্যবসা তা লিখবেন।</div>
            </div>
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
            <div>মাতার পেশা:</div>
            <div className="text-xs">
              <div>-চাকরিজীবী হলে পদবি সহ কি ধরণের চাকরি তা লিখবেন।</div>
              <div>-ব্যাবসায়ী হলে কি ধরণের ব্যবসা তা লিখবেন।</div>
            </div>
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
            আপনারা ভাই-বোন কতজন?
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
            <div>ভাই-বোন কে কি করেন?</div>
            <div className="text-xs">
              <div>(এভাবে লিখুন:</div>
              <div>১ম বোন - বিবাহিত (স্বামী মসজিদের ইমাম)</div>
              <div>২য় আমি নিজে।</div>
              <div>৩য় ভাই - ক্লাস ৯ এ পড়ে।</div>
            </div>
          </Label>
          <Textarea
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
          />
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            <div>চাচা মামাদের পেশা:</div>
            <div className="text-xs">
              <div>(নিচে নিচে লিখতে পারেন।)</div>
            </div>
          </Label>
          <Textarea
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
          />
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3  mr-3 text-md space-y-1"
            htmlFor="biodataType"
          >
            পরিবারের ধরণ:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="পরিবারের ধরণ" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {familyTypes.map((x) => (
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
            পরিবারের অর্থনৈতিক অবস্থা:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="পরিবারের অর্থনৈতিক অবস্থা" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {familyBackgrounds.map((x) => (
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
            আপনি সহ আপনার পরিবারের নিজস্ব বাড়িতে থাকা হয় নাকি ভাড়া বাড়িতে?
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
            আপনাদের বাড়ি-ঘরের বা সম্পত্তির হাল্কা বিবরন দিন:
          </Label>
          <Textarea
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
          />
        </div>
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            <div>
              পারিবারিক বিষয়ে আরো কিছু জানাতে চাইলে এখানে লিখুন, অন্যথায় খালি
              রাখুন।
            </div>
            <div className="text-xs">
              <div>
                (এখানে আপনার পরিবারের সদস্যদের মধ্যে পারস্পরিক সম্পর্ক বা
                আত্মীয়স্বজনদের সাথে আপনাদের সম্পর্ক নিয়ে কিছু জানানোর থাকলে
                লিখুন।)
              </div>
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
