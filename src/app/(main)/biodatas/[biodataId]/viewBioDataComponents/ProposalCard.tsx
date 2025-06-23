// File: src/app/(main)/biodatas/[biodataId]/viewBioDataComponents/HeaderSection.tsx
"use client";
import NeedLoginModal from "@/components/shared/NeedLoginModal";
import PolicySection from "@/components/shared/PolicySection";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { Card, CardContent } from "@/components/ui/card";
import { tokenDetailsData } from "@/lib/tokenDetailsData";
import {
  useCreateContactMutation,
  useGetContactByBiodataIdQuery,
} from "@/redux/features/admin/contactApi";
import {
  useCreateProposalMutation,
  useGetProposalByBiodataIdQuery,
  useUpdateProposalMutation,
} from "@/redux/features/admin/proposalApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { ArrowLeft, Copy, Send } from "lucide-react";
import { useRouter } from "next/navigation";
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
  console.log("biodataId", biodataId);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const { biodata: myBiodataData } = useAppSelector(
    (state: RootState) => state.biodata
  );
  const [activeTab, setActiveTab] = useState<"proposal" | "contact">(
    "proposal"
  );
  const [responseTab, setResponseTab] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [needTimeDecision, setNeedTimeDecision] = useState<string>("");
  const router = useRouter();

  const [createProposal, { isLoading }] = useCreateProposalMutation();
  const [updateProposal, { isLoading: isUpdateProposalLoading }] =
    useUpdateProposalMutation();
  const [createContact, { isLoading: isCreateContactLoading }] =
    useCreateContactMutation();

  const { data: getProposal } = useGetProposalByBiodataIdQuery(biodataId, {
    skip: !token || !user || activeTab !== "proposal",
  });

  const { data: getContact } = useGetContactByBiodataIdQuery(biodataId, {
    skip: !token || !user || activeTab !== "contact",
  });

  console.log("getProposal", getProposal);
  // console.log("getContact", getContact);
  // create proposal
  const handleCreateProposal = async () => {
    if (!token || !user) {
      toast.error("প্রস্তাব পাঠাতে চাইলে প্রথমে লগ ইন করতে হবে।");
      router.push("/login");
      return;
    }
    const proposalData = {
      biodataId: biodata?.id,
    };
    try {
      const res = await createProposal(proposalData).unwrap();

      // console.log("res-proposal", res);
      if (res?.success) {
        toast.success("প্রস্তাব পাঠানো হয়েছে");
      } else {
        toast.error("প্রস্তাব পাঠানো হয়নি");
      }
    } catch (error: any) {
      if (error.message === "Not enough tokens") {
        toast.error("আপনার পর্যাপ্ত টোকেন নেই। দয়া করে টোকেন কিনুন।");
        router.push("/dashboard/token");
        return;
      }
      toast.error(error?.message || "প্রস্তাব পাঠানো হয়নি");
    } finally {
      handleReset();
    }
  };
  // create contact access
  const handleCreateContactAccess = async () => {
    if (!token || !user) {
      toast.error("অনুরোধ পাঠাতে চাইলে প্রথমে লগ ইন করতে হবে।");
      return;
    }
    const contactData = {
      biodataId: biodata?.id,
    };
    try {
      const res = await createContact(contactData).unwrap();
      if (res?.success) {
        toast.success("অনুরোধ পাঠানো হয়েছে");
      } else {
        toast.error("অনুরোধ পাঠানো হয়নি");
      }
    } catch (error: any) {
      if (error.message === "Not enough tokens") {
        toast.error("আপনার পর্যাপ্ত টোকেন নেই। দয়া করে টোকেন কিনুন।");
        router.push("/dashboard/token");
        return;
      }
      toast.error(error?.message || "অনুরোধ পাঠানো হয়নি");
    } finally {
      setIsModalOpen(null);
    }
  };
  // send response to proposal
  const handleSendResponse = async () => {
    if (!token || !user || !selectedResponse) {
      return;
    }
    try {
      const res = await updateProposal({
        id: getProposal?.data?.id,
        updatedData: {
          response: selectedResponse,
        },
      }).unwrap();
      if (res?.success) {
        toast.success("প্রস্তাব রেসপন্স করা হয়েছে");
      } else {
        toast.error("প্রস্তাব রেসপন্স করা হয়নি");
      }
    } catch (error: any) {
      toast.error(error?.message || "কোনো কিছু ভুল হয়েছে। পুনরায় চেষ্টা করুন");
    } finally {
      handleReset();
    }
  };

  // console.log({ user, token });
  // reset state
  const handleReset = () => {
    setIsModalOpen(null);
    setResponseTab(null);
    setSelectedResponse(null);
    setNeedTimeDecision("");
  };

  const proposalTimeLeft = getTimeDifference(
    getProposal?.data?.expiredAt || new Date().toISOString(),
    new Date().toISOString()
  );
  const contactTimeLeft = getTimeDifference(
    getContact?.data?.contactExpiredAt || new Date().toISOString(),
    new Date().toISOString()
  );
  // console.log("timeLeft", timeLeft);
  return (
    <>
      {/* Proposal  & contact card*/}
      <Card className="bg-white text-black border-none rounded-4xl h-full   md:max-w-[450px] w-full min-w-auto">
        <CardContent className=" h-full lg:px-10 p-5">
          {myBiodata || isAdmin || myBiodataData?.id === biodataId ? (
            <div className="flex justify-center items-center h-full">
              <h3 className="text-2xl font-semibold text-center mb-2 text-[#b52d1f]">
                {myBiodata || myBiodataData?.id === biodataId
                  ? "আমার বায়োডাটা"
                  : "আপনার এখানে এক্সেস নেই"}
              </h3>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 items-center mt-2">
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
                    <div className="flex flex-col items-center justify-center">
                      {/* proposal receiver */}
                      {getProposal?.data?.receivedProposal && (
                        <>
                          {getProposal?.data?.sentProposal?.status ===
                            "PENDING" && (
                            <>
                              {responseTab === "response-proposal" ? (
                                <>
                                  <div className="flex items-center gap-3 justify-start ">
                                    <ArrowLeft
                                      className="w-6 h-6 cursor-pointer hover:text-[#e25a6f] text-[#016CA7] "
                                      onClick={() => setResponseTab(null)}
                                    />{" "}
                                    <p className="text-lg font-semibold">
                                      প্রস্তাবে রেসপন্স করুন
                                    </p>
                                  </div>
                                  {/* Radio group and Send button */}

                                  <div className="flex flex-col items-center mt-2 mb-2">
                                    <div className="flex flex-col gap-2 w-full max-w-xs">
                                      <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="radio"
                                          name="proposalResponse"
                                          value="ACCEPTED"
                                          checked={
                                            selectedResponse === "ACCEPTED"
                                          }
                                          onChange={() =>
                                            setSelectedResponse("ACCEPTED")
                                          }
                                          className="accent-[#016CA7] w-5 h-5"
                                        />
                                        <span className="text-md font-medium text-[#00476E]">
                                          আগ্রহী
                                        </span>
                                      </label>
                                      <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="radio"
                                          name="proposalResponse"
                                          value="REJECTED"
                                          checked={
                                            selectedResponse === "REJECTED"
                                          }
                                          onChange={() =>
                                            setSelectedResponse("REJECTED")
                                          }
                                          className="accent-[#016CA7] w-5 h-5"
                                        />
                                        <span className="text-md font-medium text-[#00476E]">
                                          অনাগ্রহী
                                        </span>
                                      </label>
                                      <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="radio"
                                          name="proposalResponse"
                                          value="NEED_TIME"
                                          checked={
                                            selectedResponse === "NEED_TIME"
                                          }
                                          onChange={() =>
                                            setSelectedResponse("NEED_TIME")
                                          }
                                          className="accent-[#016CA7] w-5 h-5 bg-gray-200"
                                        />
                                        <span className="text-md font-medium text-[#00476E]">
                                          সময় নিতে চাই
                                        </span>
                                      </label>
                                    </div>
                                    <button
                                      className="mt-3 bg-[#e25a6f] text-white px-4 py-1 rounded-md font-semibold text-md shadow hover:bg-[#d14a5f] transition-all cursor-pointer"
                                      onClick={() => handleSendResponse()}
                                      disabled={!selectedResponse}
                                    >
                                      Send
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <h4 className="text-center text-md font-semibold mb-2 mt-1">
                                    এই বায়োডাটা থেকে আপনার কাছে প্রস্তাব এসেছে
                                  </h4>
                                  <p className="text-center text-sm font-medium mb-2 mt-0 text-[#A53521]">
                                    ৭২ ঘন্টার মধ্যে রেসপন্স না করলে অপরপক্ষ
                                    চাইলে প্রস্তাব বাতিল করতে পারবেন।{" "}
                                  </p>
                                  <button
                                    onClick={() =>
                                      setResponseTab("response-proposal")
                                    }
                                    className="bg-[#e25a6f] text-white px-4 py-2 rounded-md cursor-pointer "
                                  >
                                    রেসপন্স করুন
                                  </button>

                                  <p className="text-center text-sm font-semibold mt-3 text-[#575757]">
                                    সময় বাকি আছে:{" "}
                                    <span className="text-[#28AB00]">
                                      {proposalTimeLeft}
                                    </span>{" "}
                                    ঘন্টা
                                  </p>
                                </>
                              )}
                            </>
                          )}
                          {getProposal?.data?.sentProposal?.status ===
                            "ACCEPTED" && (
                            <>
                              <h4 className="text-center text-md font-semibold mb-2 mt-1">
                                এই বায়োডাটা থেকে আপনার কাছে প্রস্তাব এসেছে
                              </h4>
                              <p className="text-center text-md font-semibold mb-2 mt-4 text-[#28AB00] border border-[#28AB00] rounded-md px-6 py-2 max-w-52 mx-auto">
                                আপনি এই প্রস্তাবে আগ্রহ প্রকাশ করেছেন
                              </p>
                            </>
                          )}
                          {getProposal?.data?.sentProposal?.status ===
                            "REJECTED" && (
                            <>
                              <h4 className="text-center text-md font-semibold mb-2 mt-1">
                                এই বায়োডাটা থেকে আপনার কাছে প্রস্তাব এসেছে
                              </h4>
                              <p className="text-center text-md font-semibold mb-2 mt-2 text-[#CC001F] border border-[#CC001F] rounded-md px-6 py-2 max-w-52 mx-auto">
                                আপনি এই প্রস্তাবে অনাগ্রহ প্রকাশ করেছেন
                              </p>
                              <button
                                className="mt-2 bg-[#e25a6f] text-white px-4 py-1 rounded-md font-semibold text-md shadow hover:bg-[#d14a5f] transition-all cursor-pointer"
                                onClick={() => handleCreateProposal()}
                              >
                                আমি প্রস্তাব পাঠাতে চাই
                              </button>
                            </>
                          )}
                          {getProposal?.data?.sentProposal?.status ===
                            "NEED_TIME" && (
                            <>
                              <h4 className="text-center text-md font-semibold mb-2 mt-1">
                                এই বায়োডাটা থেকে আপনার কাছে প্রস্তাব এসেছে
                              </h4>
                              <p className="text-center text-md font-semibold text-[#915E00] border border-[#915E00] rounded-md px-6 py-1 max-w-52 mx-auto">
                                আপনি এই প্রস্তাবে সিদ্ধান্ত নিতে সময় নিচ্ছেন
                              </p>
                              <div className="flex justify-between items-center mt-4 gap-2">
                                <div className="relative w-40">
                                  <select
                                    className="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-8 text-md text-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm cursor-pointer"
                                    value={needTimeDecision}
                                    onChange={(e) =>
                                      setNeedTimeDecision(e.target.value)
                                    }
                                  >
                                    <option value="" disabled>
                                      সিলেক্ট করুন
                                    </option>
                                    <option value="ACCEPTED">আগ্রহী</option>
                                    <option value="REJECTED">অনাগ্রহী</option>
                                  </select>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                    ▼
                                  </span>
                                </div>
                                <button
                                  className="bg-[#e25a6f] px-5 py-2 rounded-xl cursor-pointer hover:bg-[#d14a5f] flex items-center justify-center"
                                  disabled={!needTimeDecision}
                                  onClick={async () => {
                                    if (!needTimeDecision) {
                                      toast.error("সিলেক্ট করুন");
                                      return;
                                    }

                                    await updateProposal({
                                      id: getProposal?.data?.id,
                                      updatedData: {
                                        response: needTimeDecision,
                                      },
                                    });
                                    setNeedTimeDecision("");
                                  }}
                                >
                                  <Send
                                    className="h-6 w-6"
                                    fill="white"
                                    stroke="#e25a6f"
                                    strokeOpacity={0.5}
                                  />
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {/* proposal sender */}
                      {getProposal?.data?.sentProposal && (
                        <>
                          {getProposal?.data?.sentProposal?.status ===
                            "PENDING" && (
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
                                      {proposalTimeLeft}
                                    </span>{" "}
                                    ঘন্টা
                                  </p>
                                </>
                              )}
                            </>
                          )}
                          {getProposal?.data?.sentProposal?.status ===
                            "ACCEPTED" && (
                            <>
                              <h4 className="text-center text-md font-semibold mb-2 mt-3">
                                আপনি প্রস্তাব পাঠিয়েছেন{" "}
                              </h4>
                              <p className="text-center text-md font-semibold mb-2 mt-4 text-[#28AB00] border border-[#28AB00] rounded-md px-6 py-2 max-w-52 mx-auto">
                                আপনার প্রস্তাবে আগ্রহ প্রকাশ করেছেন
                              </p>
                            </>
                          )}
                          {getProposal?.data?.sentProposal?.status ===
                            "REJECTED" && (
                            <>
                              <h4 className="text-center text-md font-semibold mb-2 mt-2">
                                আপনি প্রস্তাব পাঠিয়েছেন{" "}
                              </h4>
                              <p className="text-center text-md font-semibold mb-2 mt-4 text-[#CC001F] border border-[#CC001F] rounded-md px-6 py-2 max-w-52 mx-auto">
                                আপনার প্রস্তাবে আগ্রহী নয়{" "}
                              </p>
                            </>
                          )}
                          {getProposal?.data?.sentProposal?.status ===
                            "NEED_TIME" && (
                            <>
                              <h4 className="text-center text-md font-semibold mb-2 mt-2">
                                আপনি প্রস্তাব পাঠিয়েছেন{" "}
                              </h4>
                              <p className="text-center text-md font-semibold text-[#915E00] border border-[#915E00] rounded-md px-6 py-2 max-w-52 mx-auto mt-4">
                                প্রস্তাবে সিদ্ধান্ত নিতে সময় নিচ্ছেন{" "}
                              </p>
                              {/* <div className="flex justify-between items-center mt-4 gap-2">
                                <div className="relative w-40">
                                  <select
                                    className="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-8 text-md text-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm cursor-pointer"
                                    value={needTimeDecision}
                                    onChange={(e) =>
                                      setNeedTimeDecision(e.target.value)
                                    }
                                  >
                                    <option value="" disabled>
                                      সিলেক্ট করুন
                                    </option>
                                    <option value="ACCEPTED">আগ্রহী</option>
                                    <option value="REJECTED">অনাগ্রহী</option>
                                  </select>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                    ▼
                                  </span>
                                </div>
                                <button
                                  className="bg-[#e25a6f] px-5 py-2 rounded-xl cursor-pointer hover:bg-[#d14a5f] flex items-center justify-center"
                                  disabled={!needTimeDecision}
                                  onClick={async () => {
                                    if (!needTimeDecision) {
                                      toast.error("সিলেক্ট করুন");
                                      return;
                                    }

                                    await updateProposal({
                                      id: getProposal?.data?.id,
                                      updatedData: {
                                        response: needTimeDecision,
                                      },
                                    });
                                    setNeedTimeDecision("");
                                  }}
                                >
                                  <Send
                                    className="h-6 w-6"
                                    fill="white"
                                    stroke="#e25a6f"
                                    strokeOpacity={0.5}
                                  />
                                </button>
                              </div> */}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-semibold text-center mb-2 mt-3 text-[#b52d1f]">
                        আপনি আগ্রহী?
                      </div>
                      <div className="text-black text-center text-md font-bold mb-3 mt-1">
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
                          className="bg-[#e25a6f] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#d14a5f] flex items-center justify-center"
                          onClick={() =>
                            setIsModalOpen(
                              !token || !user ? "login" : "createProposal"
                            )
                          }
                        >
                          <Send
                            className="h-6 w-6"
                            fill="white"
                            stroke="#e25a6f"
                            strokeOpacity={0.5}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-6 mt-2">
                        <button
                          className="text-sm text-center text-[#2563EB] hover:underline mt-2 font-medium cursor-pointer"
                          onClick={() => {
                            setIsModalOpen("token");
                          }}
                        >
                          টোকেন সম্পর্কে
                        </button>
                        <button
                          className="text-sm text-center text-[#2563EB] hover:underline mt-2 font-medium cursor-pointer"
                          onClick={() => {
                            setIsModalOpen("token-details");
                          }}
                        >
                          বিস্তারিত জানুন
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
              {activeTab === "contact" && (
                <>
                  {getContact?.data?.senderId === user?.userId ? (
                    <div className="flex flex-col items-center justify-center">
                      {/* contact sender */}

                      <>
                        {getContact?.data?.contactStatus === "PENDING" && (
                          <>
                            <h4 className="text-center text-md font-semibold mb-2 mt-2">
                              আপনি যোগাযোগের জন্য অনুরোধ পাঠিয়েছেন
                            </h4>

                            <p className="text-center text-sm font-medium mb-2  text-[#A53521]">
                              অপরপক্ষ একসেপ্ট করলে সরাসরি অভিভাবকের যোগাযোগ
                              নম্বর দেখতে পারবেন। রাজি না থাকলে আপনি টোকেন
                              রিফান্ড পাবেন। ৭২ ঘণ্টার মধ্যে উত্তর না আসলে
                              অটোমেটিক অনুরোধটি বাতিল হবে এবং টোকেন রিফান্ড
                              পাবেন।
                            </p>

                            <p className="text-center text-sm font-semibold mt-1 text-[#575757]">
                              সময় বাকি আছে:{" "}
                              <span className="text-[#28AB00]">
                                {contactTimeLeft}
                              </span>{" "}
                              ঘন্টা
                            </p>
                          </>
                        )}
                        {getContact?.data?.contactStatus === "ACCEPTED" && (
                          <>
                            {responseTab === "viewContact" ? (
                              <>
                                <div className="flex items-center gap-3 justify-start ">
                                  <ArrowLeft
                                    className="w-6 h-6 cursor-pointer hover:text-[#e25a6f] text-[#016CA7] "
                                    onClick={() => setResponseTab(null)}
                                  />{" "}
                                  <p className="text-lg font-semibold">
                                    {getContact?.data?.fullName}
                                  </p>
                                </div>
                                <div className="w-full max-w-xs mt-2 mb-2 border border-gray-300 rounded-md bg-white">
                                  <div className="grid grid-cols-5 border-b border-gray-200">
                                    <div className="py-1 px-3 text-center font-semibold text-[#016CA7] border-r border-gray-200 col-span-2">
                                      সম্পর্ক
                                    </div>
                                    <div className="py-1 px-3 text-center font-semibold text-[#016CA7] col-span-3">
                                      মোবাইল নম্বর
                                    </div>
                                  </div>
                                  {getContact?.data?.contacts?.map(
                                    (contact: any, idx: number) => (
                                      <div
                                        key={idx}
                                        className="grid grid-cols-5 border-b last:border-b-0 border-gray-100"
                                      >
                                        <div className="py-2 px-3 text-center text-black col-span-2">
                                          {contact.relation}
                                        </div>
                                        <div className="py-2 px-3 flex items-center justify-center gap-2 col-span-3 text-center">
                                          <span className="text-black">
                                            {contact.phoneNumber}
                                          </span>
                                          <button
                                            className="ml-1 p-1 rounded hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                              navigator.clipboard.writeText(
                                                contact.phoneNumber
                                              );
                                              toast.success(
                                                "নম্বর কপি করা হয়েছে"
                                              );
                                            }}
                                            title="Copy"
                                          >
                                            <Copy className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <h4 className="text-center text-md font-semibold mb-2 mt-3">
                                  আপনি যোগাযোগের জন্য অনুরোধ পাঠিয়েছেন
                                </h4>
                                <h4 className="text-center text-md font-semibold mb-3 mt-1 text-[#129900]">
                                  অনুরোধ গৃহীত হয়েছে
                                </h4>
                                <button
                                  className="mt-1 bg-[#129900] text-white px-6 py-2 rounded-lg font-semibold text-md shadow hover:bg-[#129900ee] transition-all cursor-pointer"
                                  onClick={() => setResponseTab("viewContact")}
                                >
                                  যোগাযোগ নম্বর দেখুন
                                </button>
                              </>
                            )}
                          </>
                        )}
                        {getContact?.data?.contactStatus === "REJECTED" && (
                          <>
                            <h4 className="text-center text-md font-semibold mb-2 mt-2">
                              আপনি যোগাযোগের জন্য অনুরোধ পাঠিয়েছেন
                            </h4>
                            <p className="text-center text-md font-semibold mb-2 mt-4 text-[#CC001F] border border-[#CC001F] rounded-md px-6 py-2 max-w-52 mx-auto">
                              অপরপক্ষ অনুরোধ প্রত্যাখ্যান করেছেন
                            </p>
                            <p className="text-sm text-center text-[#e25a6f] font-semibold ">
                              ২টি টোকেন রিফান্ড পেয়েছেন
                            </p>
                          </>
                        )}
                      </>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-between w-full gap-3  rounded-xl mt-2 mb-2 ">
                        <div className="font-bold text-md text-black text-center">
                          এই বায়োডাটার অভিভাবকের যোগাযোগ নম্বর দেখার জন্য অনুরোধ
                          পাঠান
                        </div>

                        <button
                          className="mt-1 bg-[#e25a6f] text-white px-4 py-2 rounded-lg font-semibold text-md shadow hover:bg-[#d14a5f] transition-all cursor-pointer"
                          onClick={() =>
                            setIsModalOpen(
                              !token || !user ? "login" : "createContact"
                            )
                          }
                        >
                          অনুরোধ পাঠান
                        </button>

                        <p className="text-sm text-center text-[#e25a6f] font-semibold ">
                          ২টি টোকেন খরচ হবে
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-6 mt-2">
                        <button
                          className="text-sm text-center text-[#2563EB] hover:underline mt-2 font-medium cursor-pointer"
                          onClick={() => {
                            setIsModalOpen("token");
                          }}
                        >
                          টোকেন সম্পর্কে
                        </button>
                        <button
                          className="text-sm text-center text-[#2563EB] hover:underline mt-2 font-medium cursor-pointer"
                          onClick={() => {
                            setIsModalOpen("token-details");
                          }}
                        >
                          বিস্তারিত জানুন
                        </button>
                      </div>
                    </>
                  )}

                  {(token === null || user === null) && (
                    <>
                      <div className="flex flex-col items-center justify-between w-full gap-3  rounded-xl mt-2 mb-2 ">
                        <div className="font-bold text-md text-black text-center">
                          এই বায়োডাটার অভিভাবকের যোগাযোগ নম্বর দেখার জন্য অনুরোধ
                          পাঠান
                        </div>

                        <button
                          className="mt-1 bg-[#e25a6f] text-white px-4 py-2 rounded-lg font-semibold text-md shadow hover:bg-[#d14a5f] transition-all cursor-pointer"
                          onClick={() =>
                            setIsModalOpen(
                              !token || !user ? "login" : "createContact"
                            )
                          }
                        >
                          অনুরোধ পাঠান
                        </button>

                        <p className="text-sm text-center text-[#e25a6f] font-semibold ">
                          ২টি টোকেন খরচ হবে
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-6 mt-2">
                        <button
                          className="text-sm text-center text-[#2563EB] hover:underline mt-2 font-medium cursor-pointer"
                          onClick={() => {
                            setIsModalOpen("token");
                          }}
                        >
                          টোকেন সম্পর্কে
                        </button>
                        <button
                          className="text-sm text-center text-[#2563EB] hover:underline mt-2 font-medium cursor-pointer"
                          onClick={() => {
                            setIsModalOpen("token-details");
                          }}
                        >
                          বিস্তারিত জানুন
                        </button>
                      </div>
                    </>
                  )}
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
      <ReusableModal
        open={isModalOpen === "createProposal"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        onConfirm={() => handleCreateProposal()}
        confirmText="প্রস্তাব পাঠান"
        cancelText="বাতিল"
        title={`আপনি কি প্রস্তাব পাঠাতে চান?`}
        description={`প্রস্তাব পাঠাতে চাইলে প্রস্তাব পাঠান বাটনে ক্লিক করতে হবে। ১টি টোকেন খরচ হবে।`}
      />

      {/* Modal for shortlist */}
      <ReusableModal
        open={isModalOpen === "createContact"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        onConfirm={() => handleCreateContactAccess()}
        confirmText="অনুরোধ পাঠান"
        cancelText="বাতিল"
        title={`যোগাযোগ নম্বর দেখার জন্য অনুরোধ পাঠাতে চান?`}
        description={`অনুরোধ পাঠাতে চাইলে অনুরোধ পাঠান বাটনে ক্লিক করতে হবে। ২টি টোকেন খরচ হবে।`}
      />

      {/* Modal for token */}
      <ReusableModal
        open={isModalOpen === "token"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        fullScreen={true}
        hideFooter={true}
        title="No Title"
      >
        <div className="">
          {/* Current Token Count */}
          <div className="text-center text-xl md:text-2xl font-semibold mb-2">
            আপনার বর্তমান টোকেন সংখ্যা:{" "}
            <span className="text-[#b52d1f] text-xl md:text-2xl font-bold ">
              {myBiodataData?.token || 0}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-6 mb-4">
            {/* What is Token */}
            <div className="flex-1">
              <div className="text-[#b52d1f] text-lg font-bold mb-2">
                টোকেন কি?
              </div>
              <div className="text-md text-gray-800">
                টোকেন খরচ করে আপনি পছন্দের বায়োডাটায় প্রস্তাব পাঠাতে পারবেন এবং
                অভিভাবকের যোগাযোগ নম্বর দেখতে পারবেন।
              </div>
            </div>
            {/* Token Usage */}
            <div className="flex-1">
              <div className="text-[#b52d1f] text-lg font-bold mb-2">
                টোকেনের ব্যবহার
              </div>
              <ul className="text-sm text-gray-800 list-disc pl-5">
                <li>প্রতি টোকেনের মূল্য ৫০ টাকা।</li>
                <li>১টি বায়োডাটায় প্রস্তাব পাঠাতে ১টি টোকেন প্রয়োজন হবে।</li>
                <li>
                  ১টি বায়োডাটার অভিভাবকের যোগাযোগ নম্বর দেখতে ২টি টোকেন প্রয়োজন
                  হবে।
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-5 border-gray-400" />
          {/* Details Section */}
          <div className=" text-md text-gray-700 mb-4 ">
            আপনি প্রাথমিক প্রস্তাব পাঠাতে চাইলে বা অভিভাবকের যোগাযোগ নম্বর নিতে
            চাইলে টোকেন খরচ করতে হয়। তাই আগে টোকেন কিনতে হবে।
            <br />
            <br />
            বোঝার স্বার্থে ধরুন, আপনি পার্কে বেড়াতে গেলেন। সেখানে অনেক রাইডস
            আছে। নাগরদোলা আছে, রেলগাড়ি আছে, নৌকা আছে। আপনি ৩টি রাইডেই চড়তে চান।
            এর জন্য আপনাকে ৩টি টিকেট কাটতে হবে। প্রতি টিকেট ৫০ টাকা হলে ১৫০ টাকা
            লাগবে। এখন আপনি রেলগাড়িতে চড়তে গেলে শুধু টিকেট দেখাতে হবে, কোনো টাকা
            দিতে হবে না। অর্থাৎ সেখানে আপনার ১টি টিকেট খরচ হয়ে গেলো। বাকি ২টা
            রাইডে যখন চড়তে যাবেন তখন ২টি টিকেট খরচ হবে। আপনি আরো অন্য যে কয়টা
            রাইডে চড়তে চান, আবার সেই কয়টা টিকেট কিনতে হবে।
            <br />
            <br />
            আমাদের টোকেন সিস্টেমটি ওই টিকেটের মত। আগে টোকেন কিনতে হবে। তারপর যখন
            প্রস্তাব পাঠাতে বা যোগাযোগ করতে চাইবেন তখন শুধু টোকেন খরচ হবে, টাকা
            নয়।
          </div>
          {/* Buy Token Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-[#232d36] hover:bg-[#1a2228] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition-all cursor-pointer"
              onClick={() => {
                setIsModalOpen(null);
                router.push("/dashboard/token");
              }}
            >
              টোকেন কিনুন
            </button>
          </div>
        </div>
      </ReusableModal>

      {/* Modal for token details */}
      <ReusableModal
        open={isModalOpen === "token-details"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        fullScreen={true}
        hideFooter={true}
        title="No Title"
      >
        <div className="flex flex-col gap-10">
          <PolicySection data={tokenDetailsData.slice(0, 2)} />
          <PolicySection data={tokenDetailsData.slice(2, 4)} />
          <h2 className="text-lg font-semibold text-[#AB2929] text-center">
            শুধুমাত্র বায়োডাটা ডিলিট করলে অবশিষ্ট টোকেনের মূল্য অর্থাৎ টাকা
            রিফান্ড করা হয়।
          </h2>
        </div>
      </ReusableModal>
    </>
  );
};

export default ProposalCard;
