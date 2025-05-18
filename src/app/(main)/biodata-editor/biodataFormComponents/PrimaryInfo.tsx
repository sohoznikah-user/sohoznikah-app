// File: src/app/(main)/biodata-editor/biodataFormComponents/PrimaryInfo.tsx
"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { biodataTypes } from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  PrimaryInfoFormData,
} from "@/lib/types";
import { primaryInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function PrimaryInfo({
  biodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
  setBiodataFormData,
}: BiodataFormDataProps) {
  const defaultGuardianContacts = [
    { relation: "", fullName: "", phoneNumber: "" },
    { relation: "", fullName: "", phoneNumber: "" },
  ];

  const form = useForm<PrimaryInfoFormData>({
    resolver: zodResolver(primaryInfoFormData),
    defaultValues: {
      biodataType: biodataFormData?.primaryInfoFormData?.biodataType || "",
      biodataFor: biodataFormData?.primaryInfoFormData?.biodataFor || "",
      fullName: biodataFormData?.primaryInfoFormData?.fullName || "",
      fatherName: biodataFormData?.primaryInfoFormData?.fatherName || "",
      motherName: biodataFormData?.primaryInfoFormData?.motherName || "",
      email: biodataFormData?.primaryInfoFormData?.email || "",
      phoneNumber: biodataFormData?.primaryInfoFormData?.phoneNumber || "",
      guardianContacts:
        Array.isArray(biodataFormData?.primaryInfoFormData?.guardianContacts) &&
        biodataFormData.primaryInfoFormData.guardianContacts.length >= 2
          ? // Create a deep copy to avoid immutability issues
            biodataFormData.primaryInfoFormData.guardianContacts.map(
              (contact) => ({
                relation: contact.relation || "",
                fullName: contact.fullName || "",
                phoneNumber: contact.phoneNumber || "",
              })
            )
          : [
              { relation: "", fullName: "", phoneNumber: "" },
              { relation: "", fullName: "", phoneNumber: "" },
            ],
    },
  });

  // Reset form when biodataFormData changes
  useEffect(() => {
    const guardianContacts =
      Array.isArray(biodataFormData?.primaryInfoFormData?.guardianContacts) &&
      biodataFormData.primaryInfoFormData.guardianContacts.length >= 2
        ? biodataFormData.primaryInfoFormData.guardianContacts.map(
            (contact) => ({
              relation: contact.relation || "",
              fullName: contact.fullName || "",
              phoneNumber: contact.phoneNumber || "",
            })
          )
        : [
            { relation: "", fullName: "", phoneNumber: "" },
            { relation: "", fullName: "", phoneNumber: "" },
          ];

    form.reset(
      {
        biodataType: biodataFormData?.primaryInfoFormData?.biodataType || "",
        biodataFor: biodataFormData?.primaryInfoFormData?.biodataFor || "",
        fullName: biodataFormData?.primaryInfoFormData?.fullName || "",
        fatherName: biodataFormData?.primaryInfoFormData?.fatherName || "",
        motherName: biodataFormData?.primaryInfoFormData?.motherName || "",
        email: biodataFormData?.primaryInfoFormData?.email || "",
        phoneNumber: biodataFormData?.primaryInfoFormData?.phoneNumber || "",
        guardianContacts,
      },
      {
        keepDefaultValues: true,
      }
    );
  }, [biodataFormData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "guardianContacts",
  });

  const handleAppend = () => {
    append({ relation: "", fullName: "", phoneNumber: "" });
  };

  const handleRemove = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    } else {
      form.setError(`guardianContacts`, {
        type: "manual",
        message: "কমপক্ষে ২ জন অভিভাবকের তথ্য প্রয়োজন।",
      });
    }
  };

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.primaryInfoFormData;
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
        Object.keys(form.formState.errors)[0] as keyof PrimaryInfoFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">প্রাথমিক তথ্য</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="biodataType"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    বায়োডাটার ধরন:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                        <SelectValue placeholder="বায়োডাটার ধরন" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {biodataTypes.map((x) => (
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
            name="biodataFor"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-lg font-medium text-[#005889]">
                    বায়োডাটা কার জন্য তৈরী করছেন?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="self"
                          id="self"
                          className="h-5 w-5 border-2 border-[#005889] text-[#005889] focus:ring-[#005889]"
                        />
                        <label
                          htmlFor="self"
                          className="text-xs text-[#005889]"
                        >
                          নিজের জন্য
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="other"
                          id="other"
                          className="h-5 w-5 border-2 border-[#005889] text-[#005889] focus:ring-[#005889]"
                        />
                        <label
                          htmlFor="other"
                          className="text-xs text-[#005889]"
                        >
                          বোনের জন্য/বন্ধুর জন্য/ভাগ্নির জন্য
                        </label>
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পাত্র/পাত্রীর সম্পূর্ণ নাম:</div>
                    <div className="text-xs">
                      (NID কার্ডে যে নাম আছে। নাম বায়োডাটায় প্রকাশ করা হবে না।
                      শুধুমাত্র ভেরিফিকেশন ও অপরপক্ষকে যোগাযোগ তথ্য প্রদানের
                      ক্ষেত্রে প্রয়োজন হবে।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="সম্পূর্ণ নাম"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পিতার নাম:</div>
                    <div className="text-xs">
                      (পূর্ণ নাম লিখবেন। বায়োডাটায় প্রকাশ করা হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="পিতার নাম"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>মাতার নাম:</div>
                    <div className="text-xs">
                      (পূর্ণ নাম লিখবেন। বায়োডাটায় প্রকাশ করা হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মাতার নাম"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>ইমেইল আইডি:</div>
                    <div className="text-xs">
                      (পাত্র/পাত্রীর সাথে আমাদের যোগাযোগের জন্য প্রয়োজন হবে।
                      অপরপক্ষ যোগাযোগ তথ্য নিতে চাইলে যুক্তিসঙ্গত কারণ বা
                      প্রয়োজন ছাড়া পাঠানো হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="ইমেইল আইডি"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পাত্র/পাত্রীর মোবাইল নম্বর:</div>
                    <div className="text-xs">
                      (মোবাইল নম্বর শুধুমাত্র ভেরিফিকেশনের জন্য আমাদের কাছে
                      থাকবে। কাউকে প্রদান করা হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মোবাইল নম্বর"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-2">
            <FormLabel className="flex items-center justify-between space-x-8">
              <div className="text-md space-y-1 leading-4.5">
                <div>পাত্র/পাত্রীর অভিভাবকের মোবাইল নম্বর:</div>
                <div className="text-xs">
                  <div>
                    কমপক্ষে ২ টি সচল নম্বর প্রদান করতে হবে। কেউ আপনার বায়োডাটার
                    যোগাযোগ তথ্য কিনলে তাদেরকে এই তথ্য প্রদান করা হবে।
                  </div>
                </div>
              </div>
              <Button
                type="button"
                className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F] flex items-center space-x-2"
                onClick={handleAppend}
              >
                <Plus size={20} /> <span>নতুন নম্বর যোগ করুন</span>
              </Button>
            </FormLabel>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div className="flex space-x-2 items-center" key={field.id}>
                  <FormField
                    control={form.control}
                    name={`guardianContacts.${index}.relation`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                            placeholder="সম্পর্ক (যেমন: বাবা, মা)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`guardianContacts.${index}.fullName`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                            placeholder="অভিভাবকের নাম"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`guardianContacts.${index}.phoneNumber`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                            placeholder="অভিভাবকের মোবাইল নম্বর"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 2 && (
                    <Button
                      type="button"
                      className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F] p-2"
                      onClick={() => handleRemove(index)}
                    >
                      <Minus size={20} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {form.formState.errors.guardianContacts && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.guardianContacts.message}
              </p>
            )}
          </div>
        </form>
      </Form>

      <div className="max-w-4xl w-full space-x-2 flex justify-center">
        <Button
          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]"
          onClick={() => setCurrentStep(currentStep.prev)}
          disabled={!currentStep.prev}
        >
          Previous
        </Button>
        <Button
          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]"
          onClick={handleNextClick}
          disabled={!form.formState.isValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
