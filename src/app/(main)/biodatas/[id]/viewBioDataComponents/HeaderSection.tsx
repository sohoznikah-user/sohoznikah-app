// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/HeaderSection.tsx
"use client";
import Loading from "@/app/loading";
import { BiodataFormData } from "@/lib/types";
import HeaderShortBio from "./HeaderShortBio";
import HeaderSpousePreferenceRequierment from "./HeaderSpousePreferenceRequierment";
import ProfileCard from "./ProfileCard";
import ProposalCard from "./ProposalCard";

export default function HeaderSection({
  biodata,
  biodataId,
  biodataFormData,
  myBiodata,
  isAdmin,
}: {
  biodata: any;
  biodataId?: string;
  biodataFormData: BiodataFormData;
  myBiodata: boolean;
  isAdmin?: boolean;
}) {
  if (!biodata) return <Loading />;

  return (
    <div className="bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <div className=" container mx-auto px-4 py-12 flex justify-center ">
        <div className="min-w-7xl flex space-x-8">
          <div className="w-1/4 flex flex-col justify-between space-y-8">
            {/* Status & Profile card */}
            <ProfileCard
              biodataId={biodataId}
              biodata={biodata}
              myBiodata={myBiodata}
              isAdmin={isAdmin}
            />

            <ProposalCard
              biodataId={biodataId}
              biodata={biodata}
              myBiodata={myBiodata}
              isAdmin={isAdmin}
            />
          </div>

          {/* Biodata & Spouse Preference card */}
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
    </div>
  );
}
