// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/HeaderSection.tsx
"use client";
import NeedLoginModal from "@/components/shared/NeedLoginModal";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCreateProposalMutation,
  useGetProposalByBiodataIdQuery,
} from "@/redux/features/admin/proposalApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const ProposalCard = ({
  biodataId,
  biodata,
  myBiodata,
  isAdmin,
}: {
  biodataId: string;
  biodata: any;
  myBiodata: boolean;
  isAdmin?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const [activeTab, setActiveTab] = useState<"proposal" | "contact">(
    "proposal"
  );
  const [createProposal, { isLoading }] = useCreateProposalMutation();
  const { data: getProposal } = useGetProposalByBiodataIdQuery(biodataId, {
    skip: !token || !user || activeTab !== "proposal",
  });

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
    } finally {
      handleReset();
    }
  };

  const handleReset = () => {
    setIsModalOpen(null);
  };

  const timeLeft = getTimeDifference(
    getProposal?.data?.expiredAt || new Date().toISOString(),
    new Date().toISOString()
  );
  // console.log("timeLeft", timeLeft);
  return (
    <>
      {/* Proposal  & contact card*/}
      <Card className="bg-white text-black border-none rounded-4xl h-full">
        <CardContent className="pt-4 h-full">
          {myBiodata || isAdmin ? (
            <div className="flex justify-center items-center h-full">
              <h3 className="text-2xl font-semibold text-center mb-2 text-[#b52d1f]">
                {myBiodata ? "আমার বায়োডাটা" : "আপনার এখানে এক্সেস নেই"}
              </h3>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 items-center">
              {/* Title */}
              <div className="text-2xl font-semibold text-center mb-2 text-[#b52d1f]">
                আপনি আগ্রহী?
              </div>
              {/* Buttons */}
              <div className="flex justify-between mb-4 mt-1 w-full gap-2">
                <button
                  className={` rounded-xl py-1 px-2 z-10 w-full text-md font-semibold cursor-pointer ${
                    activeTab === "proposal"
                      ? "text-white bg-gradient-to-r from-[#e25a6f] to-[#016ca7] z-10"
                      : "text-[#989898] border border-[#989898] z-0"
                  }`}
                  onClick={() => setActiveTab("proposal")}
                >
                  প্রস্তাব পাঠান
                </button>
                <button
                  className={`py-1 rounded-xl px-2 w-full text-md font-semibold cursor-pointer ${
                    activeTab === "contact"
                      ? "text-white bg-gradient-to-r from-[#e25a6f] to-[#016ca7] z-10"
                      : "text-[#989898] border border-[#989898] z-0"
                  }`}
                  onClick={() => setActiveTab("contact")}
                >
                  যোগাযোগ করুন
                </button>
              </div>

              {activeTab === "proposal" && (
                <>
                  {getProposal?.success ? (
                    <>
                      {getProposal?.data?.receiverId === user?.userId && (
                        <>
                          <h4 className="text-center text-md font-semibold mb-2">
                            এই বায়োডাটা থেকে আপনার কাছে প্রস্তাব এসেছে
                          </h4>
                          {getProposal?.data?.status === "PENDING" && (
                            <>
                              <p className="text-center text-sm font-medium mb-2 mt-0 text-[#A53521]">
                                ৭২ ঘন্টার মধ্যে রেসপন্স না করলে অপরপক্ষ চাইলে
                                প্রস্তাব বাতিল করতে পারবেন।{" "}
                              </p>
                              <button className="bg-[#e25a6f] text-white px-4 py-2 rounded-md cursor-pointer">
                                রেসপন্স করুন
                              </button>

                              <p className="text-center text-sm font-semibold mt-1 text-[#575757]">
                                সময় বাকি আছে:{" "}
                                <span className="text-[#28AB00]">
                                  {timeLeft}
                                </span>{" "}
                                ঘন্টা
                              </p>
                            </>
                          )}
                        </>
                      )}
                      {getProposal?.data?.senderId === user?.userId && (
                        <>
                          <h4 className="text-center text-md font-semibold mb-2 mt-2">
                            আপনি প্রস্তাব পাঠিয়েছেন
                          </h4>
                          {getProposal?.data?.status === "PENDING" && (
                            <>
                              <p className="text-center text-sm font-medium mb-2 mt-2 text-[#A53521]">
                                ৭২ ঘন্টার মধ্যে উত্তর না আসলে প্রস্তাব বাতিল
                                করতে পারবেন এবং টোকেন রিফান্ড পাবেন।
                              </p>

                              <p className="text-center text-sm font-semibold mt-1 text-[#575757]">
                                প্রস্তাব বাতিলের সময় বাকি আছে:{" "}
                                <span className="text-[#28AB00]">
                                  {timeLeft}
                                </span>{" "}
                                ঘন্টা
                              </p>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-[#00476E] text-center text-md font-medium mb-2 mt-2">
                        অপরপক্ষ আপনার প্রতি আগ্রহী কিনা জানতে
                      </div>
                      {/* Proposal section */}
                      <div className="flex items-center justify-between w-full  rounded-xl mt-2">
                        <div className="flex flex-col">
                          <div className="font-bold text-md text-black">
                            প্রাথমিক প্রস্তাব পাঠান
                          </div>
                          <div className="text-sm text-[#e25a6f] font-semibold mt-0.5">
                            ১টি টোকেন খরচ হবে
                          </div>
                        </div>
                        <div
                          className="bg-[#e25a6f] p-3 rounded-full cursor-pointer hover:bg-[#d14a5f] flex items-center justify-center"
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

                      <Link
                        href="/tutorial"
                        className="text-sm text-center text-[#2563EB] hover:underline mt-4 font-medium"
                      >
                        বিস্তারিত
                      </Link>
                    </>
                  )}
                </>
              )}
              {activeTab === "contact" && (
                <>
                  <div className="flex items-center justify-between w-full gap-3  rounded-xl mt-4 mb-2 ">
                    <div className="flex flex-col">
                      <div className="font-bold text-md text-black">
                        অভিভাবকের যোগাযোগ তথ্য দেখুন
                      </div>
                      <div className="text-sm text-[#e25a6f] font-semibold mt-0.5">
                        ২টি টোকেন খরচ হবে
                      </div>
                    </div>
                    <div
                      className="bg-[#e25a6f] p-3 rounded-full cursor-pointer hover:bg-[#d14a5f] flex items-center justify-center"
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

                  <Link
                    href="/tutorial"
                    className="text-sm text-center text-[#2563EB] hover:underline mt-2 font-medium"
                  >
                    বিস্তারিত
                  </Link>
                </>
              )}

              {/* Info text */}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal for login */}
      <NeedLoginModal
        open={isModalOpen === "login"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
      />

      {/* Modal for favourite */}
      {/* <ReusableModal
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
      /> */}

      {/* Modal for shortlist */}
      {/* <ReusableModal
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
      /> */}
    </>
  );
};

export default ProposalCard;
