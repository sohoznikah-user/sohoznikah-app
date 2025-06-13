import bannerImage from "@/assets/images/bannerImage.svg";
import leftHeart from "@/assets/images/left-heart.svg";
import rightHeart from "@/assets/images/right-heart.svg";
import Image from "next/image";
import { HomeSearchBiodata } from "./HomeSearchBiodata";

const Banner = () => {
  return (
    <div className="flex-grow max-w-7xl mt-12 mx-auto flex flex-col text-[#1f4f69] pb-14 relative ">
      <div className="md:text-3xl text-2xl text-center mb-8 z-10">
        বিবাহযোগ্য মুসলিম পাত্র-পাত্রী <br className="md:hidden block" />
        খোঁজার সহজ মাধ্যম
      </div>
      <p className="text-center mb-4 font-share-tech text-md md:text-lg z-10">
        Bangladesh's Trusted Matrimony Platform
      </p>

      <div className="absolute md:top-10 lg:-left-48 md:-left-20 -top-10 left-5 lg:w-[350px] md:w-[250px] w-[150px] lg:h-[350px] md:h-[250px]  h-[150px] z-0">
        <Image src={leftHeart} alt="quote" className="" />
      </div>
      <div className="text-center mb-10 mt-10 relative w-[80%] mx-auto flex justify-center items-center z-10">
        <Image src={bannerImage} alt="quote" className="" />
      </div>
      <div className="absolute md:top-14 top-20 lg:-right-40  md:-right-10 right-3 md:w-[350px] md:h-[350px] w-[150px] h-[150px]">
        <Image src={rightHeart} alt="quote" className="" />
      </div>
      <div className="flex items-center justify-center">
        <div className="text-2xl text-center mb-5 pb-2 border-b-2 border-[#1f4f69] z-10">
          জীবনসঙ্গী খুঁজুন
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-[#dce9f0] to-[#fbe6e9] mx-6">
        <HomeSearchBiodata />
      </div>
    </div>
  );
};

export default Banner;
