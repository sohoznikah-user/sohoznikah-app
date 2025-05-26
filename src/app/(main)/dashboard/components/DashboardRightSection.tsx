// File: src/app/(main)/dashboard/DashboardRightSection.tsx
"use client";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardRightSection() {
  const { biodata } = useAppSelector((state) => state.biodata);
  return (
    <div className="py-12 mr-8 flex flex-col items-center space-y-6">
      <div className="p-10 bg-[#f9f3f9] rounded-3xl flex flex-col items-center justify-center space-y-4">
        <div className="text-black text-center">আপনার সর্বমোট টোকেন সংখ্যা</div>
        <div className="text-8xl text-[#ad0000] font-semibold">
          {biodata?.token}
        </div>
        <div className="px-6 py-4 bg-[#3c4652] rounded-md">টোকেন কিনুন</div>
      </div>
      <div className="p-10 bg-[#f9f3f9] rounded-3xl flex flex-col items-center justify-center space-y-4">
        <div className="text-black text-center">
          আপনার কি বিবাহ সম্পন্ন হয়েছে?
        </div>
        <div className="px-16 py-4 bg-[#5b8eaa] rounded-md">হ্যা</div>
      </div>
    </div>
  );
}
