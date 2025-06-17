// File: src/app/(main)/biodatas/[id]/BiodataClient.tsx
"use client";
import Loading from "@/app/loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetBiodataByIdQuery } from "@/redux/features/biodata/biodataApi";
import { useAppSelector } from "@/redux/hooks";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AddressInfo from "./viewBioDataComponents/AddressInfo";
import EducationAndOccupationInfo from "./viewBioDataComponents/EducationAndOccupationInfo";
import FamilyInfo from "./viewBioDataComponents/FamilyInfo";
import GeneralInfo from "./viewBioDataComponents/GeneralInfo";
import HeaderSection from "./viewBioDataComponents/HeaderSection";
import MarriageInfo from "./viewBioDataComponents/MarriageInfo";
import PersonalInfo from "./viewBioDataComponents/PersonalInfo";
import PrimaryInfo from "./viewBioDataComponents/PrimaryInfo";
import ProposalCard from "./viewBioDataComponents/ProposalCard";
import ReligiousInfo from "./viewBioDataComponents/ReligiousInfo";
import SpousePreferenceInfo from "./viewBioDataComponents/SpousePreferenceInfo";

export default function BiodataClient({
  biodataId,
  isAdmin = false,
}: {
  biodataId: string;
  isAdmin?: boolean;
}) {
  const [biodata, setBiodata] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const user = useAppSelector(selectCurrentUser);
  const acesstoken = useAppSelector(selectCurrentUser);
  const router = useRouter();
  console.log("biodata", biodata);

  const {
    data: fetchedBiodata,
    isLoading: isFetchingBiodata,
    isError: isErrorBiodata,
  } = useGetBiodataByIdQuery(biodataId, {
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

  // console.log("biodata", biodata);

  if (isFetchingBiodata) {
    return <Loading />;
  }

  if (isErrorBiodata) {
    toast.error("বায়োডাটা খুঁজে পাওয়া যায়নি।");
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-red-500 gap-5">
        <div className="text-2xl font-bold">বায়োডাটা খুঁজে পাওয়া যায়নি।</div>
        <div className="text-md text-gray-500">দয়া করে আবার চেষ্টা করুন।</div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            হোম পেজ
          </Link>
          <button
            onClick={() => router.back()}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderSection
        biodata={biodata?.biodata}
        biodataId={biodataId}
        biodataFormData={biodata?.biodataFormData}
        isAdmin={isAdmin}
      />

      <div className="lg:px-0 px-4 lg:bg-white bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
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

        {!isAdmin && (
          <div className=" lg:hidden flex justify-center items-center pb-20">
            <ProposalCard
              biodataId={biodataId}
              biodata={biodata?.biodata}
              myBiodata={false}
              isAdmin={false}
            />
          </div>
        )}
        {/* <FooterSection
        biodata={biodata}
        biodataFormData={biodata?.biodataFormData}
      /> */}
      </div>
    </>
  );
}
