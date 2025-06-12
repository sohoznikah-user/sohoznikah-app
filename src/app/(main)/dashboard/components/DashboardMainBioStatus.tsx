// File: src/app/(main)/dashboard/DashboardMainBioStatus.tsx
"use client";
import { Slider } from "@/components/ui/slider";
import { useUpdateMyBiodataMutation } from "@/redux/features/biodata/biodataApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { toast } from "sonner";

export default function DashboardMainBioStatus() {
  const { biodata } = useAppSelector((state) => state.biodata);
  // console.log({ biodata, biodataFormData });

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
    <div className="p-4 md:p-8 flex flex-col space-y-2 rounded-xl w-full">
      <div className="text-[#005381] md:text-center text-start text-xl md:text-2xl">
        বায়োডাটা
      </div>
      <div className="text-xs text-[#8c8e92] text-center">
        {/* বায়োডাটা পাবলিশ হয়েছে ৫ নভেম্বর, ২০২৪ */}
      </div>
      <div className="flex flex-col md:flex-col lg:flex-row  space-y-6 md:space-y-8 lg:space-y-0 text-black mt-4 w-full lg:justify-between flex-wrap gap-4">
        <div className="flex flex-col items-center bg-[#F5F4FC] p-4 md:p-6 space-y-4 md:space-y-6 rounded-xl w-full md:w-auto">
          <div className="text-base md:text-lg">বায়োডাটা স্ট্যাটাস</div>
          <div className="flex w-full justify-center">
            <div
              onClick={() => handleBioStatus("PRIVATE")}
              className={`py-2 md:py-3 rounded-2xl px-6 md:px-8 cursor-pointer ${
                biodata?.visibility === "PRIVATE"
                  ? "bg-[#c65c5c] text-white z-10"
                  : "bg-[#d9d9d9] text-[#777] z-0"
              }`}
            >
              প্রাইভেট
            </div>
            <div
              onClick={() => handleBioStatus("PUBLIC")}
              className={`py-2 md:py-3 rounded-2xl px-6 md:px-8 -ml-5 cursor-pointer ${
                biodata?.visibility === "PUBLIC"
                  ? "bg-[#c65c5c] text-white z-10"
                  : "bg-[#d9d9d9] text-[#777] z-0"
              }`}
            >
              পাবলিক
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-[#F5F4FC] p-4 md:p-6 space-y-4 md:space-y-6 rounded-xl w-full md:w-auto lg:w-72">
          <div className="text-base md:text-lg">বায়োডাটা সম্পূর্ণতা</div>
          <Slider
            value={[Number(biodata?.biodataCompleted || 0)]}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div>{biodata?.biodataCompleted || 0}%</div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col items-center justify-center  gap-4 w-full md:w-auto lg:w-auto">
          <Link
            href={`/biodatas/my-biodata`}
            className="w-full md:max-w-60 p-3 md:p-4 bg-[#5b8eaa] rounded-xl text-white text-center"
          >
            বায়োডাটা দেখুন
          </Link>
          <Link
            href={`/biodata-editor`}
            className="w-full md:max-w-60 p-3 md:p-4 bg-[#5b8eaa] rounded-xl text-white text-center"
          >
            বায়োডাটা এডিট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
