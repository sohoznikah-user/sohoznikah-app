"use client";
import Loading from "@/app/loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyBiodataQuery } from "@/redux/features/biodata/biodataApi";
import {
  setAllBiodata,
  setAllBiodataFormData,
} from "@/redux/features/biodata/biodataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddressInfo from "../[id]/viewBioDataComponents/AddressInfo";
import EducationAndOccupationInfo from "../[id]/viewBioDataComponents/EducationAndOccupationInfo";
import FamilyInfo from "../[id]/viewBioDataComponents/FamilyInfo";
import FooterSection from "../[id]/viewBioDataComponents/FooterSection";
import GeneralInfo from "../[id]/viewBioDataComponents/GeneralInfo";
import HeaderSection from "../[id]/viewBioDataComponents/HeaderSection";
import MarriageInfo from "../[id]/viewBioDataComponents/MarriageInfo";
import PersonalInfo from "../[id]/viewBioDataComponents/PersonalInfo";
import PrimaryInfo from "../[id]/viewBioDataComponents/PrimaryInfo";
import ReligiousInfo from "../[id]/viewBioDataComponents/ReligiousInfo";
import SpousePreferenceInfo from "../[id]/viewBioDataComponents/SpousePreferenceInfo";

export default function BiodataPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);
  const user = useAppSelector(selectCurrentUser);
  const acesstoken = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
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
  const {
    data: fetchedBiodata,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetMyBiodataQuery(undefined, {
    skip: !user || !acesstoken,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user || !acesstoken) {
      const redirectUrl = `/my-biodata`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [user, acesstoken, router]);

  useEffect(() => {
    if (fetchedBiodata?.data) {
      const mapped = mapApiToBiodataFormData(fetchedBiodata.data);
      dispatch(setAllBiodataFormData(mapped.biodataFormData));
      dispatch(setAllBiodata(mapped.biodata));
    }
  }, [fetchedBiodata, dispatch]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const ref = tabRefMap[value];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="">
      <HeaderSection
        biodata={biodata}
        biodataId={biodata?.id}
        biodataFormData={biodataFormData}
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
              biodata={biodata}
              primaryInfoFormData={biodataFormData?.primaryInfoFormData}
            />
          </div>
          <div ref={generalInfoRef}>
            <GeneralInfo
              biodata={biodata}
              generalInfoFormData={biodataFormData?.generalInfoFormData}
            />
          </div>
          <div ref={addressRef}>
            <AddressInfo
              biodata={biodata}
              addressInfoFormData={biodataFormData?.addressInfoFormData}
            />
          </div>
          <div ref={educationRef}>
            <EducationAndOccupationInfo
              biodata={biodata}
              educationInfoFormData={biodataFormData?.educationInfoFormData}
              occupationInfoFormData={biodataFormData?.occupationInfoFormData}
            />
          </div>
          <div ref={familyRef}>
            <FamilyInfo
              biodata={biodata}
              familyInfoFormData={biodataFormData?.familyInfoFormData}
            />
          </div>
          <div ref={religiousRef}>
            <ReligiousInfo
              biodata={biodata}
              religiousInfoFormData={biodataFormData?.religiousInfoFormData}
              primaryInfoFormData={biodataFormData?.primaryInfoFormData}
            />
          </div>
          <div ref={personalRef}>
            <PersonalInfo
              biodata={biodata}
              personalInfoFormData={biodataFormData?.personalInfoFormData}
            />
          </div>
          <div ref={marriageRef}>
            <MarriageInfo biodata={biodata} biodataFormData={biodataFormData} />
          </div>
          <div ref={spouseRef}>
            <SpousePreferenceInfo
              biodata={biodata}
              spousePreferenceInfoFormData={
                biodataFormData?.spousePreferenceInfoFormData
              }
            />
          </div>
        </div>
      </div>
      <FooterSection biodata={biodata} biodataFormData={biodataFormData} />
    </div>
  );
}
