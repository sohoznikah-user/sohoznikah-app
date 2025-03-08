import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReligiousInfo() {
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center font-medium">
          ধর্মীয় লাইফস্টাইল
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            আপনি কি আপনার জীবনকে পরিপূর্ণ ভাবে ইসলামিক বিধি-বিধান অনুযায়ী
            পরিচালনা করেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            জেনারেল/নন-প্রাক্টিসিং
          </div>
        </div>

        {/* Non Practicing */}
        <div className="flex items-center space-x-2">
          <div className="w-1/2">ধর্মীয় কোন মতাদর্শ মেনে চলেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">সুন্নি</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">কোন মাজহাব / মানহাজ অনুসরণ করেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">সালাফি</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়া হয়?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>

        {/* Try Practicing */}
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনার কি নামাজ কাযা হয়?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত আছেন কি?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>

        {/* Practicing Common */}
        <div className="flex items-center space-x-2">
          <div className="w-1/2">মাহরাম/গাইরে-মাহরাম মেনে চলেন কি?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            পীর-মুরিদ ও মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            কত সাল/সময় থেকে পরিপূর্ণভাবে দ্বীনের পথে চলা শুরু করেছেন?
          </div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>

        {/* Practicing Male */}
        <div className="flex items-center space-x-2">
          <div className="w-1/2">টাখনুর উপরে কাপড় পরেন কিনা?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>

        {/* Practicing Female */}
        <div className="flex items-center space-x-2">
          <div className="w-1/2">আপনি কি নিকাব সহ পর্দা করেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">নিজের জন্য</div>
        </div>
      </CardContent>
    </Card>
  );
}
