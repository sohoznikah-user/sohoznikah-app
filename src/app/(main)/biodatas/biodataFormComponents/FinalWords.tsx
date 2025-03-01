import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FinalWords() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-[#004972]">শেষ কথা</div>
      <div className="max-w-4xl w-full bg-[#f6f6f6] p-10 space-y-4 text-black rounded-4xl">
        <div className="text-[#005A8B] text-xl text-center">
          প্রতিশ্রুতি নামা
        </div>
        <div className="text-[#cd0000] space-y-3">
          <div className="flex items-center space-x-2">
            <Label htmlFor="preApprove1" className="text-[#6C0011] leading-5">
              আমি আল্লাহর নামে শপথ করছি যে,
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="preApprove1" />
            <Label htmlFor="preApprove1" className="leading-5">
              আমি বায়োডাটায় সকল তথ্য সত্য প্রদান করেছি।
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="preApprove2" />
            <Label htmlFor="preApprove2" className="leading-5">
              সহজনিকাহ ম্যাট্রিমনি ওয়েবসাইটের কোনো তথ্য অসৎ কাজে ব্যবহার করবো
              না।
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="preApprove3" />
            <Label htmlFor="preApprove3" className="leading-5">
              কোনো মিথ্যা তথ্য প্রদান করলে বা কোনো তথ্য অসৎ কাজে ব্যবহার করে
              থাকলে, দুনিয়াবী যেকোনো আইনী জটিলতা এবং পরকালীন সকল দায়ভার আমি বহন
              করবো।
            </Label>
          </div>
        </div>
      </div>
      <div className="max-w-4xl w-ful">
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Submit abd Send For Approval
        </Button>
      </div>
    </div>
  );
}
