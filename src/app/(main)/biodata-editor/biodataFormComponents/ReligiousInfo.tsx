"use client";

import BiodataEditText from "@/components/shared/BiodataEditText";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { madhhabs, religiousIdeologies } from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  ReligiousInfoFormData,
} from "@/lib/types";
import { religiousInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ReligiousInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const form = useForm<ReligiousInfoFormData>({
    resolver: zodResolver(religiousInfoFormData),
    defaultValues: {
      type: biodataFormData?.religiousInfoFormData?.type || "",
      ideology: biodataFormData?.religiousInfoFormData?.ideology || "",
      madhab: biodataFormData?.religiousInfoFormData?.madhab || "",
      praysFiveTimes:
        biodataFormData?.religiousInfoFormData?.praysFiveTimes || "",
      hasQazaPrayers:
        biodataFormData?.religiousInfoFormData?.hasQazaPrayers || "",
      canReciteQuranProperly:
        biodataFormData?.religiousInfoFormData?.canReciteQuranProperly || "",
      avoidsHaramIncome:
        biodataFormData?.religiousInfoFormData?.avoidsHaramIncome || "",
      modestDressing:
        biodataFormData?.religiousInfoFormData?.modestDressing || "",
      followsMahramRules:
        biodataFormData?.religiousInfoFormData?.followsMahramRules || "",
      beliefAboutPirMurshidAndMazar:
        biodataFormData?.religiousInfoFormData?.beliefAboutPirMurshidAndMazar ||
        "",
      practicingSince:
        biodataFormData?.religiousInfoFormData?.practicingSince || "",
    },
  });

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.religiousInfoFormData;
      if (JSON.stringify(values) !== JSON.stringify(currentValues)) {
        setBiodataFormData(values as BiodataFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setBiodataFormData, biodataFormData]);

  // Handle next button click
  const handleNextClick = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      handleSave();
    } else {
      toast.error(JSON.stringify(form.formState.errors));
      form.setFocus(
        Object.keys(form.formState.errors)[0] as keyof ReligiousInfoFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">ধর্মীয় লাইফস্টাইল</div>
      <Form {...form}>
        <div className="text-lg font-semibold">
          আপনি কি আপনার জীবনকে পরিপূর্ণ ভাবে ইসলামিক বিধি-বিধান অনুযায়ী পরিচালনা
          করেন?
        </div>
        <div>প্রতিটি অপশনের বিস্তারিত ব্যাখ্যা পড়ে উত্তর দিন।</div>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col md:flex-row gap-4"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="border border-gray-300 p-4 rounded-3xl space-y-6 flex-1">
                        <div className="min-h-32 border border-gray-300 bg-[#f6f6f6] p-4 rounded-xl space-x-2 flex items-center justify-center">
                          <RadioGroupItem
                            value="general"
                            id="general"
                            className="w-5 h-5 cursor-pointer "
                          />
                          <Label
                            htmlFor="general"
                            className="leading-5 space-y-2"
                          >
                            <div className="text-black leading-5">
                              সেরকমভাবে মেনে চলা হয় না
                            </div>
                            <div>(জেনারেল/নন-প্রাক্টিসিং)</div>
                          </Label>
                        </div>
                        <Label className="text-xs leading-4 space-y-2 text-[#A30000]">
                          <div>অর্থাৎ,</div>
                          <div>
                            ১. অনিয়মিতভাবে ৫ ওয়াক্ত বা এর কম সালাত আদায় করা হয়।
                          </div>
                          <div>
                            ২. সকল ক্ষেত্রে হালাল-হারাম বাছাই করা হয় না।
                          </div>
                          <div>৩. মাহরাম-নন মাহরাম মেইনটেইন করা হয় না।</div>
                          <div>
                            ৪. হারাম উপার্জন, ব্যাংকিং সুদ, ফ্রি-মিক্সিং,
                            গান-বাজনা থেকে বিরত থাকা হয় না।
                          </div>
                          <div>
                            ৫. পরিপূর্ন ভাবে ইসলামের বিধিবিধান পালনে তেমন চেষ্টা
                            করা হয় না।
                          </div>
                        </Label>
                      </div>
                      <div className="border border-gray-300 p-4 rounded-3xl space-y-6 flex-1">
                        <div className="min-h-32 border border-gray-300 bg-[#f6f6f6] p-4 rounded-xl space-x-2 flex items-center justify-center">
                          <RadioGroupItem
                            value="practicing"
                            id="practicing"
                            className="w-5 h-5 cursor-pointer "
                          />
                          <Label
                            htmlFor="practicing"
                            className="leading-5 space-y-2"
                          >
                            <div className="text-black">
                              পরিপূর্ণভাবে মেনে চলা হয় না কিন্তু প্রবল ইচ্ছা আছে
                              এবং চেষ্টা করছি
                            </div>
                            <div>(প্রাক্টিসিংয়ের চেষ্টায় আছি)</div>
                          </Label>
                        </div>
                        <Label className="text-xs leading-4 space-y-2 text-[#A30000]">
                          <div>অর্থাৎ,</div>
                          <div>১. নিয়মিত ৫ ওয়াক্ত সালাত আদায় করছেন।</div>
                          <div>
                            ২. হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত থাকছেন।
                          </div>
                          <div>
                            ৩. কিন্তু গান-বাজনা থেকে এখনো দূরে থাকা হয় না।
                          </div>
                          <div>
                            ৪. সুন্নতি দাড়ি, টাখনুর উপর প্যান্ট বা পর্দা এখনো
                            মেনে চলতে পারছেন না।
                          </div>
                          <div>
                            ৫. এর জন্য প্রবল অনুশোচনা কাজ করে এবং পরিপূর্ন ভাবে
                            ইসলামের বিধিবিধান পালনের চেষ্টা করা হয়।
                          </div>
                        </Label>
                      </div>
                      <div className="border border-gray-300 p-4 rounded-3xl space-y-6 flex-1">
                        <div className="min-h-32 border border-gray-300 bg-[#f6f6f6] p-4 rounded-xl space-x-2 flex items-center justify-center">
                          <RadioGroupItem
                            value="devout"
                            id="devout"
                            className="w-5 h-5 cursor-pointer "
                          />
                          <Label
                            htmlFor="devout"
                            className="leading-5 space-y-2"
                          >
                            <div className="text-black leading-5">
                              জি পরিপূর্ণভাবে মেনে চলি এবং সর্বদা চেষ্টায় থাকি
                            </div>
                            <div>(পূর্ণ ধার্মিক/ প্র্যাক্টিসিং)</div>
                          </Label>
                        </div>
                        <Label className="text-xs leading-4 space-y-2 text-[#A30000]">
                          <div>অর্থাৎ,</div>
                          <div>১. বিশুদ্ধ ঈমান-আকিদা পোষণ করছেন।</div>
                          <div>২. নিয়মিত ৫ ওয়াক্ত সালাত আদায় করছেন।</div>
                          <div>৩. পরিপূর্ণ হালাল উপার্জন করছেন ।</div>
                          <div>
                            ৪. ফরজ, ওয়াজিব ইবাদতের পাশাপাশি সুন্নাত, নফল আমল
                            করার চেষ্টা করেন।
                          </div>
                          <div>৫. গান-বাজনা, নাটক-সিনেমা থেকে দূরে থাকছেন।</div>
                          <div>
                            ৬. পুরুষেরা সুন্নতি দাড়ি, টাখনুর উপর প্যান্ট,
                            ইসলামিক পোশাক মেনে চলেন, নারীরা নিকাব সহ পর্দা
                            করছেন।
                          </div>
                          <div>
                            ৭. বাহিরে পর্দা মেনে চলা অর্থাৎ বেগানা নারী-পুরুষের
                            ক্ষেত্রে চক্ষু অবনত রাখছেন।
                          </div>
                          <div>
                            ৮. মাহরাম-নন মাহরাম মেইনটেইন করেন এবং ফ্রী মিক্সিং
                            এড়িয়ে চলেন।
                          </div>
                          <div>
                            ৯. সকল প্রকার হারাম ও কবীরা গুনাহ থেকে বেঁচে থাকার
                            সর্বাত্মক প্রচেষ্টায় থাকেন।
                          </div>
                          <div>
                            ১০. ইসলাম বিরোধী সকল কাজকে অপছন্দ করেন এবং জীবনটাকে
                            পরিপূর্ণভাবে কোরআন-সুন্নাহ মোতাবেক সাজাতে থাকেন।
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ideology"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    ধর্মীয় কোন মতাদর্শ মেনে চলেন?
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                        <SelectValue placeholder="ধর্মীয় মতাদর্শ" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {religiousIdeologies.map((x) => (
                          <SelectItem
                            key={x.id}
                            className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                            value={x.id}
                          >
                            {x.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="madhab"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    কোন মাজহাব / মানহাজ অনুসরণ করেন?
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                        <SelectValue placeholder="মাজহাব / মানহাজ" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {madhhabs.map((x) => (
                          <SelectItem
                            key={x.id}
                            className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                            value={x.id}
                          >
                            {x.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="praysFiveTimes"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    নিয়মিত পাঁচ ওয়াক্ত নামাজ পড়া হয় কি?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="নিয়মিত পাঁচ ওয়াক্ত নামাজ পড়া হয় কি?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {["practicing", "devout"].includes(form.getValues().type) && (
            <FormField
              control={form.control}
              name="hasQazaPrayers"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel className="text-md space-y-1 leading-4.5">
                      আপনার কি নামাজ কাযা হয়?
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                        placeholder="আপনার কি নামাজ কাযা হয়?"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="canReciteQuranProperly"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {["practicing", "devout"].includes(form.getValues().type) && (
            <FormField
              control={form.control}
              name="avoidsHaramIncome"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel className="text-md space-y-1 leading-4.5">
                      হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত আছেন কি?
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                        placeholder="হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত আছেন কি?"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.getValues().type === "devout" && (
            <FormField
              control={form.control}
              name="modestDressing"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel className="text-md space-y-1 leading-4.5">
                      {biodataFormData?.primaryInfoFormData?.biodataType ===
                      "GROOM"
                        ? "টাখনুর উপরে কাপড় পরেন কিনা?"
                        : "আপনি কি নিকাব সহ পর্দা করেন?"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                        placeholder={
                          biodataFormData?.primaryInfoFormData?.biodataType ===
                          "GROOM"
                            ? "টাখনুর উপরে কাপড় পরেন কিনা?"
                            : "আপনি কি নিকাব সহ পর্দা করেন?"
                        }
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.getValues().type === "devout" && (
            <>
              <FormField
                control={form.control}
                name="followsMahramRules"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        মাহরাম/গাইরে-মাহরাম মেনে চলেন কি?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="মাহরাম/গাইরে-মাহরাম মেনে চলেন কি?"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beliefAboutPirMurshidAndMazar"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        পীর-মুরিদ ও মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="পীর-মুরিদ ও মাজার সম্পর্কে ধারণা"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="practicingSince"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        কত সাল/সময় থেকে পরিপূর্ণভাবে দ্বীনের পথে চলা শুরু
                        করেছেন?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: ২০২০"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </form>
      </Form>
      <div className="max-w-4xl w-full space-x-2 flex justify-center">
        <Button
          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]"
          onClick={() => setCurrentStep(currentStep.prev)}
        >
          Previous
        </Button>
        <Button
          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]"
          onClick={handleNextClick}
        >
          Save & Next
        </Button>
      </div>

      <BiodataEditText />
    </div>
  );
}
