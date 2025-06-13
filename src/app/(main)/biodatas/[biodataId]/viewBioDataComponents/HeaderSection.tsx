// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/HeaderSection.tsx
"use client";
import Loading from "@/app/loading";
import { BiodataFormData } from "@/lib/types";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";
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
  biodata: IBiodata;
  biodataId?: string;
  biodataFormData?: BiodataFormData;
  myBiodata?: boolean;
  isAdmin?: boolean;
}) {
  // console.log("biodata from header section", biodata);
  // console.log("biodataFormData from header section", biodataFormData);
  // console.log("biodataId from header section", biodataId);
  // console.log("myBiodata from header section", myBiodata);
  // console.log("isAdmin from header section", isAdmin);

  if (!biodata) return <Loading />;

  return (
    <div className="bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <div className=" container mx-auto px-4 py-12 ">
        <div className="lg:min-w-5xl w-full flex lg:flex-row flex-col mx-auto lg:gap-6 gap-5">
          <div className="flex-1 w-full flex flex-col items-center justify-between gap-5">
            {/* Status & Profile card */}
            <ProfileCard
              biodataId={biodataId}
              biodata={biodata}
              myBiodata={myBiodata}
              isAdmin={isAdmin}
            />

            <div className="hidden lg:block w-full h-full">
              <ProposalCard
                biodataId={biodataId}
                biodata={biodata}
                myBiodata={myBiodata}
                isAdmin={isAdmin}
              />
            </div>
          </div>

          {/* Biodata & Spouse Preference card */}
          <div className="flex-2 w-full flex box-border lg:flex-row flex-col lg:gap-6 gap-5 justify-between lg:items-stretch items-center">
            <HeaderShortBio
              biodata={biodata}
              biodataFormData={biodataFormData}
            />
            <div className="hidden lg:block w-full h-full">
              <HeaderSpousePreferenceRequierment
                biodata={biodata}
                biodataFormData={biodataFormData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
