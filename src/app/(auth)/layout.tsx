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
      <div className="     mt-10 text-md text-black mb-10 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="flex flex-col items-stretch justify-center bg-white lg:w-md md:w-md w-[95%] lg:px-10 md:px-6 px-5  lg:py-10 md:py-6 py-5 rounded-2xl  mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
