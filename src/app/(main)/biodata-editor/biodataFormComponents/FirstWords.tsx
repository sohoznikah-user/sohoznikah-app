// File: src/app/(main)/biodata-editor/biodataFormComponents/FirstWords.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FirstWordsFormData } from "@/lib/types";
import { firstWordsFormData } from "@/lib/validations";
import { updateBiodataFormData } from "@/redux/features/biodata/biodataSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface BiodataFormDataProps {
  biodataFormData: any;
  handleSave: () => void;
  currentStep: any;
  setCurrentStep: (step: string) => void;
}

export default function FirstWords({
  biodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const dispatch = useAppDispatch();
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

  const form = useForm<FirstWordsFormData>({
    resolver: zodResolver(firstWordsFormData),
    defaultValues: {
      preApprovalAcceptTerms:
        biodataFormData?.firstWordsFormData?.preApprovalAcceptTerms || false,
      preApprovalOathTruthfulInfo:
        biodataFormData?.firstWordsFormData?.preApprovalOathTruthfulInfo ||
        false,
      preApprovalOathLegalResponsibility:
        biodataFormData?.firstWordsFormData
          ?.preApprovalOathLegalResponsibility || false,
    },
  });

  const handleNextClick = async () => {
    setSubmittedOnce(true);
    const isValid = await form.trigger();
    if (isValid) {
      const formValues = form.getValues();
      // Only update if we have valid values
      if (Object.values(formValues).some((value) => value !== undefined)) {
        dispatch(
          updateBiodataFormData({
            key: "firstWordsFormData",
            data: formValues,
          })
        );
        handleSave();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-[#004972]">
        বায়োডাটা তৈরির পূর্বে কিছু গুরুত্বপূর্ণ কথা
      </div>
      <div className="max-w-4xl w-full space-y-4 text-sm text-black">
        <div>
          আপনি যখন সহজনিকাহ ম্যাট্রিমনিতে জীবনসঙ্গী খুঁজতে এসেছেন, এর মানে হলো,
          আপনি বিবাহের একটি অত্যন্ত গুরুত্বপূর্ণ অধ্যায় অতিবাহিত করছেন। চাকরির
          জন্য যেমন সুন্দর করে গুছিয়ে একটি সিভি তৈরি করা হয়, ঠিক তেমনি
          জীবনসঙ্গী নির্বাচনের ক্ষেত্রে আরও বেশি সুন্দর করে এবং গুরুত্ব দিয়ে
          বায়োডাটা তৈরি করা উচিত। কেননা যিনি আপনার কাছে জীবনসঙ্গী হয়ে আসবেন,
          তিনি যেন এই বায়োডাটার মাধ্যমে আপনাকে সঠিকভাবে জানাতে এবং বুঝতে পারেন।
        </div>
        <div>
          তাই সময় নিয়ে, মনোযোগ দিয়ে আপনার বায়োডাটা গুছিয়ে তৈরি করুন। প্রতিটি
          প্রশ্নের উত্তর সত্য এবং সঠিকভাবে দিন এবং নিশ্চিত করুন যে, তথ্যগুলো
          আপনাকে অপরপক্ষের কাছে সঠিকভাবে উপস্থাপন করছে। সম্পূর্ণ বায়োডাটা
          তৈরিতে বেশ কিছুটা সময় লাগবে, কারণ এখানে অনেকগুলো প্রশ্ন আছে। কাজেই
          ধৈর্য্য সহকারে, বেশ কিছুটা সময় নিয়ে বায়োডাটা ফর্ম পূরণ করুন।
          (আনুমানিক ৩০ মিনিট)
        </div>
        <div>
          বি: দ্র:{" "}
          <span className="text-[#005A8B]">
            আপনার এই বায়োডাটা কেউ পছন্দ করলে এবং আপনার সাথে যোগাযোগ করতে চাইলে
            শুধুমাত্র আপনার অভিভাবকের যোগাযোগের মোবাইল নম্বর প্রদান করা হবে।
            একইভাবে আপনিও কোনো বায়োডাটার যোগাযোগ তথ্য নিতে চাইলে শুধুমাত্র
            অভিভাবকের যোগাযোগ নম্বর নিতে পারবেন।
          </span>
        </div>
      </div>
      <div className="max-w-4xl w-full bg-[#f6f6f6] py-6 px-12 space-y-4 text-black rounded-4xl">
        <div className="text-[#005A8B] text-xl">
          বায়োডাটা অ্যাপ্রুভ হওয়ার শর্তসমূহ:
        </div>
        <div className="text-sm">
          <ol className="list-decimal space-y-1">
            <li>
              অবশ্যই মুসলিম হতে হবে। সহজনিকাহ শুধুমাত্র প্রাক্টিসিং,
              নন-প্রাক্টিসিং সহ সকল ধরণের মুসলিমদের নিয়ে কাজ করে থাকে।
            </li>
            <li>
              ছেলেদের বয়স কমপক্ষে ২১ বছর এবং মেয়েদের ক্ষেত্রে ১৮ বছর হতে হবে।
            </li>
            <li>
              অভিভাবকের যোগাযোগ তথ্যের ঘরে পাত্র/পাত্রীর নিজের বা বন্ধুর মোবাইল
              নম্বর প্রদান করা যাবে না।
            </li>
            <li>
              বাংলা, ইংলিশ মিশ্রিত বাংলিশ ভাষায় লেখা যাবে না। পুরোটাই বাংলায়
              অথবা পুরোটাই ইংরেজিতে লিখতে হবে।
            </li>
            <li>
              নিজের শিক্ষা, পেশা এবং পারিবারিক তথ্যে বিস্তারিত উত্তর লিখতে হবে।
            </li>
            <li>
              তথ্য ভেরিফিকেশনের সময় বায়োডাটায় দেওয়া তথ্যের সাথে মিল থাকতে হবে।
            </li>
          </ol>
        </div>
      </div>
      <Form {...form}>
        <form className="max-w-4xl w-full bg-[#f6f6f6] p-6 space-y-4 text-black rounded-4xl">
          <div className="text-[#005A8B] text-xl">প্রতিশ্রুতি নামা:</div>
          <div className="text-[#cd0000] space-y-2">
            <FormField
              control={form.control}
              name="preApprovalAcceptTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-4.5">
                      আমি শর্তসমূহ পড়েছি এবং তা মেনে চলার প্রতিশ্রুতি দিচ্ছি।
                    </FormLabel>

                    {/* <FormDescription>
                      Describe what this resume is for.
                    </FormDescription> */}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preApprovalOathTruthfulInfo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-4.5">
                      আমি আল্লাহর নামে শপথ করছি যে, বায়োডাটায় সকল তথ্য সত্য
                      প্রদান করবো।
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preApprovalOathLegalResponsibility"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-4.5">
                      আমি আরও শপথ করছি যে, কোনো মিথ্যা তথ্য প্রদান করলে দুনিয়াবী
                      যেকোনো আইনী জটিলতা এবং পরকালীন সকল দায়ভার আমি বহন করবো।
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <div className="max-w-4xl w-full space-x-2 flex justify-center">
        <Button
          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]"
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
