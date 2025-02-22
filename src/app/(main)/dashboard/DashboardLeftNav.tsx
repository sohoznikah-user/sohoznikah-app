import Image from "next/image";
import profilePic from "@/assets/images/profile-pic.png";
import { Separator } from "@/components/ui/separator";

export default function DashboardLeftNav() {
  return (
    <div className="py-12 w-72 flex flex-col items-center space-y-1 bg-[#5b8eaa]">
      <Image
        src={profilePic}
        alt="Male"
        width={80}
        height={40}
        priority
        className="bg-[#77a1b8] p-4 rounded-full"
      />
      <div className="p-2">আব্দুল্লাহ বিন আব্দুর রাজ্জাক</div>
      <div className="mb-4 p-3 bg-[#c6d8e1] text-black rounded-xl">
        বায়োডাটা নং: <span className="font-semibold">43527</span>
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        বায়োডাটা
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        নোটিফিকেশন
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        পছন্দের তালিকা
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        শর্টলিস্টের তালিকা
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        শর্টলিস্টের তালিকা
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        যোগাযোগ তথ্যের তালিকা
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        টোকেন
      </div>
      <div className="p-2 w-full text-center hover:bg-[#eff9ff] hover:text-black">
        বিবাহ সম্পন্ন
      </div>
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
