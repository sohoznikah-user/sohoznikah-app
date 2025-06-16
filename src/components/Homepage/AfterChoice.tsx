import afterChoiceImage from "@/assets/images/after-choice-1.svg";
import afterChoiceImage2 from "@/assets/images/after-choice-2.svg";
import Image from "next/image";
import Title from "../shared/Title";

const AfterChoice = () => {
  return (
    <section className="relative px-2 sm:px-4 pb-20  overflow-hidden ">
      {/* Decorative hearts */}

      <div className="max-w-7xl mx-auto box-border">
        <Title leftTitle="বায়োডাটা পছন্দ হলে কি করবেন?" hideCenter />
        <div className="flex flex-col gap-8 md:mt-16 mt-10 mx-auto w-full max-w-2xl">
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
