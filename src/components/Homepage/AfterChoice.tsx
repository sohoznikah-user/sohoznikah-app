import afterChoiceImage from "@/assets/images/after-choice-1.png";
import afterChoiceImage2 from "@/assets/images/after-choice-2.png";
import Image from "next/image";
import Title from "../shared/Title";

const AfterChoice = () => {
  return (
    <section className="relative px-2 sm:px-4 py-20 bg-white overflow-hidden">
      {/* Decorative hearts */}
      <div className="absolute left-0 bottom-10 opacity-20 pointer-events-none select-none">
        <svg
          width="100"
          height="80"
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 70C50 70 10 45 10 25C10 10 30 10 50 30C70 10 90 10 90 25C90 45 50 70 50 70Z"
            fill="#FBB6CE"
          />
        </svg>
      </div>
      <div className="absolute right-10 top-10 opacity-20 pointer-events-none select-none">
        <svg
          width="60"
          height="50"
          viewBox="0 0 60 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 45C30 45 6 29 6 16C6 6 18 6 30 18C42 6 54 6 54 16C54 29 30 45 30 45Z"
            fill="#FBB6CE"
          />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto box-border">
        <Title leftTitle="বায়োডাটা পছন্দ হলে কি করবেন?" hideCenter />
        <div className="flex flex-col gap-8 md:mt-16 mt-10 mx-auto w-full max-w-2xl">
          {/* Card 1 */}
          {/* <div className="flex items-center bg-[#1166A4] rounded-full px-8 py-6 shadow-md">
            <div className="flex-shrink-0 bg-[#0B4C7A] rounded-full p-4 mr-6">
              <UserCog className="text-white text-3xl" />
            </div>
            <div className="text-white text-lg font-medium text-center md:text-left">
              প্রাথমিক পরিচয় পার্টির আপনার প্রতি আগ্রহী কিনা জানতে পারবেন
            </div>
          </div> */}
          {/* Card 2 */}
          {/* <div className="flex items-center bg-[#E5738A] rounded-full px-8 py-6 shadow-md">
            <div className="flex-shrink-0 bg-[#D45C73] rounded-full p-4 mr-6">
              <PhoneCall className="text-white text-3xl" />
            </div>
            <div className="text-white text-lg font-medium text-center md:text-left">
              অভিভাবকের যোগাযোগ তথ্য দেখতে পারবেন
            </div>
          </div> */}

          <div className="flex items-center justify-center md:w-[546px] w-full h-full mr-auto">
            <Image
              src={afterChoiceImage}
              alt="afterChoice"
              className="w-full h-full"
            />
          </div>

          <div className="flex items-center justify-center md:w-[546px] w-full h-full ml-auto">
            <Image
              src={afterChoiceImage2}
              alt="afterChoice"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AfterChoice;
