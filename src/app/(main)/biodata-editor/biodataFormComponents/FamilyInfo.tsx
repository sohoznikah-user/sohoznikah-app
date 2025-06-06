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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  familyBackgrounds,
  familyTypes,
  siblingSerialOptions,
  siblingTypes,
} from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  FamilyInfoFormData,
} from "@/lib/types";
import { familyInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function FamilyInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const [hasNoSiblings, setHasNoSiblings] = useState<boolean>(false);
  const [selfSiblings, setSelfSiblings] = useState<boolean>(false);

  const form = useForm<FamilyInfoFormData>({
    resolver: zodResolver(familyInfoFormData),
    defaultValues: {
      parentsAlive: biodataFormData?.familyInfoFormData?.parentsAlive || "",
      fatherOccupation:
        biodataFormData?.familyInfoFormData?.fatherOccupation || "",
      motherOccupation:
        biodataFormData?.familyInfoFormData?.motherOccupation || "",
      siblings:
        biodataFormData?.familyInfoFormData?.siblings?.length > 0
          ? biodataFormData?.familyInfoFormData?.siblings
          : [
              {
                serial: "",
                type: "",
                occupation: "",
                maritalStatus: "",
              },
            ],
      fatherSideDetail:
        biodataFormData?.familyInfoFormData?.fatherSideDetail || "",
      motherSideDetail:
        biodataFormData?.familyInfoFormData?.motherSideDetail || "",
      familyType: biodataFormData?.familyInfoFormData?.familyType || "",
      familyBackground:
        biodataFormData?.familyInfoFormData?.familyBackground || "",
      livingCondition:
        biodataFormData?.familyInfoFormData?.livingCondition || "",
      wealthDescription:
        biodataFormData?.familyInfoFormData?.wealthDescription || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "siblings",
  });

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.familyInfoFormData;
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
      console.log("valid");
      handleSave();
    } else {
      form.setFocus(
        Object.keys(form.formState.errors)[0] as keyof FamilyInfoFormData
      );
    }
  };

  useEffect(() => {
    const selfSiblings = biodataFormData?.familyInfoFormData?.siblings?.filter(
      (sibling) => sibling.type === "self"
    );
    if (selfSiblings.length > 0) {
      setSelfSiblings(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">পারিবারিক তথ্য</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="parentsAlive"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনার পিতা-মাতা উভয়েই জীবিত আছেন?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="আপনার পিতা-মাতা উভয়েই জীবিত আছেন?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherOccupation"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পিতার পেশা:</div>
                    <div className="text-xs">
                      <div>
                        -চাকরিজীবী হলে পদবি সহ কি ধরণের চাকরি তা লিখবেন।
                      </div>
                      <div>-ব্যাবসায়ী হলে কি ধরণের ব্যবসা তা লিখবেন।</div>
                      <div>-অবসরপ্রাপ্ত বা মৃত হলেও বিস্তারিত লিখবেন।</div>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="পিতার পেশা"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherOccupation"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>মাতার পেশা:</div>
                    <div className="text-xs">
                      <div>
                        -চাকরিজীবী হলে পদবি সহ কি ধরণের চাকরি তা লিখবেন।
                      </div>
                      <div>-ব্যাবসায়ী হলে কি ধরণের ব্যবসা তা লিখবেন।</div>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মাতার পেশা"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-4">
            <div className="text-[#E25A6F]">
              আপনার ভাই-বোনের তথ্য নিচে প্লাস বাটন চাপ দিয়ে যুক্ত করুন এবং বড়
              থেকে ছোট অনুসারে সাজিয়ে লিখুন
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="noSiblings"
                checked={hasNoSiblings}
                onCheckedChange={(checked) => {
                  setHasNoSiblings(checked as boolean);
                  if (checked) {
                    form.setValue("siblings", []);
                  } else {
                    append({
                      serial: "",
                      type: "",
                      occupation: "",
                      maritalStatus: "",
                    });
                  }
                }}
              />
              <label
                htmlFor="noSiblings"
                className="text-md text-[#005889] leading-4.5"
              >
                ভাই-বোন নেই
              </label>
            </div>
          </div>
          {!hasNoSiblings &&
            fields.map((field, index) => (
              <div
                className="flex flex-col space-y-4 items-center rounded-2xl p-4 border border-[#E25A6F]"
                key={field.id}
              >
                <FormField
                  control={form.control}
                  name={`siblings.${index}.serial`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        ভাই/বোনের সিরিয়াল:
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                                <SelectValue placeholder="ভাই/বোনের সিরিয়াল" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                                {siblingSerialOptions.map((x) => (
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
                  name={`siblings.${index}.type`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md space-y-2 leading-4.5">
                        ভাই/বোন:
                      </FormLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                                <SelectValue placeholder="ভাই/বোন" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                                {siblingTypes.map((x) => (
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

                {form.watch(`siblings.${index}.type`) !== "self" && (
                  <>
                    <FormField
                      control={form.control}
                      name={`siblings.${index}.occupation`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            className={`text-md space-y-2 leading-4.5`}
                          >
                            শিক্ষা ও পেশা:
                          </FormLabel>
                          <div className="flex flex-col space-y-2">
                            <FormControl>
                              <Input
                                {...field}
                                className={`p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white`}
                                placeholder="শিক্ষা ও পেশা"
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`siblings.${index}.maritalStatus`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-md space-y-2 leading-4.5">
                            বৈবাহিক অবস্থা:
                          </FormLabel>
                          <div className="flex flex-col space-y-2">
                            <FormControl>
                              <Input
                                {...field}
                                className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                                placeholder="বৈবাহিক অবস্থা"
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            ))}
          {!hasNoSiblings && (
            <Button
              type="button"
              className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F] flex items-center space-x-2"
              onClick={() =>
                append({
                  serial: "",
                  type: "",
                  occupation: "",
                  maritalStatus: "",
                })
              }
            >
              <Plus size={20} /> <span>ভাই/বোন যুক্ত করুন</span>
            </Button>
          )}
          <FormField
            control={form.control}
            name="fatherSideDetail"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    চাচা কতজন এবং কি করেন?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="চাচা কতজন এবং কি করেন?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherSideDetail"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    মামা কতজন এবং কি করেন?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মামা কতজন এবং কি করেন?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="familyType"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    পরিবারের ধরণ:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="পরিবারের ধরণ" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {familyTypes.map((x) => (
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
            name="familyBackground"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    পরিবারের অর্থনৈতিক অবস্থা:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="পরিবারের অর্থনৈতিক অবস্থা" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {familyBackgrounds.map((x) => (
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
            name="livingCondition"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনি সহ আপনার পরিবারের নিজস্ব বাড়িতে থাকা হয় নাকি ভাড়া
                    বাড়িতে?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="আপনি সহ আপনার পরিবারের নিজস্ব বাড়িতে থাকা হয় নাকি ভাড়া বাড়িতে?"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wealthDescription"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনাদের বাড়ি-ঘরের বা সম্পত্তির হাল্কা বিবরন দিন:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="আপনাদের বাড়ি-ঘরের বা সম্পত্তির হাল্কা বিবরন দিন"
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
    </div>
  );
}
