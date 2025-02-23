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

export default function PrimaryInfo() {
  const biodataTypes = ["পাত্রের বায়োডাটা", "পাত্রীর বায়োডাটা"];
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">প্রাথমিক তথ্য</div>
      <div className="max-w-5xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3  mr-3 text-md space-y-1"
            htmlFor="biodataType"
          >
            বায়োডাটার ধরন:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="বায়োডাটার ধরন" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {biodataTypes.map((x) => (
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
            <div>বায়োডাটা কার জন্য তৈরী করছেন?</div>
            <div className="text-xs">
              (যেমনঃ নিজের জন্য/বোনের জন্য/বন্ধুর জন্য/ভাগ্নির জন্য ইত্যাদি)
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
            <div>পাত্র/পাত্রীর সম্পূর্ণ নাম:</div>
            <div className="text-xs">
              (NID কার্ডে যে নাম আছে। নাম বায়োডাটায় প্রকাশ করা হবে না। শুধুমাত্র
              ভেরিফিকেশন ও অপরপক্ষকে যোগাযোগ তথ্য প্রদানের ক্ষেত্রে প্রয়োজন
              হবে।)
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
            <div>পিতার নাম:</div>
            <div className="text-xs">
              (পূর্ণ নাম লিখবেন। বায়োডাটায় প্রকাশ করা হবে না।)
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
            <div>মাতার নাম:</div>
            <div className="text-xs">
              (পূর্ণ নাম লিখবেন। বায়োডাটায় প্রকাশ করা হবে না।)
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
            <div>ইমেইল আইডি:</div>
            <div className="text-xs">
              (পাত্র/পাত্রীর সাথে আমাদের যোগাযোগের জন্য প্রয়োজন হবে। অপরপক্ষ
              যোগাযোগ তথ্য নিতে চাইলে যুক্তিসঙ্গত কারণ বা প্রয়োজন ছাড়া পাঠানো
              হবে না।)
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
            <div>পাত্র/পাত্রীর মোবাইল নম্বর:</div>
            <div className="text-xs">
              (মোবাইল নম্বর শুধুমাত্র ভেরিফিকেশনের জন্য আমাদের কাছে থাকবে। কাউকে
              প্রদান করা হবে না।)
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
            <div>পাত্র/পাত্রীর অভিভাবকের মোবাইল নম্বর:</div>
            <div className="text-xs">
              <div>কমপক্ষে ২ টি সচল নম্বর দিন। এভাবে লিখুন:</div>
              <div>বাবা - ০১২৩৪৫৭৮৯১০</div>
              <div>বড়ভাই - ০১২৩৪৫৭৮৯১০</div>
              <div>
                [আপনার বায়োডাটা কেউ পছন্দ করলে এবং যোগাযোগ করতে চাইলে শুধুমাত্র
                এই অভিভাবকের যোগাযোগ তথ্য প্রদান করা হবে।]
              </div>
            </div>
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
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
