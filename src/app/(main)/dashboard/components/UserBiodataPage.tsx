"use client";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  useRequestDeleteBiodataMutation,
  useUpdateMyBiodataMutation,
} from "@/redux/features/biodata/biodataApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function UserBiodataPage() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [bioDeleteReason, setDeleteReason] = useState<string>("");
  const [bkashNumber, setBkashNumber] = useState<string>("");
  const [spouseBiodata, setSpouseBiodata] = useState<string>("");

  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);

  const [updateBioStatus, { isLoading: isUpdatingBioStatus }] =
    useUpdateMyBiodataMutation();

  const [requestDeleteBiodata, { isLoading: isRequestingDeleteBio }] =
    useRequestDeleteBiodataMutation();

  const handleDeleteRequest = async () => {
    if (!bioDeleteReason) {
      toast.error("বায়োডাটা ডিলিট করার কারণ প্রদান করুন");
      return;
    }

    const deleteData = {
      id: biodata?.id,
      deleteReason: bioDeleteReason,
      bkashNumber: bkashNumber,
      spouseBiodata: spouseBiodata,
    };

    try {
      const res = await requestDeleteBiodata(deleteData).unwrap();
      if (res?.success) {
        toast.success("বায়োডাটা ডিলিট করার জন্য অনুরোধ পাঠানো হয়েছে");
      } else {
        toast.error("বায়োডাটা ডিলিট করার জন্য অনুরোধ পাঠানো হয়নি");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.message || "বায়োডাটা ডিলিট করার জন্য অনুরোধ পাঠানো হয়নি"
      );
    } finally {
      setIsModalOpen(null);
      setDeleteReason("");
      setBkashNumber("");
      setSpouseBiodata("");
    }
  };

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

  const handleCopyUrl = async () => {
    try {
      const url = window.location.origin + "/biodatas/" + biodata?.id;
      await navigator.clipboard.writeText(url);
      toast.success("লিংক কপি করা হয়েছে");
    } catch (error) {
      toast.error("লিংক কপি করা হয়নি");
    }
  };

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
          <button
            className="w-full p-4  px-8 bg-[#E8E8E8] shadow-md rounded-xl text-[#353535] text-center cursor-pointer"
            onClick={() => handleCopyUrl()}
          >
            লিংক কপি করুন
          </button>
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

      <ReusableModal
        open={isModalOpen === "delete"}
        onClose={() => setIsModalOpen(null)}
        // title="বায়োডাটা ডিলিট করা হবে"
        // description="আপনি কি বায়োডাটা ডিলিট করতে চান?"
        onConfirm={() => console.log("delete")}
        hideFooter
      >
        <div className="flex flex-col items-center justify-center w-full p-4">
          <div className="text-xl font-semibold mb-2 text-center">
            বায়োডাটা ডিলিট করুন
          </div>
          <div className="text-sm text-red-500 text-center pb-6 pt-2">
            বায়োডাটা ডিলিট করলে ওয়েবসাইট থেকে এটি সম্পূর্ণরূপে মুছে ফেলা হবে এবং
            পুনরায় কখনো ফিরিয়ে আনা সম্ভব নয়।
          </div>
          <div className="w-full mb-5">
            <label className="font-medium">বায়োডাটা ডিলিট করার কারণ:</label>
            <Textarea
              className="mt-1"
              rows={2}
              value={bioDeleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            />
          </div>
          <div className="w-full mb-5">
            <label className="font-medium">
              টোকেন জমা থাকলে, যে বিকাশ নম্বরে টাকা রিফান্ড নিবেন:
            </label>
            <Textarea
              className="mt-1"
              rows={2}
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
            />
          </div>
          <div className="w-full mb-5">
            <div className=" mb-1">
              সহজনিকাহ ম্যাট্রিমনির মাধ্যমে জীবনসঙ্গী পেয়ে থাকলে এবং আমাদের পক্ষ
              থেকে গিফট সংগ্রহ করতে নিচের তথ্যগুলো প্রদান করুন: (অন্যথায় খালি
              রাখুন):
              <div className="text-sm">
                - জীবনসঙ্গীর নাম: <br />
                - জীবনসঙ্গীর বায়োডাটা নং: <br />- নাম, ঠিকানা, মোবাইল নম্বর:
                (যেখানে হোম ডেলিভারি যাবে)
              </div>
            </div>
            <Textarea
              className="mt-1"
              rows={2}
              value={spouseBiodata}
              onChange={(e) => setSpouseBiodata(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-[#E25A6F] hover:bg-[#D75656] text-white mt-2"
            type="submit"
            onClick={handleDeleteRequest}
          >
            ডিলিটের জন্য অনুরোধ পাঠান
          </Button>
        </div>
      </ReusableModal>
    </div>
  );
}
