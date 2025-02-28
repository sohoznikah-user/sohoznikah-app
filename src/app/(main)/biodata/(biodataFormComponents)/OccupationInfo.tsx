import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OccupationInfo() {
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
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">পেশা</div>
      <div className="max-w-5xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex items-center space-y-2">
          <Label className="w-1/3 mr-3 text-md space-y-1" htmlFor="biodataType">
            আপনার পেশা:
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
        <div className="flex items-center space-y-2">
          <Label
            className="w-1/3 mr-3 text-md space-y-1"
            htmlFor="emailMobileNumber"
          >
            <div>পেশা নিয়ে বিস্তারিত লিখুন:</div>
            <div className="text-xs">
              (অর্থাৎ আপনার কর্মস্থল কোথায়, কি ধরণের কাজে দায়িত্বরত আছেন বা পদবি
              কি, এগুলো নিয়ে বিস্তারিত লিখুন। পেশা না থাকলে খালি রাখুন।)
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
            <div>মাসিক আয়:</div>
            <div className="text-xs">(পেশা না থাকলে খালি রাখুন।)</div>
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
