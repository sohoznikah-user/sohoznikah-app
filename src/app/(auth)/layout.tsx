import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#D6EAFF] to-[#FFE6F0]">
      <Navbar />
      <div className=" bg-white lg:w-md md:w-lg w-[95%]  mx-auto lg:px-10 md:px-6 px-5  lg:py-10 md:py-6 py-5 rounded-2xl mt-10 text-md text-black mb-10 ">
        <div className="flex flex-col items-stretch justify-center ">
          {children}
        </div>
      </div>
    </div>
  );
}
