// File: src/app/(main)/biodatas/[id]/BiodataClient.tsx
"use client";
import Loading from "@/app/loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMyBiodataQuery } from "@/redux/features/biodata/biodataApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddressInfo from "../[biodataId]/viewBioDataComponents/AddressInfo";
import EducationAndOccupationInfo from "../[biodataId]/viewBioDataComponents/EducationAndOccupationInfo";
import FamilyInfo from "../[biodataId]/viewBioDataComponents/FamilyInfo";
import GeneralInfo from "../[biodataId]/viewBioDataComponents/GeneralInfo";
import HeaderSection from "../[biodataId]/viewBioDataComponents/HeaderSection";
import MarriageInfo from "../[biodataId]/viewBioDataComponents/MarriageInfo";
import PersonalInfo from "../[biodataId]/viewBioDataComponents/PersonalInfo";
import PrimaryInfo from "../[biodataId]/viewBioDataComponents/PrimaryInfo";
import ReligiousInfo from "../[biodataId]/viewBioDataComponents/ReligiousInfo";
import SpousePreferenceInfo from "../[biodataId]/viewBioDataComponents/SpousePreferenceInfo";

export default function MyBiodataClient({
  myBiodata = true,
  isAdmin = false,
}: {
  myBiodata?: boolean;
  isAdmin?: boolean;
}) {
  const [biodata, setBiodata] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();
  const { user, acesstoken } = useAppSelector((state: RootState) => state.auth);

  const {
    data: myBiodataData,
    isLoading: isFetchingMyBiodata,
    isError: isErrorMyBiodata,
  } = useGetMyBiodataQuery(undefined);

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
  useEffect(() => {
    if (!user || !acesstoken) {
      const redirectUrl = `/my-biodata`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [user, acesstoken, router]);

  // Fetch my biodata when myBiodata is true

  // Set biodata based on fetched data
  useEffect(() => {
    if (myBiodataData?.data) {
      const mapped = mapApiToBiodataFormData(myBiodataData.data);
      setBiodata(mapped);
    }
  }, [myBiodataData]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const ref = tabRefMap[value];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isFetchingMyBiodata) {
    return <Loading />;
  }

  if (isErrorMyBiodata) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <HeaderSection
        biodata={biodata?.biodata}
        myBiodata={true}
        biodataFormData={biodata?.biodataFormData}
      />

      <div className="lg:px-0 px-4">
        <div className="py-12 flex flex-col items-center justify-center space-y-6 container mx-auto">
          <div className="text-4xl text-center text-black">
            সম্পূর্ণ বায়োডাটা
          </div>
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

          <div className="lg:max-w-5xl w-full lg:mx-auto space-y-6 text-md ">
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
                familyInfoFormData={
                  biodata?.biodataFormData?.familyInfoFormData
                }
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
              <SpousePreferenceInfo
                biodata={biodata}
                spousePreferenceInfoFormData={
                  biodata?.biodataFormData?.spousePreferenceFormData
                }
              />
            </div>
          </div>
        </div>

        {/* <div className=" lg:hidden flex justify-center items-center pb-20">
          <ProposalCard
            biodata={biodata?.biodata}
            myBiodata={true}
            isAdmin={true}
          />
        </div> */}
        {/* <FooterSection
      biodata={biodata}
      biodataFormData={biodata?.biodataFormData}
    /> */}
      </div>
    </>
  );
}
