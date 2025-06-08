import { HomeSearchBiodata } from "./HomeSearchBiodata";

const Banner = () => {
  return (
    <div className="flex-grow max-w-7xl mt-12 mx-auto flex flex-col text-[#1f4f69] pb-14">
      <div className="text-3xl text-center mb-8">
        বিবাহযোগ্য মুসলিম পাত্র-পাত্রী খোঁজার সহজ মাধ্যম
      </div>

      <p className="text-center mb-4">
        Bangladesh's Trusted Matrimony Platform
      </p>

      <div className="text-center mb-12">
        <blockquote className="italic text-[#b1466e]">
          "তোমরা সহজ করো এবং কঠিন করো না।
          <br />
          সুসংবাদ দাও এবং বিরক্ত করো না।"
        </blockquote>
        <p className="text-gray-500 mt-2">(বুখারী ৩০৩৮)</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-2xl text-center mb-4 pb-4 border-b-4 border-[#1f4f69]">
          জীবনসঙ্গী খুঁজুন
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-[#dce9f0] to-[#fbe6e9]">
        <HomeSearchBiodata />
      </div>
    </div>
  );
};

export default Banner;
