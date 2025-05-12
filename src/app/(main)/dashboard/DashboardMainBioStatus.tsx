// File: src/app/(main)/dashboard/DashboardMainBioStatus.tsx
import { Slider } from "@/components/ui/slider";

export default function DashboardMainBioStatus() {
  return (
    <div className="bg-[#f2f4fc] p-8 flex flex-col space-y-2 rounded-xl">
      <div className="text-[#005381] text-center text-2xl">বায়োডাটা</div>
      <div className="text-xs text-[#8c8e92] text-center">
        বায়োডাটা পাবলিশ হয়েছে ৫ নভেম্বর, ২০২৪
      </div>
      <div className="flex space-x-6 text-black mt-4">
        <div className="flex flex-col items-center bg-[#e7ecf6] p-6 space-y-6 rounded-xl">
          <div className="text-lg">বায়োডাটা স্ট্যাটাস</div>
          <div className="flex">
            <div className="py-4 rounded-3xl mr-[-2rem] px-6 bg-[#c65c5c] text-white z-10">
              প্রাইভেট
            </div>
            <div className="py-4 rounded-3xl pr-6 pl-12 bg-[#d9d9d9] text-[#777] ">
              পাবলিক
            </div>
            {/* <div className="py-4 rounded-3xl mr-[-2rem] pl-6 pr-12 bg-[#d9d9d9] text-[#777]">
                প্রাইভেট
              </div>
              <div className="py-4 rounded-3xl px-6 bg-[#c65c5c] text-white z-10">
                পাবলিক
              </div> */}
          </div>
        </div>
        <div className="w-72 flex flex-col items-center bg-[#e7ecf6] p-6 space-y-6 rounded-xl">
          <div className="text-lg">বায়োডাটা সম্পূর্ণতা</div>
          <Slider value={[70]} min={0} max={100} step={1} className="w-full" />
          <div>৭০%</div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-48 p-4 bg-[#5b8eaa] rounded-xl text-white text-center">
            বায়োডাটা দেখুন
          </div>
          <div className="w-48 p-4 bg-[#5b8eaa] rounded-xl text-white text-center">
            বায়োডাটা এডিট করুন
          </div>
        </div>
      </div>
    </div>
  );
}
