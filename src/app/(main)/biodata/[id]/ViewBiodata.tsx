import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderSection from "./(viewBioDataComponents)/HeaderSection";
import PersonalInfo from "./(viewBioDataComponents)/PersonalInfo";
import FamilyInfo from "./(viewBioDataComponents)/FamilyInfo";
import AddressInfo from "./(viewBioDataComponents)/AddressInfo";
import EducationInfo from "./(viewBioDataComponents)/EducationInfo";
import OccupationInfo from "./(viewBioDataComponents)/OccupationInfo";
import FooterSection from "./(viewBioDataComponents)/FooterSection";

export default function BiodataPage() {
  const tabs = [
    "ঠিকানা",
    "শিক্ষা ও পেশা",
    "পারিবারিক তথ্য",
    "ধর্মীয় লাইফস্টাইল",
    "ব্যক্তিগত তথ্য",
    "বিয়ে সংক্রান্ত তথ্য",
    "যেমন জীবনসঙ্গী আশা করেন",
    "কর্তৃপক্ষের জিজ্ঞাসা",
  ];

  return (
    <>
      <HeaderSection />
      <div className="py-12 max-w-6xl mx-auto">
        <div className="text-4xl text-center text-black mb-8">
          সম্পূর্ণ বায়োডাটা
        </div>
        <Tabs defaultValue="ঠিকানা" className="w-full">
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

        <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
          <Card className="border-gray-200 bg-[#fcfcfc] text-black">
            <CardContent className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <div className="w-1/2">বায়োডাটা কার জন্য তৈরী করেছেন?</div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  নিজের জন্য
                </div>
              </div>
            </CardContent>
          </Card>

          <AddressInfo />
          <EducationInfo />
          <OccupationInfo />
          <FamilyInfo />
          <PersonalInfo />
        </div>
      </div>
      <FooterSection />
    </>
  );
}
