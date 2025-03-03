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
  disabled: boolean;
}[] = [
  {
    title: "কিছু কথা",
    component: FirstWords,
    key: "first-words",
    disabled: true,
  },
  {
    title: "প্রাথমিক তথ্য",
    component: PrimaryInfo,
    key: "primary-info",
    disabled: true,
  },
  {
    title: "সাধারণ তথ্য",
    component: GeneralInfo,
    key: "general-info",
    disabled: true,
  },
  {
    title: "ঠিকানা",
    component: AddressInfo,
    key: "address-info",
    disabled: true,
  },
  {
    title: "শিক্ষাগত যোগ্যতা",
    component: EducationInfo,
    key: "education-info",
    disabled: true,
  },
  {
    title: "পেশা",
    component: OccupationInfo,
    key: "occupation-info",
    disabled: true,
  },
  {
    title: "পারিবারিক তথ্য",
    component: FamilyInfo,
    key: "family-info",
    disabled: true,
  },
  {
    title: "ধর্মীয় লাইফস্টাইল",
    component: ReligionInfo,
    key: "religion-info",
    disabled: true,
  },
  {
    title: "ব্যক্তিগত তথ্য",
    component: PersonalInfo,
    key: "personal-info",
    disabled: true,
  },
  {
    title: "বিয়ে সংক্রান্ত তথ্য",
    component: MaritalInfo,
    key: "marital-info",
    disabled: true,
  },
  {
    title: "যেমন জীবনসঙ্গী আশা করেন",
    component: PartnerInfo,
    key: "partner-info",
    disabled: true,
  },
  {
    title: "প্রোফাইল পিকচার",
    component: ProfilePic,
    key: "profile-pic",
    disabled: true,
  },
  {
    title: "শেষ কথা",
    component: FinalWords,
    key: "final-words",
    disabled: true,
  },
];
