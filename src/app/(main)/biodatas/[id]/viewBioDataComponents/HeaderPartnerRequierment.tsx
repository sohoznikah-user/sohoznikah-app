import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function HeaderPartnerRequierment() {
  return (
    <Card className="w-1/2 bg-white text-black border-none rounded-4xl">
      <CardHeader className="flex items-center">
        <div className="text-lg text-white bg-[#016ca7] p-4 rounded-xl">
          যেমন জীবনসঙ্গী আশা করেন
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>বৈবাহিক অবস্থা</div>
            <div>অবিবাহিত</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>জন্মসন</div>
            <div>১৯৯০</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>উচ্চতা</div>
            <div>৫'১০"</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>গাত্রবর্ণ</div>
            <div>উজ্জ্বল শ্যামলা</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>শিক্ষা</div>
            <div>BSC in EEE</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>পেশা</div>
            <div>ইঞ্জিনিয়ার</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>জেলা</div>
            <div>রাজশাহী</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>ওজন</div>
            <div>৬৫ কেজি</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>রক্তের গ্রুপ</div>
            <div>B+</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>পরিবার</div>
            <div>মধ্যবিত্ত</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>জাতীয়তা</div>
            <div>বাংলাদেশী</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>ধর্মীয় লাইফস্টাইল</div>
            <div>জেনারেল/নন-প্রাক্টিসিং</div>
          </div>
          <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
            <div>বিশেষ চাওয়া</div>
            <div>ইঞ্জিনিয়ার</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
