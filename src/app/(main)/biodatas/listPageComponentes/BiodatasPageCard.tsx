"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import male from "@/assets/images/male-5.svg";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export interface BiodatasPageCardProps {
  id: number;
}

export default function BioCard({ id }: BiodatasPageCardProps) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/biodatas/asd");
  };
  return (
    <Card
      key={id}
      className="border-none overflow-hidden bg-gradient-to-t from-[#e6f2ff] to-[#fff0f6]"
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="w-1/3">
            <Heart className="w-8 h-8 text-[#E25A6F]" fill="#E25A6F" />
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <Image src={male} alt="Male" width={80} height={40} priority />
          </div>
          <div className="w-1/3 flex flex-col items-end space-y-2">
            <Badge className="text-[#00b754]">Verified</Badge>
            <Badge className="text-[#016ca7]">Seen</Badge>
          </div>
        </div>

        <div className="text-center mb-4 flex items-center justify-center">
          <div className="text-black bg-[#fcfafd] p-3 rounded-md">
            বায়োডাটা নং: 43527
          </div>
        </div>

        <div className="space-y-3 text-black">
          <div className="flex justify-between">
            <span>বৈবাহিক অবস্থা:</span>
            <span>অবিবাহিত</span>
          </div>
          <div className="flex justify-between">
            <span>জন্মসন:</span>
            <span>১৯৯০</span>
          </div>
          <div className="flex justify-between">
            <span>উচ্চতা:</span>
            <span>৫'৩০"</span>
          </div>
          <div className="flex justify-between">
            <span>স্থায়ী ঠিকানা:</span>
            <span>BSC in EEE</span>
          </div>
          <div className="flex justify-between">
            <span>পেশা:</span>
            <span>ইঞ্জিনিয়ার</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-white bg-[#E25A6F]  hover:bg-[#D14A5F]"
          onClick={handleOnClick}
        >
          বায়োডাটা দেখুন
        </Button>
      </CardFooter>
    </Card>
  );
}
