// File: src/app/(main)/biodata-editor/biodataFormComponents/GeneralInfo.tsx

"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bloodGroups,
  heights,
  maritalStatuses,
  nationalities,
  skinTones,
  weights,
} from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  GeneralInfoFormData,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { generalInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function GeneralInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const form = useForm<GeneralInfoFormData>({
    resolver: zodResolver(generalInfoFormData),
    defaultValues: {
      dateOfBirth: biodataFormData?.generalInfoFormData?.dateOfBirth || "",
      maritalStatus: biodataFormData?.generalInfoFormData?.maritalStatus || "",
      skinTone: biodataFormData?.generalInfoFormData?.skinTone || "",
      height: biodataFormData?.generalInfoFormData?.height || "",
      weight: biodataFormData?.generalInfoFormData?.weight || "",
      bloodGroup: biodataFormData?.generalInfoFormData?.bloodGroup || "",
      nationality:
        biodataFormData?.generalInfoFormData?.nationality || ([] as string[]),
    },
  });

  const maritalStatusOptions = maritalStatuses.filter(
    (x) =>
      x.for === biodataFormData?.primaryInfoFormData?.biodataType ||
      x.for === "both"
  );

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.generalInfoFormData;
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
        Object.keys(form.formState.errors)[0] as keyof GeneralInfoFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">সাধারণ তথ্য</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>জন্ম তারিখ:</div>
                    <div className="text-xs">(আসল, সার্টিফিকেট অনুযায়ী নয়)</div>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "p-6 w-full bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>জন্ম তারিখ</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          className="bg-[#005889]"
                          classNames={{
                            day_selected: "bg-[#E25A6F]",
                            day_today: "bg-white text-black",
                          }}
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    বৈবাহিক অবস্থা:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="বৈবাহিক অবস্থা" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {maritalStatusOptions.map((x) => (
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
            name="skinTone"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    গাত্রবর্ণ:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="গাত্রবর্ণ" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {skinTones.map((x) => (
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
            name="height"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    উচ্চতা:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="উচ্চতা" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {heights.map((x) => (
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
            name="weight"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    ওজন:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="ওজন" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {weights.map((x) => (
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
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    রক্তের গ্রুপ:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="রক্তের গ্রুপ" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {bloodGroups.map((x) => (
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
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    জাতীয়তা:
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {Array.isArray(field.value) && field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((value) => {
                            const nationality = nationalities.find(
                              (n) => n.id === value
                            );
                            return (
                              <div
                                key={value}
                                className="bg-[#E25A6F] text-white px-3 py-1 rounded-full flex items-center gap-2"
                              >
                                <span>{nationality?.title}</span>
                                <span
                                  onClick={() => {
                                    const currentValue = Array.isArray(
                                      field.value
                                    )
                                      ? field.value
                                      : [];
                                    const newValue = currentValue.filter(
                                      (v) => v !== value
                                    );
                                    field.onChange(newValue);
                                  }}
                                  className="hover:text-gray-200 cursor-pointer text-xs ml-1"
                                  role="button"
                                  tabIndex={0}
                                >
                                  ×
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <Select
                        onValueChange={(value) => {
                          const currentValue = Array.isArray(field.value)
                            ? field.value
                            : [];
                          if (!currentValue.includes(value)) {
                            field.onChange([...currentValue, value]);
                          }
                        }}
                      >
                        <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                          <SelectValue placeholder="জাতীয়তা" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                          {nationalities.map((x) => (
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
