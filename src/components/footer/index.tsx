// File: src/components/footer/index.tsx

import logo from "@/assets/images/logo-white.svg";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileFooter from "./MobileFooter";

export function Footer() {
  return (
    <>
      {/* Desktop and tablet footer */}
      <footer className="bg-[#307fa7] text-white text-center py-4 justify-center space-x-8 hidden md:flex flex-wrap">
        <div className="min-w-72 flex flex-col">
          <div className="underline text-xl mb-5">লিংকসমূহ</div>
          <div className="flex justify-between text-left">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="inline-block hover:underline">
                হোম
              </Link>
              <Link href="/tutorial" className="inline-block hover:underline">
                টিউটোরিয়াল
              </Link>
              <Link href="/faq" className="inline-block hover:underline">
                প্রশ্ন-উত্তর
              </Link>
            </div>
            <div className="flex flex-col  space-y-2">
              <Link
                href="/privacy-policy"
                className="inline-block hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="inline-block hover:underline"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="inline-block hover:underline"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="min-w-96 flex flex-col space-y-2 justify-center items-center">
          <div className="">
            <Image src={logo} alt="Logo" width={60} height={50} priority />
          </div>
          <div>
            বাংলাদেশের সর্বসাধারণ মুসলিমদের জন্য একটি বিশ্বস্ত ম্যাট্রিমনি
            প্ল্যাটফর্ম
          </div>
          <div>
            &copy; {new Date().getFullYear()} সহজনিকাহ. All Rights Reserved.
          </div>
        </div>
        <div className="min-w-72 flex flex-col space-y-4">
          <div className="underline text-xl">যোগাযোগ</div>
          <div>info@sohoznikah.com</div>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://www.facebook.com/SohozNikahMatrimony/"
              target="_blank"
            >
              <Facebook size={32} />
            </a>
            <a href="#">
              <Youtube size={32} />
            </a>
            <a href="#" target="_blank">
              <Instagram size={32} />
            </a>
          </div>
        </div>
      </footer>
      {/* Mobile footer */}
      <MobileFooter />
    </>
  );
}
