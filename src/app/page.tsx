// File: src/app/page.tsx
import { Footer } from "@/components/footer";
import AboutSohojNikah from "@/components/Homepage/AboutSohojNikah";
import AdviceToBrideGroom from "@/components/Homepage/AdviceToBrideGroom";
import AdviceToGurdians from "@/components/Homepage/AdviceToGurdians";
import AfterChoice from "@/components/Homepage/AfterChoice";
import Banner from "@/components/Homepage/Banner";
import HowItWorks from "@/components/Homepage/HowItWorks";
import HowSelectSohojNikah from "@/components/Homepage/HowSelectSohojNikah";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <Navbar />

      <Banner />
      <AboutSohojNikah />
      <HowSelectSohojNikah />
      <HowItWorks />
      <AfterChoice />
      <AdviceToGurdians />
      <AdviceToBrideGroom />

      <Footer />
    </div>
  );
}
