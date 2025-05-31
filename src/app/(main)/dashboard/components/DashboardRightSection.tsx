// File: src/app/(main)/dashboard/DashboardRightSection.tsx
"use client";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

export default function DashboardRightSection() {
  const { biodata } = useAppSelector((state) => state.biodata);
  return (
    <div className="py-12 mr-8 flex flex-col items-center space-y-6">
      <div className="p-10 bg-[#f9f3f9] rounded-3xl flex flex-col items-center justify-center space-y-4">
        <div className="text-black text-center">আপনার সর্বমোট টোকেন সংখ্যা</div>
        <div className="text-8xl text-[#ad0000] font-semibold">
          {biodata?.token || 0}
        </div>
        <Link
          href={`/dashboard/token`}
          className="px-8 py-4 bg-[#3c4652] rounded-lg text-white text-center"
        >
          টোকেন কিনুন
        </Link>
      </div>
      <div className="p-10 bg-[#f9f3f9] rounded-3xl flex flex-col items-center justify-center space-y-4">
        <div className="text-black text-center">
          আপনার কি বিবাহ সম্পন্ন হয়েছে?
        </div>
        <Link
          href={`/dashboard/biodata`}
          className="px-4 py-2 bg-[#D14A5F] rounded-lg text-white text-center"
        >
          বায়োডাটা ডিলিট করতে চাই
        </Link>
      </div>
    </div>
  );
}
