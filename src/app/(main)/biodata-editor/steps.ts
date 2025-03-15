import { BiodataFormDataProps } from "@/lib/types";
import FirstWords from "./biodataFormComponents/FirstWords";
import PrimaryInfo from "./biodataFormComponents/PrimaryInfo";
import GeneralInfo from "./biodataFormComponents/GeneralInfo";
import AddressInfo from "./biodataFormComponents/AddressInfo";
import EducationInfo from "./biodataFormComponents/EducationInfo";
import OccupationInfo from "./biodataFormComponents/OccupationInfo";
import FamilyInfo from "./biodataFormComponents/FamilyInfo";
import ReligiousInfo from "./biodataFormComponents/ReligiousInfo";
import PersonalInfo from "./biodataFormComponents/PersonalInfo";
import MarriageInfo from "./biodataFormComponents/MarriageInfo";
import SpousePreferenceInfo from "./biodataFormComponents/SpousePreferenceInfo";
import ProfilePic from "./biodataFormComponents/ProfilePic";
import FinalWords from "./biodataFormComponents/FinalWords";

export interface BiodataFormStep {
  title: string;
  component: React.ComponentType<BiodataFormDataProps>;
  key: string;
  disabled: boolean;
  prev?: string;
  next?: string;
}

export const steps: BiodataFormStep[] = [
  {
    title: "কিছু কথা",
    component: FirstWords,
    key: "first-words",
    disabled: true,
    next: "primary-info",
  },
  {
    title: "প্রাথমিক তথ্য",
    component: PrimaryInfo,
    key: "primary-info",
    disabled: true,
    prev: "first-words",
    next: "general-info",
  },
  {
    title: "সাধারণ তথ্য",
    component: GeneralInfo,
    key: "general-info",
    disabled: true,
    prev: "primary-info",
    next: "address-info",
  },
  {
    title: "ঠিকানা",
    component: AddressInfo,
    key: "address-info",
    disabled: true,
    prev: "general-info",
    next: "education-info",
  },
  {
    title: "শিক্ষাগত যোগ্যতা",
    component: EducationInfo,
    key: "education-info",
    disabled: true,
    prev: "address-info",
    next: "occupation-info",
  },
  {
    title: "পেশা",
    component: OccupationInfo,
    key: "occupation-info",
    disabled: true,
    prev: "education-info",
    next: "family-info",
  },
  {
    title: "পারিবারিক তথ্য",
    component: FamilyInfo,
    key: "family-info",
    disabled: true,
    prev: "occupation-info",
    next: "religious-info",
  },
  {
    title: "ধর্মীয় লাইফস্টাইল",
    component: ReligiousInfo,
    key: "religious-info",
    disabled: true,
    prev: "family-info",
    next: "personal-info",
  },
  {
    title: "ব্যক্তিগত তথ্য",
    component: PersonalInfo,
    key: "personal-info",
    disabled: true,
    prev: "religious-info",
    next: "marital-info",
  },
  {
    title: "বিয়ে সংক্রান্ত তথ্য",
    component: MarriageInfo,
    key: "marital-info",
    disabled: true,
    prev: "personal-info",
    next: "spouse-preference-info",
  },
  {
    title: "যেমন জীবনসঙ্গী আশা করেন",
    component: SpousePreferenceInfo,
    key: "spouse-preference-info",
    disabled: true,
    prev: "marital-info",
    next: "profile-pic",
  },
  {
    title: "প্রোফাইল পিকচার",
    component: ProfilePic,
    key: "profile-pic",
    disabled: true,
    prev: "spouse-preference-info",
    next: "final-words",
  },
  {
    title: "শেষ কথা",
    component: FinalWords,
    key: "final-words",
    disabled: true,
    prev: "profile-pic",
  },
];
