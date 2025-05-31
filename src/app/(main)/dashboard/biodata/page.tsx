"use client";
import { Slider } from "@/components/ui/slider";
import {
  useDeleteBiodataMutation,
  useUpdateMyBiodataMutation,
} from "@/redux/features/biodata/biodataApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function BiodataPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const router = useRouter();
  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);
  console.log({ biodata, biodataFormData });

  const [updateBioStatus, { isLoading: isUpdatingBioStatus }] =
    useUpdateMyBiodataMutation();

  const [deleteBio, { isLoading: isDeletingBio }] = useDeleteBiodataMutation();

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

  // const handleDeleteBio = async () => {
  //   try {
  //     const res = await deleteBio({ id: biodata?.id }).unwrap();
  //     if (res?.success) {
  //       toast.success("বায়োডাটা ডিলিট হয়েছে");
  //     } else {
  //       toast.error("বায়োডাটা ডিলিট হয়নি");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error?.message || "বায়োডাটা ডিলিট হয়নি");
  //   }
  // };

  // const handleReset = () => {
  //   setIsModalOpen(null);
  //   setSelectedId(null);
  // };

  return (
    <div className=" w-full p-8 flex flex-col space-y-2 rounded-xl">
      <div className="text-[#005381] text-center text-2xl font-semibold">
        বায়োডাটা
      </div>
      <div className="text-xs text-[#8c8e92] text-center">
        {/* বায়োডাটা পাবলিশ হয়েছে ৫ নভেম্বর, ২০২৪ */}
      </div>
      <div className="flex space-x-6 text-black mt-4">
        {/* Biodata Status */}
        <div className="flex  justify-between items-center  gap-4 bg-[#F5F4FC] p-4 rounded-2xl">
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
            <Slider
              value={[70]}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div>৭০%</div>
          </div>
        </div>

        {/* Biodata Action Buttons */}
        <div className="grid grid-cols-2  gap-4 bg-[#F5F4FC] p-4 rounded-2xl justify-center items-center">
          <Link href={`/biodatas/my-biodata`}>
            <button className="w-full p-4  px-8 bg-[#E8E8E8] shadow-md rounded-xl text-[#353535] text-center cursor-pointer">
              বায়োডাটা দেখুন
            </button>
          </Link>
          <Link href={`/biodatas/my-biodata`}>
            <button className="w-full p-4  px-8 bg-[#E8E8E8] shadow-md rounded-xl text-[#353535] text-center cursor-pointer">
              লিংক কপি করুন
            </button>
          </Link>
          <Link href={`/biodata-editor`}>
            <button className="w-full px-8 p-4 bg-[#FFD255] rounded-xl text-[#353535] text-center cursor-pointer">
              এডিট করুন
            </button>
          </Link>
          <button
            className="w-full p-4  px-8 bg-[#D75656] rounded-xl text-white text-center cursor-pointer"
            onClick={() => setIsModalOpen("delete")}
          >
            ডিলিট করুন
          </button>
        </div>
      </div>

      {/* <DeleteConfirmationModal
        open={isModalOpen === "delete"}
        onClose={() => handleReset()}
        onDelete={handleDeleteBio}
        loading={isDeletingBio}
        itemName={`বায়োডাটা`}
      /> */}
    </div>
  );
}
