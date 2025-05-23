// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/HeaderSection.tsx
"use client";
import Loading from "@/app/loading";
import male from "@/assets/images/male-5.svg";
import Alert from "@/components/ui/Alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCreateFavouriteMutation,
  useDeleteFavouriteMutation,
  useGetFavouriteByIdQuery,
} from "@/redux/features/admin/favouriteApi";
import { useCreateProposalMutation } from "@/redux/features/admin/proposalApi";
import {
  useCreateShortlistMutation,
  useDeleteShortlistMutation,
  useGetShortlistByIdQuery,
} from "@/redux/features/admin/shortlistApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { CircleChevronDown, Copy, Heart, IdCard, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeaderShortBio from "./HeaderShortBio";
import HeaderSpousePreferenceRequierment from "./HeaderSpousePreferenceRequierment";

export default function HeaderSection({
  biodata,
  biodataId,
}: {
  biodata: any;
  biodataId: string;
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  console.log("token", token);
  console.log("user", user);
  console.log("biodataId", biodataId);
  console.log("biodata", biodata);

  const { data: favourite } = useGetFavouriteByIdQuery(biodataId, {
    skip: !token || !user,
  });
  const { data: shortlist } = useGetShortlistByIdQuery(biodataId, {
    skip: !token || !user,
  });

  console.log("favourite", isFavourite, favourite);
  console.log("shortlist", isShortlisted, shortlist);

  const [createFavourite, { isLoading }] = useCreateFavouriteMutation();
  const [deleteFavourite, { isLoading: isDeleting }] =
    useDeleteFavouriteMutation();

  const [createShortlist, { isLoading: isCreatingShortlist }] =
    useCreateShortlistMutation();
  const [deleteShortlist, { isLoading: isDeletingShortlist }] =
    useDeleteShortlistMutation();

  const [createProposal, { isLoading: isCreatingProposal }] =
    useCreateProposalMutation();

  useEffect(() => {
    if (favourite?.data) {
      setIsFavourite(true);
    }
  }, [favourite]);

  useEffect(() => {
    if (shortlist?.data) {
      setIsShortlisted(true);
    }
  }, [shortlist]);

  const handleFavourite = async (type: "add" | "remove") => {
    if (!token || !user) {
      return;
    }
    try {
      if (type === "add") {
        const res = await createFavourite({
          biodataId: biodata?.biodata?.id,
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Added to favourite");
          setIsFavourite(true);
        }
      } else {
        const res = await deleteFavourite(biodata?.biodata?.id).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Removed from favourite");
          setIsFavourite(false);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleShortlist = async (type: "add" | "remove") => {
    if (!token || !user) {
      return;
    }
    try {
      if (type === "add") {
        const res = await createShortlist({
          biodataId: biodata?.biodata?.id,
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Added to shortlist");
          setIsShortlisted(true);
        }
      } else {
        const res = await deleteShortlist(biodata?.biodata?.id).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Removed from shortlist");
          setIsShortlisted(false);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleCopyUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy URL");
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
        toast.success(res?.message || "Proposal sent successfully!");
      } else {
        toast.error(res?.message || "Failed to send proposal");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to send proposal");
    }
  };

  if (!biodata) return <Loading />;

  const status =
    biodata?.biodata?.status === "APPROVED" ? "Verified" : "Unverified";
  const code = biodata?.biodata?.code || "SNM---";

  return (
    <div className="bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <div className=" container mx-auto px-4 py-12 flex justify-center ">
        <div className="min-w-7xl flex space-x-8">
          <div className="w-1/4 flex flex-col space-y-8">
            <Card className="bg-white text-black border-none rounded-4xl">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full flex items-start justify-between">
                    <div className="w-1 text-[#00b754] text-md font-semibold">
                      {status}
                    </div>
                    <Image
                      src={
                        // biodata?.biodata?.profilePic
                        //   ? biodata.biodata.profilePic
                        //   : male
                        male
                      }
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
                    {!token || !user ? (
                      <Alert>
                        <Heart
                          className={`h-6 w-6 cursor-pointer ${
                            isFavourite ? "text-[#e25a6f]" : "text-black"
                          }`}
                          onClick={() =>
                            handleFavourite(isFavourite ? "remove" : "add")
                          }
                          fill={isFavourite ? "red" : "white"}
                        />
                      </Alert>
                    ) : (
                      <Heart
                        className={`h-6 w-6 cursor-pointer ${
                          isFavourite ? "text-[#e25a6f]" : "text-black"
                        }`}
                        onClick={() =>
                          handleFavourite(isFavourite ? "remove" : "add")
                        }
                        fill={isFavourite ? "red" : "white"}
                      />
                    )}
                    {!token || !user ? (
                      <Alert>
                        <IdCard
                          className={`h-6 w-6 cursor-pointer ${
                            isShortlisted ? "text-[#e25a6f]" : "text-black"
                          }`}
                          onClick={() =>
                            handleShortlist(isShortlisted ? "remove" : "add")
                          }
                        />
                      </Alert>
                    ) : (
                      <IdCard
                        className={`h-6 w-6 cursor-pointer ${
                          isShortlisted ? "text-[#e25a6f]" : "text-black"
                        }`}
                        onClick={() =>
                          handleShortlist(isShortlisted ? "remove" : "add")
                        }
                      />
                    )}

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
            <Card className="bg-white text-black border-none rounded-4xl">
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
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
                    <Alert>
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
                    </Alert>
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
                    className="text-xs text-center hover:underline text-blue-300"
                  >
                    (বিস্তারিত জানুন)
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-3/4 flex space-x-8">
            <HeaderShortBio biodata={biodata} />
            <HeaderSpousePreferenceRequierment biodata={biodata} />
          </div>
        </div>
      </div>
    </div>
  );
}
