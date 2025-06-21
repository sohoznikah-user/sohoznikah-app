"use client";
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
}) => {
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
        {onShortlist && (
          <div className="text-[#222] text-[15px] flex items-center justify-start gap-3">
            <p className="text-md text-[#005381]">চুড়ান্ত তালিকায় রাখুন</p>
            <button onClick={onShortlist}>
              <CircleCheck
                className={`w-5 h-5 rounded-full cursor-pointer ${isShortlisted ? "bg-black text-white" : "bg-gray-400 text-white "}`}
              />
            </button>
          </div>
        )}
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
        {onDelete && (
          <button onClick={onDelete} className="cursor-pointer">
            <Trash2 className="w-5 h-5 text-[#F36B7F]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReusableMobileCard;
