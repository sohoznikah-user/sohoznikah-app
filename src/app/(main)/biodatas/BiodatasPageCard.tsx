import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import male from "@/assets/images/male.svg";
import { Heart } from "lucide-react";

export interface BiodatasPageCardProps {
  id: number;
}

export default function BioCard({ id }: BiodatasPageCardProps) {
  return (
    <Card
      key={id}
      className="border-none overflow-hidden bg-gradient-to-t from-[#e6f2ff] to-[#fff0f6]"
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <Image src={male} alt="Male" width={100} height={40} priority />
          <div className="flex flex-col items-end space-y-2">
            <Heart className="w-8 h-8 text-[#E25A6F]" fill="#E25A6F" />
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
            <span>শিক্ষা:</span>
            <span>BSC in EEE</span>
          </div>
          <div className="flex justify-between">
            <span>পেশা:</span>
            <span>ইঞ্জিনিয়ার</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-white bg-[#E25A6F]  hover:bg-[#D14A5F]">
          বায়োডাটা দেখুন
        </Button>
      </CardFooter>
    </Card>
  );
}
