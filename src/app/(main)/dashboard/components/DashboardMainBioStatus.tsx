// File: src/app/(main)/dashboard/DashboardMainBioStatus.tsx
"use client";
import { Slider } from "@/components/ui/slider";
import { useUpdateMyBiodataMutation } from "@/redux/features/biodata/biodataApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { toast } from "sonner";

export default function DashboardMainBioStatus() {
  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);
  console.log({ biodata, biodataFormData });

  const [updateBioStatus, { isLoading: isUpdatingBioStatus }] =
    useUpdateMyBiodataMutation();

  const handleBioStatus = async (status: string) => {
    try {
      const updatedData = {
        visibility: status,
      };
      const res = await updateBioStatus(updatedData).unwrap();
      if (res?.success) {
        toast.success("বায়োডাটা স্ট্যাটাস আপডেট হয়েছে");
      } else {
        toast.error("বায়োডাটা স্ট্যাটাস আপডেট হয়নি");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "বায়োডাটা স্ট্যাটাস আপডেট হয়নি");
    }
  };

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
            <div
              onClick={() => handleBioStatus("PRIVATE")}
              className={`py-3 rounded-2xl  px-8  cursor-pointer ${
                biodata?.visibility === "PRIVATE"
                  ? "bg-[#c65c5c] text-white z-10"
                  : "bg-[#d9d9d9] text-[#777] z-0"
              }`}
            >
              প্রাইভেট
            </div>
            <div
              onClick={() => handleBioStatus("PUBLIC")}
              className={`py-3 rounded-2xl px-8 -ml-5 cursor-pointer ${
                biodata?.visibility === "PUBLIC"
                  ? "bg-[#c65c5c] text-white z-10"
                  : "bg-[#d9d9d9] text-[#777] z-0"
              }`}
            >
              পাবলিক
            </div>
          </div>
        </div>
        <div className="w-72 flex flex-col items-center bg-[#e7ecf6] p-6 space-y-6 rounded-xl">
          <div className="text-lg">বায়োডাটা সম্পূর্ণতা</div>
          <Slider value={[70]} min={0} max={100} step={1} className="w-full" />
          <div>৭০%</div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <Link
            href={`/biodatas/my-biodata`}
            className="w-48 p-4 bg-[#5b8eaa] rounded-xl text-white text-center"
          >
            বায়োডাটা দেখুন
          </Link>
          <Link
            href={`/biodata-editor`}
            className="w-48 p-4 bg-[#5b8eaa] rounded-xl text-white text-center"
          >
            বায়োডাটা এডিট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
