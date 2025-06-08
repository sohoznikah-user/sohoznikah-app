import leftHeart from "@/assets/images/left-about.png";
import rightHeart from "@/assets/images/right-about.png";
import Image from "next/image";
import Title from "../shared/Title";

export default function AboutSohojNikah() {
  return (
    <section className=" bg-white lg:py-20 md:py-16 py-8 px-2 sm:px-4">
      {/* Decorative hearts */}

      <Title rightTitle="কি?" />

      <div className="p-6 bg-[#FFF5F5]  max-w-2xl mx-auto relative">
        <Image
          src={leftHeart}
          alt="left-heart"
          className="lg:w-[200px] md:w-[150px] w-[100px] absolute lg:-left-28 md:-left-16 -left-12  lg:-top-16 md:-top-12 -top-8 text-pink-400  text-[50px] select-none pointer-events-none z-10"
        />
        <Image
          src={rightHeart}
          alt="right-heart"
          className="absolute lg:w-[150px] md:w-[100px] w-[100px] lg:-right-12 md:-right-8 -right-6  lg:-bottom-8 md:-bottom-4 -bottom-5 text-pink-400  text-[50px] select-none pointer-events-none z-10"
        />
        <div className="bg-white lg:px-16 md:px-10 md:py-10 p-4  text-center z-30">
          <div className="text-base text-md text-[#737373] leading-7 flex flex-col gap-4">
            <p>
              সহজনিকাহ ম্যাট্রিমনি বাংলাদেশের মুসলিমদের জন্য একটি অনলাইন ভিত্তিক
              ম্যাট্রিমনি প্ল্যাটফর্ম। যেখানে বিবাহযোগ্য সকল মুসলিম পাত্র-পাত্রী
              তাদের বায়োডাটা তৈরির পাশাপাশি নিজেদের মতো উপযুক্ত জীবনসঙ্গী খুঁজতে
              নিতে পারে খুব সহজেই।
            </p>
            <p>
              আমাদের উদ্দেশ্য বিবাহকে সহজ করা। বর্তমান এই ফেতনার সময়ে হারাম
              সম্পর্কে জড়ানো অনেক সহজ হলেও, বৈধ এবং পবিত্র সম্পর্কে জড়ানো
              অর্থাৎ বিবাহ করা অনেক কঠিন হয়ে পড়েছে। তাই পাত্র-পাত্রীর সন্ধানকে
              সহজ করার মাধ্যমে বিবাহকে সহজ করা আমাদের ক্ষুদ্র প্রচেষ্টা মাত্র।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
