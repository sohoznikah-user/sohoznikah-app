// File: src/app/(main)/dashboard/DashboardLeftNav.tsx
import profilePic from "@/assets/images/profile-pic.png";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLeftNav() {
  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);

  return (
    <div className="py-12 w-72 flex flex-col items-center space-y-1 bg-[#5b8eaa]">
      <Image
        src={biodata?.profilePic || profilePic}
        alt="Male"
        width={80}
        height={40}
        priority
        className="bg-[#77a1b8] p-4 rounded-full"
      />
      <div className="p-2">
        {biodataFormData?.primaryInfoFormData?.fullName}
      </div>
      <div className="mb-4 p-3 bg-[#c6d8e1] text-black rounded-xl">
        বায়োডাটা নং:{" "}
        <span className="font-semibold">{biodata?.code || "--"}</span>
      </div>
      <Link
        href={`/dashboard`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        বায়োডাটা
      </Link>
      <Link
        href={`/dashboard/notification`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        নোটিফিকেশন
      </Link>
      <Link
        href={`/dashboard/favourite`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        পছন্দের তালিকা
      </Link>
      <Link
        href={`/dashboard/shortlist`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        শর্টলিস্টের তালিকা
      </Link>
      <Link
        href={`/dashboard/proposal`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        প্রাথমিক প্রস্তাবের তালিকা
      </Link>
      <Link
        href={`/dashboard/contact`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        যোগাযোগ তথ্যের তালিকা
      </Link>
      <Link
        href={`/dashboard/token`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        টোকেন
      </Link>
      <Link
        href={`/dashboard/married`}
        className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black"
      >
        বিবাহ সম্পন্ন
      </Link>
      <Separator className="bg-white my-4" />
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        জিজ্ঞাসা
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        অভিযোগ
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        পরামর্শ
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        মন্তব্য
      </div>
    </div>
  );
}
