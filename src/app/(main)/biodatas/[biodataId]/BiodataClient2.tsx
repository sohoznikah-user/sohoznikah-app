// File: src/app/(main)/biodatas/[id]/BiodataClient.tsx
"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetBiodataByIdQuery,
  useGetMyBiodataQuery,
} from "@/redux/features/biodata/biodataApi";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import { useEffect, useRef, useState } from "react";
import AddressInfo from "./viewBioDataComponents/AddressInfo";
import EducationAndOccupationInfo from "./viewBioDataComponents/EducationAndOccupationInfo";
import FamilyInfo from "./viewBioDataComponents/FamilyInfo";
import GeneralInfo from "./viewBioDataComponents/GeneralInfo";
import HeaderSection from "./viewBioDataComponents/HeaderSection";
import MarriageInfo from "./viewBioDataComponents/MarriageInfo";
import PersonalInfo from "./viewBioDataComponents/PersonalInfo";
import PrimaryInfo from "./viewBioDataComponents/PrimaryInfo";
import ReligiousInfo from "./viewBioDataComponents/ReligiousInfo";

export default function BiodataClient2({
  biodataId,
  myBiodata = false,
  isAdmin = false,
}: {
  biodataId?: string;
  myBiodata?: boolean;
  isAdmin?: boolean;
}) {
  const [biodata, setBiodata] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  console.log({ biodataId });

  const { data: myBiodataData, isLoading: isFetchingMyBiodata } =
    useGetMyBiodataQuery(undefined, { skip: !biodataId || !myBiodata });

  const { data: fetchedBiodata, isLoading: isFetchingBiodata } =
    useGetBiodataByIdQuery(biodataId, {
      skip: !biodataId || typeof biodataId !== "string",
    });

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

  // Redirect to login if not authenticated
  //   useEffect(() => {
  //     if (!myBiodata) {
  //       return;
  //     }
  //     if (myBiodata) {
  //       if (!user || !acesstoken) {
  //         const redirectUrl = `/my-biodata`;
  //         router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
  //       }
  //     }
  //   }, [myBiodata, user, acesstoken, router]);

  // Fetch my biodata when myBiodata is true

  // Set biodata based on fetched data
  useEffect(() => {
    if (myBiodata && myBiodataData?.data) {
      const mapped = mapApiToBiodataFormData(myBiodataData.data);
      setBiodata(mapped);
    } else if (!myBiodata && fetchedBiodata?.data) {
      const mapped = mapApiToBiodataFormData(fetchedBiodata.data);
      setBiodata(mapped);
    }
  }, [myBiodata, myBiodataData, fetchedBiodata]);

  //   console.log("biodataId", biodataId);
  //   console.log("myBiodata", myBiodata);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const ref = tabRefMap[value];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // if (isFetchingMyBiodata || isFetchingBiodata) {
  //   return <Loading />;
  // }

  // if (isErrorMyBiodata || isErrorBiodata) {
  //   return <div>Error loading data</div>;
  // }

  return (
    <div className="">
      <HeaderSection
        biodata={biodata}
        biodataId={biodataId}
        biodataFormData={biodata?.biodataFormData}
        myBiodata={myBiodata}
        isAdmin={isAdmin}
      />
      <div className="py-12 flex flex-col items-center justify-center space-y-6 container mx-auto">
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
                className="data-[state=active]:bg-[#e25a6f] data-[state=active]:text-white text-[#004972] rounded-full px-4 py-2 text-md"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="w-full  space-y-6 text-md">
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
      {/* <FooterSection
        biodata={biodata}
        biodataFormData={biodata?.biodataFormData}
      /> */}
    </div>
  );
}
