import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  IdCard,
  Send,
  Mail,
  CircleChevronDown,
  Copy,
} from "lucide-react";
import Image from "next/image";
import male from "@/assets/images/male-5.svg";
import Link from "next/link";
import HeaderSpousePreferenceRequierment from "./HeaderSpousePreferenceRequierment";
import HeaderShortBio from "./HeaderShortBio";

export default function HeaderSection() {
  return (
    <div className="py-12 flex justify-center bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <div className="min-w-7xl flex space-x-8">
        <div className="w-1/4 flex flex-col space-y-8">
          <Card className="bg-white text-black border-none rounded-4xl">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full flex items-start justify-between">
                  <div className="w-1 text-[#00b754] text-md font-semibold">
                    Verified
                  </div>
                  <Image
                    src={male}
                    alt="Male"
                    width={100}
                    height={40}
                    priority
                  />
                  <div className="w-1"></div>
                </div>

                <div className="text-lg">
                  বায়োডাটা কোড: <span className="font-semibold">SNM-392</span>
                </div>

                <div className="flex space-x-4 border border-gray-400 rounded-xl p-4">
                  <Heart className="h-6 w-6" />
                  <IdCard className="h-6 w-6" />
                  <Copy className="h-6 w-6 rotate-90" />
                  <Mail className="h-6 w-6" />
                  <CircleChevronDown className="h-6 w-6 text-[#b52d1f]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white text-black border-none rounded-4xl">
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div className="text-xl font-medium text-center mb-4 text-[#b52d1f]">
                  আপনি আগ্রহী?
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div>প্রাথমিক প্রস্তাব পাঠান</div>
                    <div className="text-xs text-[#e25a6f]">
                      ১টি টোকেন খরচ হবে
                    </div>
                  </div>
                  <div className="bg-[#e25a6f] px-4 py-2 rounded-xl">
                    <Send
                      className="h-6 w-6"
                      fill="white"
                      stroke="#e25a6f"
                      strokeOpacity={0.5}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-x-2">
                    <div>অভিভাবকের যোগাযোগ তথ্য দেখুন</div>
                    <div className="text-xs text-[#e25a6f]">
                      ১টি টোকেন খরচ হবে
                    </div>
                  </div>
                  <div className="bg-[#e25a6f] px-4 py-2 rounded-xl">
                    <Send
                      className="h-6 w-6"
                      fill="white"
                      stroke="#e25a6f"
                      strokeOpacity={0.5}
                    />
                  </div>
                </div>
                <Link
                  href="/tutorial"
                  className="text-xs text-center hover:underline text-blue-300"
                >
                  (বিস্তারিত জানুন)
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-3/4 flex space-x-8">
          <HeaderShortBio />
          <HeaderSpousePreferenceRequierment />
        </div>
      </div>
    </div>
  );
}
