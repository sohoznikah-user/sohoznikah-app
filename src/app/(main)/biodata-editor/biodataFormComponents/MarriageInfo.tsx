import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BiodataFormDataProps, MarriageInfoFormData } from "@/lib/types";
import { marriageInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { afterMarriageJobs, afterMarriageStuties } from "@/lib/consts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MarriageInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

  const form = useForm<MarriageInfoFormData>({
    resolver: zodResolver(marriageInfoFormData),
    defaultValues: {
      guardianApproval:
        biodataFormData?.marriageInfoFormData?.guardianApproval || "",
      continueStudy: biodataFormData?.marriageInfoFormData?.continueStudy || "",
      careerPlan: biodataFormData?.marriageInfoFormData?.careerPlan || "",
      residence: biodataFormData?.marriageInfoFormData?.residence || "",
      arrangeHijab: biodataFormData?.marriageInfoFormData?.arrangeHijab || "",
      dowryExpectation:
        biodataFormData?.marriageInfoFormData?.dowryExpectation || "",
      allowShowingPhotoOnline:
        biodataFormData?.marriageInfoFormData?.allowShowingPhotoOnline || "",
      additionalMarriageInfo:
        biodataFormData?.marriageInfoFormData?.additionalMarriageInfo || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      if (submittedOnce) {
        await form.trigger();
      }
      setBiodataFormData({
        ...biodataFormData,
        marriageInfoFormData: { ...values },
      });
    });
    return unsubscribe;
  }, [
    submittedOnce,
    setSubmittedOnce,
    form,
    biodataFormData,
    setBiodataFormData,
  ]);

  const handleNextClick = async () => {
    setSubmittedOnce(true);
    const isValid = await form.trigger();
    if (isValid) {
      handleSave();
    }
  };

  const afterMarriageStutyOptions = afterMarriageStuties.filter((x) =>
    x.for.includes(biodataFormData?.primaryInfoFormData?.biodataType)
  );

  const afterMarriageJobOptions = afterMarriageJobs.filter((x) =>
    x.for.includes(biodataFormData?.primaryInfoFormData?.biodataType)
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">বিয়ে সংক্রান্ত তথ্য</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="guardianApproval"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>অভিভাবক আপনার বিয়েতে রাজি আছেন?</div>
                    <div className="text-xs">
                      (যদি অভিভাবক রাজি নাও থাকে তাহলে এর কারণ লিখুন এবং
                      সেক্ষেত্রে আপনি কেন বিবাহে আগাচ্ছেন সেটা বিস্তারিত লিখুন।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="continueStudy"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataFormData?.primaryInfoFormData?.biodataType === "1"
                      ? "বিয়ের পর স্ত্রীকে পড়াশোনা করতে দিতে চান?"
                      : "বিয়ের পর পড়াশোনা চালিয়ে যেতে চান? (ছাত্রী হলে)"}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="w-full flex flex-wrap gap-0"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {afterMarriageStutyOptions.map((x) => (
                        <div
                          key={x.id}
                          className="w-1/4 flex items-center space-x-2 mb-2"
                        >
                          <RadioGroupItem value={x.id} id={x.id} />
                          <Label htmlFor={x.id}>{x.title}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="careerPlan"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataFormData?.primaryInfoFormData?.biodataType === "1"
                      ? "বিয়ের পর স্ত্রী চাইলে চাকরি বা ব্যবসা করতে দিবেন?"
                      : "আপনি কি বিয়ের পর চাকরি বা ব্যবসা করতে ইচ্ছুক?"}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="w-full flex flex-wrap gap-0"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {afterMarriageJobOptions.map((x) => (
                        <div
                          key={x.id}
                          className="w-1/4 flex items-center space-x-2 mb-2"
                        >
                          <RadioGroupItem value={x.id} id={x.id} />
                          <Label htmlFor={x.id}>{x.title}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residence"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataFormData?.primaryInfoFormData?.biodataType === "1"
                      ? "বিয়ের পর স্ত্রীকে নিয়ে কোথায় থাকবেন?"
                      : "যৌথ বা একক পরিবারে থাকার ব্যাপারে আপনি কোনটি পছন্দ করেন?"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrangeHijab"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataFormData?.primaryInfoFormData?.biodataType === "1"
                      ? "বাড়িতে বা বাহিরে স্ত্রী পর্দা করতে চাইলে পর্দার ব্যবস্থা রাখতে পারবেন?"
                      : "বাড়িতে বা বাহিরে পর্দা করতে ইচ্ছুক?"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dowryExpectation"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataFormData?.primaryInfoFormData?.biodataType === "1"
                      ? "বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক / উপহার / অর্থ আশা করবেন কিনা?"
                      : "বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রপক্ষকে যৌতুক / উপহার / অর্থ দিতে ইচ্ছুক?"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowShowingPhotoOnline"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataFormData?.primaryInfoFormData?.biodataType === "1"
                      ? "পাত্রীপক্ষ"
                      : "পাত্রপক্ষ"}{" "}
                    অনলাইনে আপনার ছবি দেখতে চাইলে দেখাতে রাজি আছেন?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalMarriageInfo"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>
                      বিয়ে সংক্রান্ত আরো কিছু জানাতে চাইলে এখানে লিখুন: অন্যথায়
                      খালি রাখুন।
                    </div>
                    <div className="text-xs">
                      (যেমন: পাত্র-পাত্রী সাক্ষাতের ব্যাপারে, অভিভাবকদের মতামত
                      নিয়ে, কেমন বিয়ে চান, বিয়ের পর কোন কোন বিষয় ছাড় দিতে রাজি
                      নন ইত্যাদি কিছু জানানোর থাকলে লিখুন।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
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
          Next
        </Button>
      </div>
    </div>
  );
}
