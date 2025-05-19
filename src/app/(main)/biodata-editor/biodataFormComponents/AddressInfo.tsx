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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { citizenshipOptions, locations, types } from "@/lib/consts";
import {
  AddressInfoFormData,
  BiodataFormData,
  BiodataFormDataProps,
} from "@/lib/types";
import { addressInfoFormData } from "@/lib/validations";
import { districtsAndUpazilas } from "@/utils/districtsAndUpazilas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function AddressInfo({
  biodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
  setBiodataFormData,
}: BiodataFormDataProps) {
  const form = useForm<AddressInfoFormData>({
    resolver: zodResolver(addressInfoFormData),
    defaultValues: {
      addresses:
        biodataFormData?.addressInfoFormData?.addresses?.length > 0
          ? biodataFormData.addressInfoFormData.addresses
          : [
              {
                type: "",
                location: "",
                state: "",
                city: "",
                detail: "",
                country: "",
                cityzenshipStatus: "",
                permanentHomeAddress: "",
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  // Reset form when biodataFormData changes
  useEffect(() => {
    const addresses = biodataFormData?.addressInfoFormData?.addresses || [
      {
        type: "",
        location: "",
        state: "",
        city: "",
        detail: "",
        country: "",
        cityzenshipStatus: "",
        permanentHomeAddress: "",
      },
    ];

    form.reset({ addresses });
  }, [biodataFormData?.addressInfoFormData?.addresses, form]);

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.addressInfoFormData;
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
        Object.keys(form.formState.errors)[0] as keyof AddressInfoFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">ঠিকানা</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <h4 className="text-md">
            আপনার স্থায়ী ঠিকানা এবং বর্তমান ঠিকানা প্লাস বাটনে চাপ দিয়ে যুক্ত
            করুন একাধিক ঠিকানা থাকলেও যুক্ত করতে পারেন
          </h4>
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

              {form.getValues(`addresses.${index}.location`) === "foreign" && (
                <>
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
                                {...field}
                                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                                type="text"
                                placeholder="দেশের নাম"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name={`addresses.${index}.state`}
                render={({ field }) => {
                  const location = form.getValues(
                    `addresses.${index}.location`
                  );
                  const label =
                    location === "foreign" ? "স্টেট" : "স্থায়ী জেলা";

                  return (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        <div>{label}:</div>
                        <div className="text-xs">(যদি থাকে)</div>
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            {location === "foreign" ? (
                              <Input
                                {...field}
                                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                                type="text"
                                placeholder={label}
                              />
                            ) : (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                                  <SelectValue placeholder="জেলা নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.keys(districtsAndUpazilas).map(
                                    (district) => (
                                      <SelectItem
                                        key={
                                          districtsAndUpazilas[district].value
                                        }
                                        value={
                                          districtsAndUpazilas[district].value
                                        }
                                      >
                                        {district}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            )}
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
                  const location = form.getValues(
                    `addresses.${index}.location`
                  );
                  const selectedDistrict = form.getValues(
                    `addresses.${index}.state`
                  );
                  const label =
                    location === "foreign" ? "শহর" : "স্থায়ী উপজেলা";

                  const upazilas =
                    (selectedDistrict &&
                      Object.values(districtsAndUpazilas).find(
                        (district) => district.value === selectedDistrict
                      )?.upazilas) ||
                    [];

                  return (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        <div>{label}:</div>
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            {location === "foreign" ? (
                              <Input
                                {...field}
                                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                                type="text"
                                placeholder={label}
                              />
                            ) : (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!selectedDistrict}
                              >
                                <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                                  <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                  {upazilas.map((upazila) => (
                                    <SelectItem
                                      key={upazila.value}
                                      value={upazila.value}
                                    >
                                      {upazila.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </FormControl>
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  );
                }}
              />

              {form.getValues(`addresses.${index}.location`) ===
                "bangladesh" && (
                <>
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.permanentHomeAddress`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-md space-y-2 leading-4.5">
                          <div>স্থায়ী বাড়ির ঠিকানা:</div>
                          <div className="text-xs">
                            যেমন: (মিরপুর ১১/ আজমপুর,উত্তরা) অথবা (ইউনিয়ন/থানা)।
                            বাসা নম্বর বা গ্রামের নাম লিখবেন না।
                          </div>
                        </FormLabel>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Input
                                {...field}
                                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                                type="text"
                                placeholder="যেমন: (মিরপুর ১১/ আজমপুর,উত্তরা)
                          অথবা (ইউনিয়ন/থানা)"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {form.getValues(`addresses.${index}.location`) === "foreign" && (
                <>
                  <FormField
                    control={form.control}
                    name={`addresses.${index}.cityzenshipStatus`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-md space-y-2 leading-4.5">
                          সিটিজেনশিপ আছে?
                        </FormLabel>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroup
                                className="w-full flex flex-wrap gap-0 min-h-12"
                                onValueChange={field.onChange}
                                value={field.value}
                              >
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
                </>
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

          <FormField
            control={form.control}
            name={`addresses.${0}.detail`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md space-y-2 leading-4.5">
                  <div>কোথায় বেড়ে উঠেছেন:</div>
                  <div className="text-xs">
                    (ছোটবেলা থেকে এখন পর্যন্ত কোথায় কোথায় থাকা হয়েছে তার
                    সংক্ষিপ্ত বিবরণ দিন)
                  </div>
                </FormLabel>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        {...field}
                        className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                        type="text"
                        placeholder="(ছোটবেলা থেকে এখন পর্যন্ত কোথায় কোথায় থাকা হয়েছে তার
                    সংক্ষিপ্ত বিবরণ দিন)"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </div>
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
    </div>
  );
}
