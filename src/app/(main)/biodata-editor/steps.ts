// File: src/app/(main)/biodata-editor/steps.ts
// import { BiodataFormDataProps } from "@/lib/types";
// import AddressInfo from "./biodataFormComponents/AddressInfo";
// import EducationInfo from "./biodataFormComponents/EducationInfo";
// import FamilyInfo from "./biodataFormComponents/FamilyInfo";
// import FinalWords from "./biodataFormComponents/FinalWords";
// import FirstWords from "./biodataFormComponents/FirstWords";
// import GeneralInfo from "./biodataFormComponents/GeneralInfo";
// import MarriageInfo from "./biodataFormComponents/MarriageInfo";
// import OccupationInfo from "./biodataFormComponents/OccupationInfo";
// import PersonalInfo from "./biodataFormComponents/PersonalInfo";
// import PrimaryInfo from "./biodataFormComponents/PrimaryInfo";
// import ProfilePic from "./biodataFormComponents/ProfilePic";
// import ReligiousInfo from "./biodataFormComponents/ReligiousInfo";
// import SpousePreferenceInfo from "./biodataFormComponents/SpousePreferenceInfo";

// export interface BiodataFormStep {
//   title: string;
//   component: React.ComponentType<BiodataFormDataProps>;
//   key: string;
//   disabled: boolean;
//   prev?: string;
//   next?: string;
// }

// export const steps: BiodataFormStep[] = [
//   {
//     title: "কিছু কথা",
//     component: FirstWords,
//     key: "first-words",
//     disabled: true,
//     next: "primary-info",
//   },
//   {
//     title: "প্রাথমিক তথ্য",
//     component: PrimaryInfo,
//     key: "primary-info",
//     disabled: true,
//     prev: "first-words",
//     next: "general-info",
//   },
//   {
//     title: "সাধারণ তথ্য",
//     component: GeneralInfo,
//     key: "general-info",
//     disabled: true,
//     prev: "primary-info",
//     next: "address-info",
//   },
//   {
//     title: "ঠিকানা",
//     component: AddressInfo,
//     key: "address-info",
//     disabled: true,
//     prev: "general-info",
//     next: "education-info",
//   },
//   {
//     title: "শিক্ষাগত যোগ্যতা",
//     component: EducationInfo,
//     key: "education-info",
//     disabled: true,
//     prev: "address-info",
//     next: "occupation-info",
//   },
//   {
//     title: "পেশা",
//     component: OccupationInfo,
//     key: "occupation-info",
//     disabled: true,
//     prev: "education-info",
//     next: "family-info",
//   },
//   {
//     title: "পারিবারিক তথ্য",
//     component: FamilyInfo,
//     key: "family-info",
//     disabled: true,
//     prev: "occupation-info",
//     next: "religious-info",
//   },
//   {
//     title: "ধর্মীয় লাইফস্টাইল",
//     component: ReligiousInfo,
//     key: "religious-info",
//     disabled: true,
//     prev: "family-info",
//     next: "personal-info",
//   },
//   {
//     title: "ব্যক্তিগত তথ্য",
//     component: PersonalInfo,
//     key: "personal-info",
//     disabled: true,
//     prev: "religious-info",
//     next: "marital-info",
//   },
//   {
//     title: "বিয়ে সংক্রান্ত তথ্য",
//     component: MarriageInfo,
//     key: "marital-info",
//     disabled: true,
//     prev: "personal-info",
//     next: "spouse-preference-info",
//   },
//   {
//     title: "যেমন জীবনসঙ্গী আশা করেন",
//     component: SpousePreferenceInfo,
//     key: "spouse-preference-info",
//     disabled: true,
//     prev: "marital-info",
//     next: "profile-pic",
//   },
//   {
//     title: "প্রোফাইল পিকচার",
//     component: ProfilePic,
//     key: "profile-pic",
//     disabled: true,
//     prev: "spouse-preference-info",
//     next: "final-words",
//   },
//   {
//     title: "শেষ কথা",
//     component: FinalWords,
//     key: "final-words",
//     disabled: true,
//     prev: "profile-pic",
//   },
// ];
import AddressInfo from "./biodataFormComponents/AddressInfo";
import EducationInfo from "./biodataFormComponents/EducationInfo";
import FamilyInfo from "./biodataFormComponents/FamilyInfo";
import FinalWords from "./biodataFormComponents/FinalWords";
import FirstWords from "./biodataFormComponents/FirstWords";
import GeneralInfo from "./biodataFormComponents/GeneralInfo";
import MarriageInfo from "./biodataFormComponents/MarriageInfo";
import OccupationInfo from "./biodataFormComponents/OccupationInfo";
import PersonalInfo from "./biodataFormComponents/PersonalInfo";
import PrimaryInfo from "./biodataFormComponents/PrimaryInfo";
import ProfilePic from "./biodataFormComponents/ProfilePic";
import ReligiousInfo from "./biodataFormComponents/ReligiousInfo";
import SpousePreferenceInfo from "./biodataFormComponents/SpousePreferenceInfo";

export interface BiodataFormStep {
  key: string;
  title: string;
  component: React.ComponentType<any>;
  prev: string;
  next: string;
}

export const steps: BiodataFormStep[] = [
  {
    key: "first-words",
    title: "প্রাথমিক শপথ",
    component: FirstWords,
    prev: "",
    next: "primary-info",
  },
  {
    key: "primary-info",
    title: "প্রাথমিক তথ্য",
    component: PrimaryInfo,
    prev: "first-words",
    next: "general-info",
  },
  {
    key: "general-info",
    title: "সাধারণ তথ্য",
    component: GeneralInfo,
    prev: "primary-info",
    next: "address-info",
  },
  {
    key: "address-info",
    title: "ঠিকানা",
    component: AddressInfo,
    prev: "general-info",
    next: "education-info",
  },
  {
    key: "education-info",
    title: "শিক্ষাগত তথ্য",
    component: EducationInfo,
    prev: "address-info",
    next: "occupation-info",
  },
  {
    key: "occupation-info",
    title: "পেশাগত তথ্য",
    component: OccupationInfo,
    prev: "education-info",
    next: "family-info",
  },
  {
    key: "family-info",
    title: "পারিবারিক তথ্য",
    component: FamilyInfo,
    prev: "occupation-info",
    next: "religious-info",
  },
  {
    key: "religious-info",
    title: "ধর্মীয় তথ্য",
    component: ReligiousInfo,
    prev: "family-info",
    next: "personal-info",
  },
  {
    key: "personal-info",
    title: "ব্যক্তিগত তথ্য",
    component: PersonalInfo,
    prev: "religious-info",
    next: "marriage-info",
  },
  {
    key: "marriage-info",
    title: "বিবাহ সংক্রান্ত তথ্য",
    component: MarriageInfo,
    prev: "personal-info",
    next: "spouse-preference-info",
  },
  {
    key: "spouse-preference-info",
    title: "প্রত্যাশিত জীবনসঙ্গী",
    component: SpousePreferenceInfo,
    prev: "marriage-info",
    next: "profile-pic",
  },
  {
    key: "profile-pic",
    title: "প্রোফাইল ছবি",
    component: ProfilePic,
    prev: "spouse-preference-info",
    next: "final-words",
  },
  {
    key: "final-words",
    title: "পাবলিশ",
    component: FinalWords,
    prev: "profile-pic",
    next: "",
  },
];
