import workImage from "@/assets/images/work-cover.svg";
import Title from "../shared/Title";
import HowItWorksCard from "./HowItWorksCard";

const cardData = [
  {
    step: "১",
    title: "বায়োডাটা তৈরি করুন",
    description:
      "ফ্রী রেজিস্ট্রেশন করে খুব সহজেই নির্ধারিত কিছু প্রশ্নের উত্তর দিয়ে বিনামূল্যে আপনার বায়োডাটা তৈরী করতে পারবেন।",
    links: [
      { label: "বায়োডাটা তৈরি করুন", href: "/biodata-editor" },
      { label: "ডিটেইলস দেখুন", href: "#" },
    ],
    imageSrc: workImage,
  },
  {
    step: "২",
    title: "বায়োডাটা খুঁজুন",
    description:
      "ফিল্টার অপশনের মাধ্যমে আপনি পছন্দ অনুযায়ী জেলা, বয়স, শিক্ষা, পেশা, ইত্যাদি বাছাই করে জীবনসঙ্গী খুঁজতে পারবেন। বায়োডাটা তৈরী করা থাকলে আপনার জীবনসঙ্গীও হয়তো আপনাকে খুঁজবে ইন শা আল্লাহ।",
    links: [{ label: "টিউটোরিয়াল দেখুন", href: "/tutorial" }],
    imageSrc: workImage,
  },
  {
    step: "৩",
    title: "প্রাথমিক প্রস্তাব ও যোগাযোগ",
    description:
      "বায়োডাটা পছন্দ হলে টোকেন সিস্টেমে পেমেন্ট করলেই অপরপক্ষকে প্রাথমিক প্রস্তাব পাঠাতে এবং অভিভাবকের যোগাযোগ তথ্য দেখতে পারবেন।",
    links: [{ label: "টিউটোরিয়াল দেখুন", href: "/tutorial" }],
    imageSrc: workImage,
  },
  {
    step: "৪",
    title: "বিয়ে সম্পন্ন করুন",
    description:
      "অভিভাবকের সাথে যোগাযোগ এবং নিজ দায়িত্বে খোঁজ নেওয়ার পর সার্বিকভাবে পছন্দ হলে শীঘ্রই বিবাহ সম্পন্ন করুন। বিবাহের সময় বা এর পরবর্তীতে আমাদের কোনো চার্জ নেই।",
    links: [{ label: "", href: "" }],
    imageSrc: workImage,
  },
];

const HowItWorks = () => {
  return (
    <section className=" px-2 sm:px-4 py-20">
      <div className="max-w-7xl mx-auto box-border">
        <Title rightTitle="যেভাবে কাজ করে" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center md:items-stretch items-center  mt-8 md:mt-20 space-y-20 max-w-5xl mx-auto">
          {cardData.map((card, idx) => (
            <HowItWorksCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
