// File: src/app/(main)/biodatas/[id]/page.tsx
"use client";
import Loading from "@/app/loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBiodataByIdQuery } from "@/redux/features/biodata/biodataApi";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import { use, useEffect, useState } from "react";
import AddressInfo from "./viewBioDataComponents/AddressInfo";
import EducationAndOccupationInfo from "./viewBioDataComponents/EducationAndOccupationInfo";
import FamilyInfo from "./viewBioDataComponents/FamilyInfo";
import FooterSection from "./viewBioDataComponents/FooterSection";
import GeneralInfo from "./viewBioDataComponents/GeneralInfo";
import HeaderSection from "./viewBioDataComponents/HeaderSection";
import MarriageInfo from "./viewBioDataComponents/MarriageInfo";
import PersonalInfo from "./viewBioDataComponents/PersonalInfo";
import PrimaryInfo from "./viewBioDataComponents/PrimaryInfo";
import ReligiousInfo from "./viewBioDataComponents/ReligiousInfo";
import SpousePreferenceInfo from "./viewBioDataComponents/SpousePreferenceInfo";

type PageParams = {
  id: string;
};

export default function BiodataPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const [biodata, setBiodata] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<any>(null);
  const tabs = [
    "প্রাথমিক তথ্য",
    "সাধারণ তথ্য",
    "ঠিকানা",
    "শিক্ষা ও পেশা",
    "পারিবারিক তথ্য",
    "ধর্মীয় লাইফস্টাইল",
    "ব্যক্তিগত তথ্য",
    "বিয়ে সংক্রান্ত তথ্য",
    "যেমন জীবনসঙ্গী আশা করেন",
  ];

  const { id } = use(params);
  const { data: fetchedBiodata, isLoading } = useGetBiodataByIdQuery(id);
  // set biodata
  useEffect(() => {
    if (fetchedBiodata?.data) {
      const mapped = mapApiToBiodataFormData(fetchedBiodata.data);
      setBiodata(mapped);
    }
  }, [fetchedBiodata]);
  // console.log("biodata", biodata);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      <HeaderSection biodata={biodata} biodataId={id} />
      <div className="py-12 flex flex-col items-center justify-center space-y-6">
        <div className="text-4xl text-center text-black">সম্পূর্ণ বায়োডাটা</div>
        <Tabs defaultValue="ঠিকানা" className="max-w-7xl">
          <TabsList className="flex flex-wrap h-auto space-x-2 bg-[#f6f6f6] rounded-2xl p-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-[#e25a6f] data-[state=active]:text-white text-[#004972] rounded-full px-4 py-2"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="w-full max-w-6xl space-y-6">
          <PrimaryInfo />
          <GeneralInfo />
          <AddressInfo />
          <EducationAndOccupationInfo />
          <FamilyInfo />
          <ReligiousInfo />
          <PersonalInfo />
          <MarriageInfo />
          <SpousePreferenceInfo />
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
