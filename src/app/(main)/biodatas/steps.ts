import { BiodataFormProps } from "@/lib/types";
import FirstWords from "./biodataFormComponents/FirstWords";
import PrimaryInfo from "./biodataFormComponents/PrimaryInfo";
import GeneralInfo from "./biodataFormComponents/GeneralInfo";
import AddressInfo from "./biodataFormComponents/AddressInfo";
import EducationInfo from "./biodataFormComponents/EducationInfo";
import OccupationInfo from "./biodataFormComponents/OccupationInfo";
import FamilyInfo from "./biodataFormComponents/FamilyInfo";
import ReligionInfo from "./biodataFormComponents/ReligionInfo";
import PersonalInfo from "./biodataFormComponents/PersonalInfo";
import MaritalInfo from "./biodataFormComponents/MaritalInfo";
import PartnerInfo from "./biodataFormComponents/PartnerInfo";
import ProfilePic from "./biodataFormComponents/ProfilePic";
import FinalWords from "./biodataFormComponents/FinalWords";

export const steps: {
  title: string;
  component: React.ComponentType<BiodataFormProps>;
  key: string;
}[] = [
  { title: "কিছু কথা", component: FirstWords, key: "first-words" },
  { title: "প্রাথমিক তথ্য", component: PrimaryInfo, key: "primary-info" },
  {
    title: "সাধারণ তথ্য",
    component: GeneralInfo,
    key: "general-info",
  },
  {
    title: "ঠিকানা",
    component: AddressInfo,
    key: "address-info",
  },
  {
    title: "শিক্ষাগত যোগ্যতা",
    component: EducationInfo,
    key: "education-info",
  },
  {
    title: "পেশা",
    component: OccupationInfo,
    key: "occupation-info",
  },
  { title: "পারিবারিক তথ্য", component: FamilyInfo, key: "family-info" },
  {
    title: "ধর্মীয় লাইফস্টাইল",
    component: ReligionInfo,
    key: "religion-info",
  },
  { title: "ব্যক্তিগত তথ্য", component: PersonalInfo, key: "personal-info" },
  {
    title: "বিয়ে সংক্রান্ত তথ্য",
    component: MaritalInfo,
    key: "marital-info",
  },
  {
    title: "যেমন জীবনসঙ্গী আশা করেন",
    component: PartnerInfo,
    key: "partner-info",
  },
  { title: "প্রোফাইল পিকচার", component: ProfilePic, key: "profile-pic" },
  { title: "শেষ কথা", component: FinalWords, key: "final-words" },
];
