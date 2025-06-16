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
import { debounce } from "lodash";
import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
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

  // Set robust default values
  const form = useForm<PrimaryInfoFormData>({
    resolver: zodResolver(primaryInfoFormData),
    defaultValues: {
      biodataType:
        biodataFormData?.primaryInfoFormData?.biodataType || biodataTypes[0].id, // Default to first biodataType
      biodataFor: biodataFormData?.primaryInfoFormData?.biodataFor || "self",
      fullName: biodataFormData?.primaryInfoFormData?.fullName || "",
      fatherName: biodataFormData?.primaryInfoFormData?.fatherName || "",
      motherName: biodataFormData?.primaryInfoFormData?.motherName || "",
      email: biodataFormData?.primaryInfoFormData?.email || "",
      phoneNumber: biodataFormData?.primaryInfoFormData?.phoneNumber || "",
      guardianContacts:
        Array.isArray(biodataFormData?.primaryInfoFormData?.guardianContacts) &&
        biodataFormData.primaryInfoFormData.guardianContacts.length >= 2
          ? biodataFormData.primaryInfoFormData.guardianContacts.map(
              (contact) => ({
                relation: contact.relation || "",
                fullName: contact.fullName || "",
                phoneNumber: contact.phoneNumber || "",
              })
            )
          : defaultGuardianContacts,
    },
  });

  // Memoize guardianContacts
  const guardianContacts = useMemo(() => {
    return Array.isArray(
      biodataFormData?.primaryInfoFormData?.guardianContacts
    ) && biodataFormData.primaryInfoFormData.guardianContacts.length >= 2
      ? biodataFormData.primaryInfoFormData.guardianContacts.map((contact) => ({
          relation: contact.relation || "",
          fullName: contact.fullName || "",
          phoneNumber: contact.phoneNumber || "",
        }))
      : defaultGuardianContacts;
  }, [biodataFormData?.primaryInfoFormData?.guardianContacts]);

  // Prevent form reset from overwriting user input
  useEffect(() => {
    const currentFormValues = form.getValues();
    // Only reset if biodataFormData has meaningful changes
    if (
      JSON.stringify(currentFormValues) !==
      JSON.stringify(biodataFormData?.primaryInfoFormData)
    ) {
      form.reset(
        {
          biodataType:
            biodataFormData?.primaryInfoFormData?.biodataType ||
            biodataTypes[0].id,
          biodataFor:
            biodataFormData?.primaryInfoFormData?.biodataFor || "self",
          fullName: biodataFormData?.primaryInfoFormData?.fullName || "",
          fatherName: biodataFormData?.primaryInfoFormData?.fatherName || "",
          motherName: biodataFormData?.primaryInfoFormData?.motherName || "",
          email: biodataFormData?.primaryInfoFormData?.email || "",
          phoneNumber: biodataFormData?.primaryInfoFormData?.phoneNumber || "",
          guardianContacts,
        },
        {
          keepValues: true, // Preserve user input
          keepDirtyValues: true, // Preserve changes made by user
        }
      );
    }
  }, [biodataFormData, form, guardianContacts]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "guardianContacts",
  });

  const handleAppend = useCallback(() => {
    append({ relation: "", fullName: "", phoneNumber: "" });
  }, [append]);

  const handleRemove = useCallback(
    (index: number) => {
      if (fields.length > 2) {
        remove(index);
      } else {
        form.setError(`guardianContacts`, {
          type: "manual",
          message: "কমপক্ষে ২ জন অভিভাবকের তথ্য প্রয়োজন।",
        });
      }
    },
    [fields.length, form, remove]
  );

  // Debounced Redux sync
  const debouncedSetBiodataFormData = useCallback(
    debounce((values: PrimaryInfoFormData) => {
      setBiodataFormData(values as BiodataFormData);
    }, 300),
    [setBiodataFormData]
  );

  // Sync form data to Redux only when necessary
  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      // Only sync if the changed field is not being reset by useEffect
      if (name) {
        debouncedSetBiodataFormData(values as PrimaryInfoFormData);
      }
    });
    return () => {
      subscription.unsubscribe();
      debouncedSetBiodataFormData.cancel();
    };
  }, [form, debouncedSetBiodataFormData]);

  // Handle next button click
  const handleNextClick = useCallback(async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const values = form.getValues();
      console.log("Form values before save:", values); // Debug form values
      handleSave();
    } else {
      const firstErrorField = Object.keys(
        form.formState.errors
      )[0] as keyof PrimaryInfoFormData;
      console.log("Form errors:", form.formState.errors); // Debug errors
      form.setFocus(firstErrorField);
    }
  }, [form, handleSave]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black ">প্রাথমিক তথ্য</div>
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
                  <FormLabel className="text-md font-medium text-[#005889]">
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
                          className="text-md text-[#005889]"
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
                          className="text-md text-[#005889]"
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
                    <div className="text-md">
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
                    <div className="text-md">
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
                    <div className="text-md">
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
                    <div className="text-md">
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
                    <div className="text-md">
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
                <div className="text-md">
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
          Save & Next
        </Button>
      </div>

      <BiodataEditText />
    </div>
  );
}
