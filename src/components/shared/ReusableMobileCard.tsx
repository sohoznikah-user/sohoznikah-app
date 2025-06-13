"use client";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import React from "react";

interface ReusableMobileCardProps {
  isShortlisted?: boolean;
  view?: string;
  biodataNo?: string;
  permanentAddress?: string;
  visibility?: string;
  message?: string;
  date: string;
  type?: string;
  isRead?: boolean;
  onDelete?: () => void;
  onView?: () => void;
}

const ReusableMobileCard: React.FC<ReusableMobileCardProps> = ({
  isShortlisted,
  view,
  visibility,
  biodataNo,
  permanentAddress,
  message,
  date,
  onDelete,
  onView,
}) => {
  return (
    <div
      className={`border-[#B3D6F6] border-none rounded-xl shadow-md p-4 flex flex-col min-w-0 cursor-pointer relative bg-white`}
    >
      <div className={` font-bold text-base mb-1 flex justify-between gap-1`}>
        {biodataNo && (
          <p className="text-[15px] relative">
            বায়োডাটা নং: {biodataNo}
            {visibility === "PRIVATE" && (
              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm absolute top-0 right-0">
                প্রাইভেট
              </span>
            )}
          </p>
        )}
        {permanentAddress && (
          <p className="text-[15px]">স্থায়ী: {permanentAddress}</p>
        )}
        {message && (
          <div className="text-[#222] text-[15px] py-2 mr-5">{message}</div>
        )}
      </div>
      <div>
        {biodataNo && <p className="text-[15px]">{biodataNo}</p>}
        {permanentAddress && <p className="text-[15px]">{permanentAddress}</p>}
        {message && (
          <div className="text-[#222] text-[15px] py-2 mr-5">{message}</div>
        )}
      </div>
      <div className="absolute top-5 -translate-y-1/2 right-4 flex items-center gap-2">
        <span className="text-[13px] text-[#A1A1A1]">
          {format(date, "dd MMM yyyy")}
        </span>
        <button onClick={onDelete}>
          <Trash2 className="w-5 h-5 text-[#F36B7F]" />
        </button>
      </div>
    </div>
  );
};

export default ReusableMobileCard;
