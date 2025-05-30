// File: src/app/(main)/biodatas/[id]/page.tsx
"use client";
import Loading from "@/app/loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBiodataByIdQuery } from "@/redux/features/biodata/biodataApi";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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

type PageParams = {
  id: string;
};

export default function BiodataPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const [biodata, setBiodata] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

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

  const primaryInfoRef = useRef<HTMLDivElement>(null);
  const generalInfoRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);
  const religiousRef = useRef<HTMLDivElement>(null);
  const personalRef = useRef<HTMLDivElement>(null);
  const marriageRef = useRef<HTMLDivElement>(null);
  const spouseRef = useRef<HTMLDivElement>(null);

  const tabRefMap: Record<string, React.RefObject<HTMLDivElement>> = {
    "প্রাথমিক তথ্য": primaryInfoRef,
    "সাধারণ তথ্য": generalInfoRef,
    ঠিকানা: addressRef,
    "শিক্ষা ও পেশা": educationRef,
    "পারিবারিক তথ্য": familyRef,
    "ধর্মীয় লাইফস্টাইল": religiousRef,
    "ব্যক্তিগত তথ্য": personalRef,
    "বিয়ে সংক্রান্ত তথ্য": marriageRef,
    "যেমন জীবনসঙ্গী আশা করেন": spouseRef,
  };

  const { id } = use(params);
  const {
    data: fetchedBiodata,
    isLoading,
    isError,
  } = useGetBiodataByIdQuery(id);

  useEffect(() => {
    if (isLoading) {
      toast.loading("বায়োডাটা লোড হচ্ছে...");
    }
    if (isError) {
      toast.error("বায়োডাটা লোড করতে সমস্যা হয়েছে");
    }
    if (fetchedBiodata?.data) {
      const mapped = mapApiToBiodataFormData(fetchedBiodata.data);
      setBiodata(mapped);
    }
  }, [fetchedBiodata]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const ref = tabRefMap[value];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="">
      <HeaderSection
        biodata={biodata}
        biodataId={id}
        biodataFormData={biodata?.biodataFormData}
      />
      <div className="py-12 flex flex-col items-center justify-center space-y-6">
        <div className="text-4xl text-center text-black">সম্পূর্ণ বায়োডাটা</div>
        <Tabs
          defaultValue="ঠিকানা"
          className="max-w-7xl"
          onValueChange={handleTabChange}
        >
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
          <div ref={primaryInfoRef}>
            <PrimaryInfo
              biodata={biodata?.biodata}
              primaryInfoFormData={
                biodata?.biodataFormData?.primaryInfoFormData
              }
            />
          </div>
          <div ref={generalInfoRef}>
            <GeneralInfo
              biodata={biodata}
              generalInfoFormData={
                biodata?.biodataFormData?.generalInfoFormData
              }
            />
          </div>
          <div ref={addressRef}>
            <AddressInfo
              biodata={biodata}
              addressInfoFormData={
                biodata?.biodataFormData?.addressInfoFormData
              }
            />
          </div>
          <div ref={educationRef}>
            <EducationAndOccupationInfo
              biodata={biodata}
              educationInfoFormData={
                biodata?.biodataFormData?.educationAndOccupationFormData
              }
              occupationInfoFormData={
                biodata?.biodataFormData?.educationAndOccupationFormData
              }
            />
          </div>
          <div ref={familyRef}>
            <FamilyInfo
              biodata={biodata}
              familyInfoFormData={biodata?.biodataFormData?.familyInfoFormData}
            />
          </div>
          <div ref={religiousRef}>
            <ReligiousInfo
              biodata={biodata}
              religiousInfoFormData={
                biodata?.biodataFormData?.religiousInfoFormData
              }
              primaryInfoFormData={
                biodata?.biodataFormData?.primaryInfoFormData
              }
            />
          </div>
          <div ref={personalRef}>
            <PersonalInfo
              biodata={biodata}
              personalInfoFormData={
                biodata?.biodataFormData?.personalInfoFormData
              }
            />
          </div>
          <div ref={marriageRef}>
            <MarriageInfo
              biodata={biodata}
              biodataFormData={biodata?.biodataFormData}
            />
          </div>
          <div ref={spouseRef}>
            {/* <SpousePreferenceInfo
              biodata={biodata}
              biodataFormData={
                biodata?.biodataFormData?.spousePreferenceFormData
              }
            /> */}
          </div>
        </div>
      </div>
      <FooterSection
        biodata={biodata}
        biodataFormData={biodata?.biodataFormData}
      />
    </div>
  );
}
