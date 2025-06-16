import cardIcon1 from "@/assets/images/cardIcon1.svg";
import cardIcon2 from "@/assets/images/cardIcon2.svg";
import cardIcon3 from "@/assets/images/cardIcon3.svg";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Title from "../shared/Title";

const cardData = [
  {
    icon: <Image src={cardIcon1} alt="cardIcon1" width={70} height={70} />, // Verified Profile
    title: "ভেরিফাইড প্রোফাইল",
    features: [
      "নির্ভরযোগ্য তথ্য যাচাই।",
      "মোবাইল ও ইমেইল ভেরিফিকেশন।",
      "ম্যানুয়াল ভেরিফিকেশন।",
    ],
  },
  {
    icon: <Image src={cardIcon2} alt="cardIcon1" width={80} height={80} />,
    title: "প্রাইভেসি কন্ট্রোল",
    features: [
      "তথ্য নিয়ন্ত্রণের সুযোগ।",
      "অনুমোদন ছাড়া যোগাযোগের তথ্য প্রদান নয়।",
      "প্রোফাইল পাবলিক/প্রাইভেট কন্ট্রোল।",
    ],
  },
  {
    icon: <Image src={cardIcon3} alt="cardIcon1" width={70} height={70} />, // Security
    title: "সুরক্ষিত তথ্যের নিশ্চয়তা",
    features: [
      "উন্নত সিকিউরিটি সিস্টেম।",
      "তথ্য গোপন রাখার নিশ্চয়তা।",
      "তৃতীয় পক্ষের সাথে কোন তথ্য শেয়ার নয়।",
    ],
  },
];

function InfoCard({ icon, title, features }) {
  return (
    <Card className="flex flex-col items-center   bg-gradient-to-b from-[#FFF5F5] to-[#EAF6FB] md:p-8 p-4 rounded-2xl shadow-md border-none min-w-auto md:max-w-[365px] w-full">
      <div className=" mb-5">{icon}</div>
      <h3 className="text-2xl font-semibold text-center mb-3 mt-2 text-[#2D2D2D]">
        {title}
      </h3>
      <ul className="text-[#333] text-base space-y-1 list-inside">
        {features.map((f, i) => (
          <li key={i} className="flex items-start flex-wrap gap-2">
            <span className="text-[#016CA7] mt-1">✔</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

const HowSelectSohojNikah = () => {
  return (
    <section className="bg-white lg:pb-28 md:pb-20 pb-12 pt-5 px-2 sm:px-4 ">
      <div className="max-w-7xl mx-auto box-border">
        <Title leftTitle="কেন" rightTitle="বেছে নিবেন?" />

        <div className="flex  justify-center max-w-xl mx-auto items-center  gap-6 mb-8">
          <h3 className="text-2xl font-semibold text-center mb-3 bg-gradient-to-r from-[#016CA7] to-[#E25A6F] inline-block text-transparent bg-clip-text">
            বায়োডাটা সম্পূর্ণ গোপন রেখে <br className="md:block hidden" />
            যোগাযোগ এবং প্রাথমিক প্রস্তাব পাঠানোর সুযোগ
          </h3>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-center md:items-stretch items-center  md:gap-10 gap-6 mt-8 w-full px-2">
          {cardData.map((card, idx) => (
            <InfoCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowSelectSohojNikah;
