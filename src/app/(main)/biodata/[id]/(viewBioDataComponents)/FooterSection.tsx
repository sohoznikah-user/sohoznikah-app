import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Heart,
  IdCard,
  Send,
  Mail,
  CircleChevronDown,
  Copy,
} from "lucide-react";
import Image from "next/image";
import male from "@/assets/images/male.svg";
import Link from "next/link";
import HeaderPartnerRequierment from "./HeaderPartnerRequierment";
import HeaderShortBio from "./HeaderShortBio";

export default function FooterSection() {
  return (
    <div className="py-12 max-w-6xl mx-auto">
      <div className="text-4xl text-center text-[#004972] mb-4">
        বায়োডাটা পছন্দ হয়েছে?
      </div>
      <div className="text-md text-center text-black mb-8">
        আপনি আগ্রহী হলে আপনার জন্য ৩টি অপশন রয়েছে।
      </div>
      <div className="max-w-5xl w-full mx-auto flex space-x-4 text-black">
        <Card className="w-1/3 border-gray-200 bg-white text-black p-2">
          <CardContent className="px-6 py-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="min-h-22 text-xl text-center">
                প্রাথমিক প্রস্তাব পাঠিয়ে আপনার প্রতি আগ্রহী কিনা জানতে পারেন
              </div>
              <div className="bg-[#c65a5a] text-white rounded-2xl px-6 py-4">
                প্রাথমিক প্রস্তাব পাঠান
              </div>
              <Link
                href="/tutorial"
                className="text-xs hover:underline text-[#c65a5a]"
              >
                (বিস্তারিত জানুন)
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/3 border-gray-200 bg-white text-black p-2">
          <CardContent className="px-6 py-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="min-h-22 text-xl text-center">
                পাত্র-পাত্রীর অনুমোদন সাপেক্ষে ছবি দেখতে পারেন
              </div>
              <div className="bg-[#c65a5a] text-white rounded-2xl px-6 py-4">
                ছবি দেখার জন্য অনুরোধ পাঠান
              </div>
              <Link
                href="/tutorial"
                className="text-xs hover:underline text-[#c65a5a]"
              >
                (বিস্তারিত জানুন)
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/3 border-gray-200 bg-white text-black p-2">
          <CardContent className="px-6 py-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="min-h-22 text-xl text-center">
                সরাসরি অভিভাবকের যোগাযোগ তথ্য দেখতে পারেন
              </div>
              <div className="bg-[#c65a5a] text-white rounded-2xl px-6 py-4">
                যোগাযোগ তথ্য দেখুন
              </div>
              <Link
                href="/tutorial"
                className="text-xs hover:underline text-[#c65a5a]"
              >
                (বিস্তারিত জানুন)
              </Link>
            </div>
          </CardContent>
        </Card>
        {/* <div>পাত্র-পাত্রীর অনুমোদন সাপেক্ষে ছবি দেখতে পারেন</div>
        <div>সরাসরি অভিভাবকের যোগাযোগ তথ্য দেখতে পারেন</div> */}
      </div>
    </div>
  );
}
