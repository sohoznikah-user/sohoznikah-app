import workImage from "@/assets/images/work-cover.svg";
import Title from "../shared/Title";
import HowItWorksCard from "./HowItWorksCard";

const cardData = [
  {
    step: "১",
    title: "বায়োডাটা তৈরি করুন",
    description:
      "প্রোফাইল তৈরি করে খুব সহজেই নির্ধারিত কিছু তথ্য পূরণ করে নিজের জন্য সুন্দর একটি বায়োডাটা তৈরি করতে পারবেন।",
    links: [
      { label: "বায়োডাটা তৈরি করুন", href: "#" },
      { label: "ডিটেইলস দেখুন", href: "#" },
    ],
    imageSrc: workImage,
  },
  {
    step: "২",
    title: "বায়োডাটা খুঁজুন",
    description:
      "ফিল্টার অপশনের মাধ্যমে আপনার পছন্দ অনুযায়ী ছেলে, মেয়ে, জেলা, পেশা, শিক্ষা, ইত্যাদি তথ্য দিয়ে সহজেই বায়োডাটা খুঁজে পেতে পারেন।",
    links: [{ label: "ডিটেইলস দেখুন", href: "#" }],
    imageSrc: workImage,
  },
  {
    step: "৩",
    title: "প্রাথমিক প্রস্তাব ও যোগাযোগ",
    description:
      "বায়োডাটা দেখে পছন্দ হলে সাইটের মেসেজিং অপশনের মাধ্যমে প্রাথমিক প্রস্তাব পাঠাতে এবং যোগাযোগের সুযোগ নিতে পারবেন।",
    links: [{ label: "ডিটেইলস দেখুন", href: "#" }],
    imageSrc: workImage,
  },
  {
    step: "৪",
    title: "বিয়ে সম্পন্ন করুন",
    description:
      "অ্যাডমিনদের সাথে যোগাযোগ এবং নিজে যাচাই করে নেয়ার পর সামর্থ্যবান পাত্র-পাত্রীর মধ্যে বিয়ের ব্যবস্থা করুন।",
    links: [{ label: "ডিটেইলস দেখুন", href: "#" }],
    imageSrc: workImage,
  },
];

const HowItWorks = () => {
  return (
    <section className=" px-2 sm:px-4 py-20">
      <div className="max-w-7xl mx-auto box-border">
        <Title rightTitle="যেভাবে কাজ করে" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center md:items-stretch items-center  mt-8 md:mt-20 space-y-20">
          {cardData.map((card, idx) => (
            <HowItWorksCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
