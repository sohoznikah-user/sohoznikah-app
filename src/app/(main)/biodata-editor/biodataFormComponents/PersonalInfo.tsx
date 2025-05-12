// File: src/app/(main)/biodata-editor/biodataFormComponents/PersonalInfo.tsx

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
import { BiodataFormDataProps, PersonalInfoFormData } from "@/lib/types";
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
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      if (submittedOnce) {
        await form.trigger();
      }
      setBiodataFormData({
        ...biodataFormData,
        personalInfoFormData: { ...values },
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

  const specialCatagoryOptions = specialCatagories.filter((x) =>
    x.for.includes(biodataFormData?.primaryInfoFormData?.biodataType)
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
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
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনার ক্ষেত্রে প্রযোজ্য এমন বিশেষ কোনো অবস্থা বা কার্যক্রম:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {specialCatagoryOptions.map((x) => (
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
