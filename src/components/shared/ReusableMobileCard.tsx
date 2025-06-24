"use client";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { format } from "date-fns";
import { CircleCheck, Trash2 } from "lucide-react";
import React from "react";

interface ReusableMobileCardProps {
  isShortlisted?: boolean;
  biodataNo?: string;
  permanentAddress?: string;
  visibility?: string;
  date: string;
  type?: string;
  isRead?: boolean;
  onDelete?: () => void;
  onView?: () => void;
  onShortlist?: () => void;
  activeTab?: string;
  myResponse?: string;
  otherResponse?: string;
  isCancelled?: boolean;
  expiredAt?: string;
}

const ReusableMobileCard: React.FC<ReusableMobileCardProps> = ({
  isShortlisted,
  visibility,
  biodataNo,
  permanentAddress,
  date,
  onDelete,
  onView,
  onShortlist,
  activeTab,
  myResponse,
  otherResponse,
  isCancelled,
  expiredAt,
}) => {
  console.log("activeTab", activeTab);
  const timeLeft = getTimeDifference(expiredAt, new Date().toISOString());

  return (
    <div
      className={`border-[#B3D6F6] border-none rounded-xl shadow-md p-4 flex justify-between min-w-0 cursor-pointer relative bg-white`}
    >
      <div className={` flex flex-col justify-between gap-1`}>
        {biodataNo && (
          <p className="text-md relative font-semibold pb-0.5">
            <span className="text-[#005381]">বায়োডাটা নং:</span> {biodataNo}
            {visibility === "PRIVATE" && (
              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm absolute top-0 right-0">
                প্রাইভেট
              </span>
            )}
          </p>
        )}
        {permanentAddress && (
          <p className="text-md text-[#005381] pb-0.5">
            স্থায়ী: {permanentAddress}
          </p>
        )}
        {onShortlist && activeTab === "myRecords" && (
          <div className="text-[#222] text-[15px] flex items-center justify-start gap-3">
            <p className="text-md text-[#005381]">চুড়ান্ত তালিকায় রাখুন</p>
            <button onClick={onShortlist}>
              <CircleCheck
                className={`w-5 h-5 rounded-full cursor-pointer ${isShortlisted ? "bg-black text-white" : "bg-gray-400 text-white "}`}
              />
            </button>
          </div>
        )}

        <div className="">
          <>
            {activeTab === "myRecords" && myResponse && (
              <div className="text-md text-[#005381] flex items-center justify-start gap-2 flex-1">
                আপনার রেসপন্স:
                {myResponse === "PENDING" ? (
                  <p className="text-center px-3 py-1 border-blue-500 border-2 rounded-lg text-blue-500 text-md font-semibold">
                    পেন্ডিং
                  </p>
                ) : myResponse === "ACCEPTED" ? (
                  <p className="text-center px-3 py-1 border-green-500 border-2 rounded-lg text-green-500 text-md font-semibold">
                    আগ্রহী
                  </p>
                ) : myResponse === "REJECTED" ? (
                  <p className="text-center px-3 py-1 border-red-500 border-2 rounded-lg text-red-500 text-md font-semibold">
                    অনাগ্রহী
                  </p>
                ) : myResponse === "NEED_TIME" ? (
                  <p className="text-center px-3 py-1 border-yellow-500 border-2 rounded-lg text-yellow-500 text-md font-semibold">
                    সময় নিতে ইচ্ছুক
                  </p>
                ) : (
                  ""
                )}
              </div>
            )}
            {activeTab === "othersRecords" && otherResponse && (
              <div className="text-md text-[#005381] flex items-center justify-start gap-2">
                অপরপক্ষের রেসপন্স:
                {otherResponse === "PENDING" ? (
                  <p className="text-center px-3 py-1 border-blue-500 border-2 rounded-lg text-blue-500 text-md font-semibold">
                    পেন্ডিং
                  </p>
                ) : otherResponse === "ACCEPTED" ? (
                  <p className="text-center px-3 py-1 border-green-500 border-2 rounded-lg text-green-500 text-md font-semibold">
                    আগ্রহী
                  </p>
                ) : otherResponse === "REJECTED" ? (
                  <p className="text-center px-3 py-1 border-red-500 border-2 rounded-lg text-red-500 text-md font-semibold">
                    অনাগ্রহী
                  </p>
                ) : otherResponse === "NEED_TIME" ? (
                  <p className="text-center px-3 py-1 border-yellow-500 border-2 rounded-lg text-yellow-500 text-md font-semibold">
                    সময় নিতে ইচ্ছুক
                  </p>
                ) : (
                  ""
                )}
              </div>
            )}
          </>

          <div className="flex items-center justify-end gap-2">
            {isCancelled ? (
              <button className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 transition">
                প্রস্তাবটি বাতিল করা হয়েছে
              </button>
            ) : timeLeft === "00:00" ? (
              <button
                className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded hover:bg-red-600 transition"
                onClick={() => {
                  // setSelectedId(row?.original?.id);
                  // setIsModalOpen("cancel");
                }}
              >
                প্রস্তাবটি বাতিল করুন
              </button>
            ) : (
              <>
                {myResponse === "PENDING" || otherResponse === "PENDING" ? (
                  <div className="flex items-center justify-end gap-2">
                    <span>সময় বাকি আছে:</span>{" "}
                    <span className="text-[#009F69E0]">{timeLeft} ঘন্টা</span>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6 gap-2">
        {onView && (
          <button
            onClick={onView}
            className="text-md bg-[#E25A6F] text-white px-3 py-1 rounded-md cursor-pointer"
          >
            বায়োডাটা দেখুন
          </button>
        )}
      </div>
      <div className="absolute top-5 -translate-y-1/2 right-4 flex items-center gap-2">
        <span className="text-[13px] text-[#A1A1A1]">
          {format(date, "dd MMM yyyy")}
        </span>
        {onDelete && activeTab === "myRecords" && (
          <button onClick={onDelete} className="cursor-pointer">
            <Trash2 className="w-5 h-5 text-[#F36B7F]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReusableMobileCard;
