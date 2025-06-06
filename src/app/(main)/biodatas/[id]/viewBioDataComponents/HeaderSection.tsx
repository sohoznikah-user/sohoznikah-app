// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/HeaderSection.tsx
"use client";
import Loading from "@/app/loading";
import male from "@/assets/images/male-5.svg";
import NeedLoginModal from "@/components/shared/NeedLoginModal";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { Card, CardContent } from "@/components/ui/card";
import { BiodataFormData } from "@/lib/types";
import {
  useCreateFavouriteMutation,
  useGetFavouriteByIdQuery,
} from "@/redux/features/admin/favouriteApi";
import { useCreateProposalMutation } from "@/redux/features/admin/proposalApi";
import {
  useCreateShortlistMutation,
  useGetShortlistByIdQuery,
} from "@/redux/features/admin/shortlistApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { CircleChevronDown, Copy, Heart, Send, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeaderShortBio from "./HeaderShortBio";
import HeaderSpousePreferenceRequierment from "./HeaderSpousePreferenceRequierment";

export default function HeaderSection({
  biodata,
  biodataId,
  biodataFormData,
}: {
  biodata: any;
  biodataId?: string;
  biodataFormData: BiodataFormData;
}) {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const { data: favourite } = useGetFavouriteByIdQuery(biodataId, {
    skip: !token || !user,
  });
  const { data: shortlist } = useGetShortlistByIdQuery(biodataId, {
    skip: !token || !user,
  });

  const [createFavourite, { isLoading }] = useCreateFavouriteMutation();
  const [createShortlist, { isLoading: isCreatingShortlist }] =
    useCreateShortlistMutation();
  const [createProposal, { isLoading: isCreatingProposal }] =
    useCreateProposalMutation();

  useEffect(() => {
    if (favourite?.success) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favourite]);

  useEffect(() => {
    if (shortlist?.success) {
      setIsShortlisted(true);
    } else {
      setIsShortlisted(false);
    }
  }, [shortlist]);
  console.log("shortlist", shortlist?.success);

  const handleFavourite = async (type: "add" | "remove") => {
    if (!token || !user) {
      setIsModalOpen("login");
    }
    try {
      const res = await createFavourite({
        biodataId: biodataId,
      }).unwrap();
      if (res?.success) {
        if (res?.statusCode === 201) {
          toast.success("ফেভারিট লিস্টে যোগ করা হয়েছে");
          setIsFavourite(true);
        } else if (res?.statusCode === 200) {
          toast.error("ফেভারিট লিস্ট থেকে মুছে ফেলা হয়েছে।");
          setIsFavourite(false);
        }
      }
    } catch (error) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন");
    } finally {
      handleReset();
    }
  };
  const handleShortlist = async (type: "add" | "remove") => {
    if (!token || !user) {
      setIsModalOpen("login");
    }
    try {
      const res = await createShortlist({
        biodataId: biodataId,
      }).unwrap();
      if (res?.success) {
        if (res?.statusCode === 201) {
          toast.success("চুড়ান্ত তালিকায় যোগ করা হয়েছে");
          setIsFavourite(true);
        } else if (res?.statusCode === 200) {
          toast.error("চুড়ান্ত তালিকা থেকে মুছে ফেলা হয়েছে");
          setIsFavourite(false);
        }
      }
    } catch (error) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন");
    } finally {
      handleReset();
    }
  };

  const handleCopyUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("লিংক কপি করা হয়েছে");
    } catch (error) {
      toast.error("লিংক কপি করা হয়নি");
    }
  };

  const handleCreateProposal = async () => {
    if (!token || !user) {
      return;
    }
    const proposalData = {
      biodataId: biodata?.biodata?.id,
    };
    try {
      const res = await createProposal(proposalData).unwrap();

      console.log("res-proposal", res);
      if (res?.success) {
        toast.success("প্রস্তাব পাঠানো হয়েছে");
      } else {
        toast.error("প্রস্তাব পাঠানো হয়নি");
      }
    } catch (error: any) {
      toast.error(error?.message || "প্রস্তাব পাঠানো হয়নি");
    }
  };

  const handleReset = () => {
    setIsModalOpen(null);
    setIsFavourite(false);
    setIsShortlisted(false);
  };

  if (!biodata) return <Loading />;

  const status =
    biodata?.biodata?.status === "APPROVED" ? "Verified" : "Unverified";
  const code = biodata?.biodata?.code || "SNM---";

  return (
    <div className="bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <div className=" container mx-auto px-4 py-12 flex justify-center ">
        <div className="min-w-7xl flex space-x-8">
          <div className="w-1/4 flex flex-col justify-between space-y-8">
            <Card className="bg-white text-black border-none rounded-4xl h-full">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full flex items-start justify-between">
                    <div className="w-1 text-[#00b754] text-md font-semibold">
                      {status}
                    </div>
                    <Image
                      src={biodata?.biodata?.profilePic || male}
                      alt="Profile"
                      width={100}
                      height={40}
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = male;
                      }}
                    />
                    <div className="w-1"></div>
                  </div>

                  <div className="text-lg">
                    বায়োডাটা কোড: <span className="font-semibold">{code}</span>
                  </div>

                  <div className="flex space-x-4 border border-gray-400 rounded-xl p-4 ">
                    <Heart
                      className={`h-6 w-6 cursor-pointer ${
                        isFavourite ? "text-[#e25a6f]" : "text-black"
                      }`}
                      onClick={() =>
                        setIsModalOpen(!token || !user ? "login" : "favourite")
                      }
                      fill={isFavourite ? "red" : "white"}
                    />

                    <Star
                      className={`h-6 w-6 cursor-pointer ${
                        isShortlisted ? "text-[#e25a6f]" : "text-black"
                      }`}
                      onClick={() =>
                        setIsModalOpen(!token || !user ? "login" : "shortlist")
                      }
                      fill={isShortlisted ? "#FFCD06" : "white"}
                    />

                    <Copy
                      className="h-6 w-6 rotate-90 cursor-pointer hover:text-[#e25a6f]"
                      onClick={handleCopyUrl}
                    />
                    {/* <Mail className="h-6 w-6" /> */}
                    <CircleChevronDown className="h-6 w-6 text-[#b52d1f]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white text-black border-none rounded-4xl h-full">
              <CardContent className="pt-10">
                <div className="flex flex-col space-y-6">
                  <div className="text-xl font-medium text-center mb-4 text-[#b52d1f]">
                    আপনি আগ্রহী?
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div>প্রাথমিক প্রস্তাব পাঠান</div>
                      <div className="text-xs text-[#e25a6f]">
                        ১টি টোকেন খরচ হবে
                      </div>
                    </div>

                    <div
                      className="bg-[#e25a6f] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#d14a5f]"
                      onClick={handleCreateProposal}
                    >
                      <Send
                        className="h-6 w-6"
                        fill="white"
                        stroke="#e25a6f"
                        strokeOpacity={0.5}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-x-2">
                      <div>অভিভাবকের যোগাযোগ তথ্য দেখুন</div>
                      <div className="text-xs text-[#e25a6f]">
                        ১টি টোকেন খরচ হবে
                      </div>
                    </div>
                    <div className="bg-[#e25a6f] px-4 py-2 rounded-xl">
                      <Send
                        className="h-6 w-6"
                        fill="white"
                        stroke="#e25a6f"
                        strokeOpacity={0.5}
                      />
                    </div>
                  </div>
                  <Link
                    href="/tutorial"
                    className="text-xs text-center hover:underline text-blue-300 mt-4"
                  >
                    (বিস্তারিত জানুন)
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-3/4 flex space-x-8">
            <HeaderShortBio
              biodata={biodata}
              biodataFormData={biodataFormData}
            />
            <HeaderSpousePreferenceRequierment
              biodata={biodata}
              biodataFormData={biodataFormData}
            />
          </div>
        </div>
      </div>

      <NeedLoginModal
        open={isModalOpen === "login"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
      />

      <ReusableModal
        open={isModalOpen === "favourite"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        onConfirm={() => handleFavourite(isFavourite ? "remove" : "add")}
        confirmText={isFavourite ? "মুছে ফেলুন" : "যোগ করন"}
        cancelText="বাতিল"
        title={`আপনি কি ফেভারিট ${
          isFavourite ? "লিস্ট থেকে মুছে ফেলতে" : "লিস্টে যোগ করতে"
        } চান?`}
        description={`ফেভারিট  ${isFavourite ? "লিস্ট থেকে মুছে ফেলতে মুছে ফেলুন" : "লিস্টে যোগ করতে চাইলে যোগ করুন"} বাটনে ক্লিক করতে হবে।`}
      />

      <ReusableModal
        open={isModalOpen === "shortlist"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        onConfirm={() => handleShortlist(isShortlisted ? "remove" : "add")}
        confirmText={isShortlisted ? "মুছে ফেলুন" : "যোগ করন"}
        cancelText="বাতিল"
        title={`আপনি কি চুড়ান্ত  ${
          isShortlisted ? "তালিকা থেকে মুছে ফেলতে" : "তালিকায় যোগ করতে"
        } চান?`}
        description={`চুড়ান্ত ${isShortlisted ? "তালিকা থেকে মুছে ফেলতে মুছে ফেলুন" : "তালিকায় যোগ করতে যোগ করুন"} বাটনে ক্লিক করতে হবে।`}
      />
    </div>
  );
}
