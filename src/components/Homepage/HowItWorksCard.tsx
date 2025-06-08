import Image from "next/image";

interface HowItWorksCardProps {
  step: string;
  title: string;
  description: string;
  links: { label: string; href: string }[];
  imageSrc: any;
}

const HowItWorksCard = ({
  step,
  title,
  description,
  links,
  imageSrc,
}: HowItWorksCardProps) => (
  <div className="relative bg-white/80 rounded-full lg:w-80 lg:h-80 md:w-72 md:h-72 w-72 h-72 mx-auto flex flex-col items-center justify-center md:p-8 p-4 text-center z-20">
    <div className="absolute lg:text-[220px] md:text-[200px] text-[150px] text-slate-200 font-bold md:-left-16 -left-12 md:-top-32 -top-24 select-none pointer-events-none z-0">
      {step}
    </div>
    <div className="flex flex-col items-center ">
      <h3 className="text-xl font-bold text-[#3B3B3B] mb-2">{title}</h3>
      <p className="text-md text-[#555] mb-4">{description}</p>
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className="text-sm text-[#D17A8A] font-semibold underline mb-2 pt-2 last:mb-0"
        >
          {link.label}
        </a>
      ))}
    </div>
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 md:w-[380px] md:h-[137px] w-[300px] h-[100px]">
      <Image src={imageSrc} alt="workImage" className="w-full h-full" />
    </div>
  </div>
);

export default HowItWorksCard;
