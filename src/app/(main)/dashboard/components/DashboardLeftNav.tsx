// File: src/app/(main)/dashboard/DashboardLeftNav.tsx
"use client";
import female from "@/assets/images/female-1.svg";
import male from "@/assets/images/male-5.svg";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLeftNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardLeftNav({
  isOpen,
  onClose,
}: DashboardLeftNavProps) {
  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);
  const profileImage = biodata?.biodataType === "GROOM" ? male : female;
  const user = useAppSelector(selectCurrentUser);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static overflow-y-auto  top-0 left-0  py-10 w-72 flex flex-col items-center space-y-1 bg-[#307FA7] lg:bg-[#307FA7] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0 overflow-y-auto pb-20 min-h-screen" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 text-white lg:hidden cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {biodata?.profilePic ? (
          <Image
            src={biodata?.profilePic || profileImage}
            alt="Male"
            width={80}
            height={40}
            priority
            className="bg-[#77a1b8] p-4 rounded-full"
          />
        ) : (
          <div className="bg-[#77a1b8] p-4 rounded-full">
            <User className="w-10 h-10 text-white" />
          </div>
        )}
        <div className="p-2 text-center text-white">
          {biodataFormData?.primaryInfoFormData?.fullName}
        </div>
        <div className="mb-4 p-3 bg-[#c6d8e1] text-black rounded-xl">
          {user?.role === "SUPER_ADMIN" ? (
            <span className="font-semibold">SUPER ADMIN</span>
          ) : (
            <>
              বায়োডাটা নং:{" "}
              <span className="font-semibold">{biodata?.code || "--"}</span>
            </>
          )}
        </div>
        <Link
          href={`/dashboard`}
          className={`p-2 w-full text-center  ${isActive("/dashboard") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          ড্যাশবোর্ড
        </Link>
        <Link
          href={`/dashboard/biodata`}
          className={`p-2 w-full text-center  ${isActive("/dashboard/biodata") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          বায়োডাটা
        </Link>
        <Link
          href={`/dashboard/notification`}
          className={`p-2 w-full text-center  ${isActive("/dashboard/notification") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          নোটিফিকেশন
        </Link>
        <Link
          href={`/dashboard/favourite`}
          className={`p-2 w-full text-center  ${isActive("/dashboard/favourite") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          পছন্দের তালিকা
        </Link>
        <Link
          href={`/dashboard/shortlist`}
          className={`p-2 w-full text-center  ${isActive("/dashboard/shortlist") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          চুড়ান্ত তালিকা
        </Link>
        <Link
          href={`/dashboard/proposal`}
          className={`p-2 w-full text-center  ${isActive("/dashboard/proposal") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          প্রাথমিক প্রস্তাবের তালিকা
        </Link>
        <Link
          href={`/dashboard/contact`}
          className={`p-2 w-full text-center  ${isActive("/dashboard/contact") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          যোগাযোগ তথ্যের তালিকা
        </Link>
        <Link
          href={`/dashboard/token`}
          className={`p-2 w-full text-center  ${isActive("/dashboard/token") ? "bg-[#eff9ff] text-black" : "hover:bg-[#eff9ff] hover:text-black text-white"}`}
          onClick={onClose}
        >
          টোকেন
        </Link>
      </div>
    </>
  );
}
