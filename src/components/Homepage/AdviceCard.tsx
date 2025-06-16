import React from "react";
import Quote from "./Quote";

interface AdviceCardProps {
  title: string;
  sections: {
    heading: string;
    paragraph: string;
    quote?: {
      text: string;
      attribution: string;
    };
  }[];
}

const AdviceCard: React.FC<AdviceCardProps> = ({ title, sections }) => {
  return (
    <div className="relative bg-[#F5F5DC] p-[20px] shadow-md max-w-3xl mx-auto">
      {/* Flower Decoration */}
      <div className="absolute top-4 left-4">
        <img src="/flower.png" alt="Flower" className="w-12 h-12" />
      </div>

      {/* Tape Elements */}
      <div className="absolute top-0 right-0">
        <img
          src="/tape.png"
          alt="Tape"
          className="w-16 h-16 transform rotate-45"
        />
      </div>
      <div className="absolute bottom-0 right-0">
        <img
          src="/tape.png"
          alt="Tape"
          className="w-16 h-16 transform -rotate-45"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-[#00B7EB] mb-8 text-center">
        {title}
      </h1>

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="mb-[10px]">
          <h2 className="text-2xl font-bold mb-4 text-black">
            {section.heading}
          </h2>
          <p className="text-lg text-justify mb-4 text-black">
            {section.paragraph}
          </p>
          {section.quote && (
            <Quote
              text={section.quote.text}
              author={section.quote.attribution}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default AdviceCard;
