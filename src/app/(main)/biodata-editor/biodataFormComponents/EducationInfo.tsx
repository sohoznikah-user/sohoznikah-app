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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { degreeTypes, educationTypes, religiousEducation } from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  EducationInfoFormData,
} from "@/lib/types";
import { educationInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function EducationInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const form = useForm<EducationInfoFormData>({
    resolver: zodResolver(educationInfoFormData),
    defaultValues: {
      type: biodataFormData?.educationInfoFormData?.type || "",
      highestDegree:
        biodataFormData?.educationInfoFormData?.highestDegree || "",
      degrees:
        biodataFormData?.educationInfoFormData?.degrees?.length > 0
          ? biodataFormData?.educationInfoFormData?.degrees.map((x) => ({
              degreeType: x.degreeType,
              name: x.name,
              passYear: x.passYear,
              group: x.group,
              institute: x.institute,
            }))
          : [
              {
                degreeType: "",
                name: "",
                passYear: "",
                group: "",
                institute: "",
              },
            ],
      religiousEducation:
        biodataFormData?.educationInfoFormData?.religiousEducation || [],
      detail: biodataFormData?.educationInfoFormData?.detail || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "degrees",
  });

  const religiousEducationOptions = religiousEducation.filter(
    (x) =>
      x.for === biodataFormData?.primaryInfoFormData?.biodataType ||
      x.for === "both"
  );

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.educationInfoFormData;
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
        Object.keys(form.formState.errors)[0] as keyof EducationInfoFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">শিক্ষাগত যোগ্যতা</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    শিক্ষার ধরণ:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="শিক্ষার ধরণ" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {educationTypes.map((x) => (
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
            name="highestDegree"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনার সর্বোচ্চ শিক্ষাগত ডিগ্রীর নাম:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="শুধুমাত্র ডিগ্রীর নাম লিখবেন (যেমন: অনার্স চলমান/ডিপ্লোমা/এস.এস.সি/৮ম শ্রেণি)"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-[#E25A6F]">
            মাধ্যমিক পর্যায় থেকে শুরু করে এখন পর্যন্ত যেসকল ডিগ্রী অর্জন করেছেন
            বা চলমান রয়েছে সেগুলো নিচে প্লাস বাটন চাপ দিয়ে ধাপে ধাপে যুক্ত করুন।
            কোনো ডিগ্রী না থাকলে খালি রাখুন।
          </div>
          {fields.map((field, index) => (
            <div
              className="flex flex-col space-y-4 items-center rounded-2xl p-4 border border-[#E25A6F]"
              key={field.id}
            >
              <FormField
                control={form.control}
                name={`degrees.${index}.degreeType`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      ডিগ্রীর ধরণ:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                              <SelectValue placeholder="ডিগ্রীর ধরণ" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                              {degreeTypes.map((x) => (
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
                        <Button
                          type="button"
                          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F] p-2"
                          onClick={() => remove(index)}
                        >
                          <Minus size={20} />
                        </Button>
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`degrees.${index}.name`}
                render={({ field }) => {
                  const selectedDegreeType = form.getValues(
                    `degrees.${index}.degreeType`
                  );
                  const isBelowSecondary =
                    selectedDegreeType === "below_secondary";
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        {isBelowSecondary
                          ? "কোন ক্লাস পর্যন্ত পড়েছেন?"
                          : "ডিগ্রীর নাম"}
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              {...field}
                              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                              placeholder={
                                isBelowSecondary
                                  ? "কোন ক্লাস পর্যন্ত পড়েছেন?"
                                  : "ডিগ্রীর নাম"
                              }
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={`degrees.${index}.passYear`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      পাশের সন:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="পাশের সন"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {form.getValues(`degrees.${index}.degreeType`) !==
                "below_secondary" && (
                <FormField
                  control={form.control}
                  name={`degrees.${index}.group`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        বিভাগ/বিষয়:
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <FormControl>
                          <Input
                            {...field}
                            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                            placeholder="বিভাগ/বিষয়"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name={`degrees.${index}.institute`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      শিক্ষা প্রতিষ্ঠানের নাম:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="শিক্ষা প্রতিষ্ঠানের নাম"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F] flex items-center space-x-2"
            onClick={() =>
              append({
                degreeType: "",
                name: "",
                passYear: "",
                group: "",
                institute: "",
              })
            }
          >
            <Plus size={20} /> <span>নতুন ডিগ্রী যোগ করুন</span>
          </Button>
          <FormField
            control={form.control}
            name="religiousEducation"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    দ্বীনি শিক্ষাগত যোগ্যতা:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {religiousEducationOptions?.map((x) => (
                        <div
                          key={x.id}
                          className="w-1/3 flex items-center space-x-2 mb-4"
                        >
                          <Checkbox
                            id={x.id}
                            checked={field.value?.includes(x.id)}
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
                    শিক্ষা সম্পর্কিত আরো কিছু জানাতে চাইলে নিচে লিখুন। অন্যথায়
                    খালি রাখুন।
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="শিক্ষা সম্পর্কিত অতিরিক্ত তথ্য"
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
