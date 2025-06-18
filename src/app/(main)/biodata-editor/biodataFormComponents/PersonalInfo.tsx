// File: src/app/(main)/biodata-editor/biodataFormComponents/PersonalInfo.tsx

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
import { characteristics, specialCatagories } from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  PersonalInfoFormData,
} from "@/lib/types";
import { personalInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function PersonalInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoFormData),
    defaultValues: {
      beardStatus: biodataFormData?.personalInfoFormData?.beardStatus || "",
      preferredOutfit:
        biodataFormData?.personalInfoFormData?.preferredOutfit || "",
      entertainmentPreferences:
        biodataFormData?.personalInfoFormData?.entertainmentPreferences || "",
      healthConditions:
        biodataFormData?.personalInfoFormData?.healthConditions || "",
      personalTraits:
        biodataFormData?.personalInfoFormData?.personalTraits || [],
      genderEqualityView:
        biodataFormData?.personalInfoFormData?.genderEqualityView || "",
      lgbtqOpinion: biodataFormData?.personalInfoFormData?.lgbtqOpinion || "",
      specialConditions:
        biodataFormData?.personalInfoFormData?.specialConditions || [],
      aboutYourself: biodataFormData?.personalInfoFormData?.aboutYourself || "",
    },
  });

  const specialCatagoryOptions = specialCatagories.filter(
    (x) =>
      x.for === biodataFormData?.primaryInfoFormData?.biodataType ||
      x.for === "both"
  );

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.personalInfoFormData;
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
      form.setFocus(
        Object.keys(form.formState.errors)[0] as keyof PersonalInfoFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">ব্যক্তিগত তথ্য</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="beardStatus"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataFormData?.primaryInfoFormData?.biodataType === "1"
                      ? "আপনি দাড়ি রেখেছেন কি?"
                      : "আপনার কি দাড়ি পছন্দ?"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="দাড়ি রেখেছেন কি?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredOutfit"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    বাড়ির বাহিরে সাধারণত কী ধরণের পোশাক পড়তে পছন্দ করেন?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="পোশাক ধরণ"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entertainmentPreferences"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    নাটক/সিনেমা/সিরিয়াল/গান/খেলা এসবের কোনটি দেখেন বা শুনেন?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="নাটক/সিনেমা/সিরিয়াল/গান/খেলা এসবের কোনটি দেখেন বা শুনেন?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="healthConditions"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    মানসিক বা শারীরিক কোনো রোগ আছে কি? থাকলে বিস্তারিত লিখুন।
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মানসিক বা শারীরিক কোনো রোগ আছে কি? থাকলে বিস্তারিত লিখুন।"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalTraits"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    নিজের কিছু গুণাবলী চিহ্নিত করুন:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {characteristics.map((x) => (
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
            name="genderEqualityView"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    নারী-পুরুষ সমঅধীকার বিষয়টাকে আপনি কিভাবে দেখেন?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="নারী-পুরুষ সমঅধীকার বিষয়টাকে আপনি কিভাবে দেখেন?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lgbtqOpinion"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    সমকামিতা বা LGBTQ সম্পর্কে আপনার ধারণা কি?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="সমকামিতা বা LGBTQ সম্পর্কে আপনার ধারণা কি?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialConditions"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-4">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনার ক্ষেত্রে প্রযোজ্য এমন বিশেষ কোনো অবস্থা বা কার্যক্রম:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  justify-between ">
                      {specialCatagoryOptions.map((x) => (
                        <div
                          key={x.id}
                          className="w-[95%] flex items-center space-x-2 mb-4"
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
            name="aboutYourself"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>নিজের মতো করে নিজের সম্পর্কে কিছু লিখুন:</div>
                    <div className="text-sm">
                      (আপনার স্বভাব চরিত্র, ভবিষ্যত পরিকল্পনা, শখ-আগ্রহ ইত্যাদি
                      সম্পর্কে লিখতে পারেন।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="নিজের সম্পর্কে লিখুন"
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
