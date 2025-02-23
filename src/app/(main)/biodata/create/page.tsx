import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddressInfo from "../(biodataFormComponents)/AddressInfo";
import EducationAndOccupationInfo from "../(biodataFormComponents)/EducationAndOccupationInfo";
import FamilyInfo from "../(biodataFormComponents)/FamilyInfo";
import FirstWords from "../(biodataFormComponents)/FirstWords";
import GeneralInfo from "../(biodataFormComponents)/GeneralInfo";
import LastWords from "../(biodataFormComponents)/LastWords";
import MaritalInfo from "../(biodataFormComponents)/MaritalInfo";
import PartnerInfo from "../(biodataFormComponents)/PartnerInfo";
import PersonalInfo from "../(biodataFormComponents)/PersonalInfo";
import PrimaryInfo from "../(biodataFormComponents)/PrimaryInfo";
import ProfilePic from "../(biodataFormComponents)/ProfilePic";
import ReligionInfo from "../(biodataFormComponents)/ReligionInfo";

export default function CreateBiodataPage() {
  const tabs = [
    "কিছু কথা",
    "প্রাথমিক তথ্য",
    "সাধারণ তথ্য",
    "ঠিকানা",
    "শিক্ষা ও পেশা",
    "পারিবারিক তথ্য",
    "ধর্মীয় লাইফস্টাইল",
    "ব্যক্তিগত তথ্য",
    "বিয়ে সংক্রান্ত তথ্য",
    "যেমন জীবনসঙ্গী আশা করেন",
    "প্রোফাইল পিকচার",
    "শেষ কথা",
  ];

  return (
    <main className="flex-grow text-[#1f4f69] flex justify-center mt-4 mb-12">
      <Tabs defaultValue="কিছু কথা" className="max-w-7xl">
        <TabsList className="flex flex-wrap space-y-1 h-auto bg-[#f6f6f6] rounded-2xl p-2">
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
        <TabsContent value="কিছু কথা" className="mt-4">
          <FirstWords />
        </TabsContent>
        <TabsContent value="প্রাথমিক তথ্য" className="mt-4">
          <PrimaryInfo />
        </TabsContent>
        <TabsContent value="সাধারণ তথ্য" className="mt-4">
          <GeneralInfo />
        </TabsContent>
        <TabsContent value="ঠিকানা" className="mt-4">
          <AddressInfo />
        </TabsContent>
        <TabsContent value="শিক্ষা ও পেশা" className="mt-4">
          <EducationAndOccupationInfo />
        </TabsContent>
        <TabsContent value="পারিবারিক তথ্য" className="mt-4">
          <FamilyInfo />
        </TabsContent>
        <TabsContent value="ধর্মীয় লাইফস্টাইল" className="mt-4">
          <ReligionInfo />
        </TabsContent>
        <TabsContent value="ব্যক্তিগত তথ্য" className="mt-4">
          <PersonalInfo />
        </TabsContent>
        <TabsContent value="বিয়ে সংক্রান্ত তথ্য" className="mt-4">
          <MaritalInfo />
        </TabsContent>
        <TabsContent value="যেমন জীবনসঙ্গী আশা করেন" className="mt-4">
          <PartnerInfo />
        </TabsContent>
        <TabsContent value="প্রোফাইল পিকচার" className="mt-4">
          <ProfilePic />
        </TabsContent>
        <TabsContent value="শেষ কথা" className="mt-4">
          <LastWords />
        </TabsContent>
      </Tabs>
    </main>
  );
}
