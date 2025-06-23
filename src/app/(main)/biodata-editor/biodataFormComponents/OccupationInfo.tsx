// File: src/app/(main)/biodata-editor/biodataFormComponents/OccupationInfo.tsx

"use client";

import BiodataEditText from "@/components/shared/BiodataEditText";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { occupationsList } from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  OccupationInfoFormData,
} from "@/lib/types";
import { occupationInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function OccupationInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

  const form = useForm<OccupationInfoFormData>({
    resolver: zodResolver(occupationInfoFormData),
    defaultValues: {
      occupations: biodataFormData?.occupationInfoFormData?.occupations || [],
      detail: biodataFormData?.occupationInfoFormData?.detail || "",
      monthlyIncome:
        biodataFormData?.occupationInfoFormData?.monthlyIncome || "",
    },
  });

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.occupationInfoFormData;
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
      toast.error("সকল প্রশ্নের ফিল্ড পূরণ করুন");
      form.setFocus(
        Object.keys(form.formState.errors)[0] as keyof OccupationInfoFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">পেশা</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="occupations"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনার পেশা:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {occupationsList.map((x) => (
                        <div
                          key={x.id}
                          className="w-1/3 flex items-center space-x-2 mb-4"
                        >
                          <Checkbox
                            id={x.id}
                            checked={field.value.includes(x.id)}
                            onCheckedChange={(checked) => {
                              const updatedOccupations = checked
                                ? [...field.value, x.id]
                                : field.value.filter((id) => id !== x.id);

                              field.onChange(updatedOccupations);
                            }}
                          />
                          <Label htmlFor={x.id}>{x.title}</Label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পেশা নিয়ে বিস্তারিত লিখুন:</div>
                    <div className="text-xs">
                      (অর্থাৎ আপনার কর্মস্থল কোথায়, কি ধরণের কাজে দায়িত্বরত আছেন
                      বা পদবি কি, এগুলো নিয়ে বিস্তারিত লিখুন। পেশা না থাকলে খালি
                      রাখুন।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="পেশা নিয়ে বিস্তারিত লিখুন।"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>মাসিক আয়:</div>
                    <div className="text-xs">(পেশা না থাকলে খালি রাখুন।)</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মাসিক আয়"
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
          Save & Next
        </Button>
      </div>

      <BiodataEditText />
    </div>
  );
}
