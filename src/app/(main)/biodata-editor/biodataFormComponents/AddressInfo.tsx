"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { locations, types, citizenshipOptions } from "@/lib/consts";
import { AddressInfoFormData, BiodataFormDataProps } from "@/lib/types";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressInfoFormData } from "@/lib/validations";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function AddressInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

  const form = useForm<AddressInfoFormData>({
    resolver: zodResolver(addressInfoFormData),
    defaultValues: {
      addresses: biodataFormData?.addressInfoFormData?.addresses || [
        {
          type: "",
          location: "",
          state: "",
          city: "",
          detail: "",
          country: "",
          cityzenshipStatus: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      if (submittedOnce) {
        await form.trigger();
      }
      setBiodataFormData({
        ...biodataFormData,
        addressInfoFormData: { ...values },
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

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">ঠিকানা</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          {fields.map((field, index) => (
            <div
              className="flex flex-col space-y-4 items-center rounded-2xl p-4 border border-[#E25A6F]"
              key={field.id}
            >
              <FormField
                control={form.control}
                name={`addresses.${index}.type`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      ঠিকানার ধরন:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                              <SelectValue placeholder="ঠিকানার ধরন" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                              {types.map((x) => (
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
                name={`addresses.${index}.location`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      অবস্থান ধরণ:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                              <SelectValue placeholder="অবস্থান ধরণ:" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                              {locations.map((x) => (
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
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`addresses.${index}.state`}
                render={({ field }) => {
                  const label =
                    form.getValues(`addresses.${index}.location`) === "2"
                      ? "স্টেট"
                      : "স্থায়ী জেলা";
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        {label}:
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              {...field}
                              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                              type="text"
                              placeholder={label}
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
                name={`addresses.${index}.city`}
                render={({ field }) => {
                  const label =
                    form.getValues(`addresses.${index}.location`) === "2"
                      ? "শহর"
                      : "স্থায়ী উপজেলা";
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        <div>{label}:</div>
                        <div className="text-xs">(যদি থাকে)</div>
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              {...field}
                              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                              type="text"
                              placeholder={label}
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
                name={`addresses.${index}.detail`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      ঠিকানার বিস্তারিত:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                            {...field}
                            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                            type="text"
                            placeholder="ঠিকানার বিস্তারিত"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {form.getValues(`addresses.${index}.location`) === "2" && (
                <FormField
                  control={form.control}
                  name={`addresses.${index}.country`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        দেশের নাম:
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                              id="emailMobileNumber"
                              type="text"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )}
              {form.getValues(`addresses.${index}.location`) === "2" && (
                <FormField
                  control={form.control}
                  name={`addresses.${index}.country`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        সিটিজেনশিপ আছে?
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroup className="w-full flex flex-wrap gap-0 min-h-12">
                              {citizenshipOptions.map((x) => (
                                <div
                                  key={x.id}
                                  className="w-1/3 flex items-center space-x-2"
                                >
                                  <RadioGroupItem value={x.id} id={x.id} />
                                  <Label htmlFor={x.id}>{x.title}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}

          {/* Add New Address */}
          <Button
            type="button"
            className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F] flex items-center space-x-2"
            onClick={() =>
              append({
                type: "",
                location: "",
                state: "",
                city: "",
                detail: "",
                country: "",
                cityzenshipStatus: "",
              })
            }
          >
            <Plus size={20} /> <span>নতুন ঠিকানা যোগ করুন</span>
          </Button>
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
