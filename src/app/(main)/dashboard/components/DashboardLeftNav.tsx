// File: src/app/(main)/dashboard/DashboardLeftNav.tsx
import female from "@/assets/images/female-1.svg";
import male from "@/assets/images/male-5.svg";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
        className={`fixed lg:static overflow-y-auto  top-0 left-0 min-h-screen max-h-full lg:h-full  py-8 pb-20 lg:pb-12 w-72 flex flex-col items-center space-y-1 bg-[#307FA7] lg:bg-[#307FA7] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 text-white lg:hidden cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <Image
          src={
            user?.role === "SUPER_ADMIN"
              ? male
              : biodata?.profilePic || profileImage
          }
          alt="Male"
          width={80}
          height={40}
          priority
          className="bg-[#77a1b8] p-4 rounded-full"
        />
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
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          ড্যাশবোর্ড
        </Link>
        <Link
          href={`/dashboard/biodata`}
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          বায়োডাটা
        </Link>
        <Link
          href={`/dashboard/notification`}
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          নোটিফিকেশন
        </Link>
        <Link
          href={`/dashboard/favourite`}
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          পছন্দের তালিকা
        </Link>
        <Link
          href={`/dashboard/shortlist`}
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          চুড়ান্ত তালিকা
        </Link>
        <Link
          href={`/dashboard/proposal`}
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          প্রাথমিক প্রস্তাবের তালিকা
        </Link>
        <Link
          href={`/dashboard/contact`}
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          যোগাযোগ তথ্যের তালিকা
        </Link>
        <Link
          href={`/dashboard/token`}
          className="p-2 w-full text-center text-white hover:bg-[#eff9ff] hover:text-black"
          onClick={onClose}
        >
          টোকেন
        </Link>
      </div>
    </>
  );
}
