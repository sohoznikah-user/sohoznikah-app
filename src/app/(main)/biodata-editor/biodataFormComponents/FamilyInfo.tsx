import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { familyBackgrounds, familyTypes, siblingTypes } from "@/lib/consts";
import { BiodataFormDataProps, FamilyInfoFormData } from "@/lib/types";
import { familyInfoFormData } from "@/lib/validations";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Minus, Plus } from "lucide-react";

export default function FamilyInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

  const form = useForm<FamilyInfoFormData>({
    resolver: zodResolver(familyInfoFormData),
    defaultValues: {
      parentsAlive: biodataFormData?.familyInfoFormData?.parentsAlive || "",
      fatherOccupation:
        biodataFormData?.familyInfoFormData?.fatherOccupation || "",
      motherOccupation:
        biodataFormData?.familyInfoFormData?.motherOccupation || "",
      siblings: biodataFormData?.familyInfoFormData?.siblings || [],
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

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      if (submittedOnce) {
        await form.trigger();
      }
      setBiodataFormData({
        ...biodataFormData,
        familyInfoFormData: { ...values },
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

          {fields.map((field, index) => (
            <div
              className="flex flex-col space-y-4 items-center rounded-2xl p-4 border border-[#E25A6F]"
              key={field.id}
            >
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

              <FormField
                control={form.control}
                name={`siblings.${index}.occupation`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      পেশা:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="পেশা"
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

              <FormField
                control={form.control}
                name={`siblings.${index}.children`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md space-y-2 leading-4.5">
                      সন্তান সংখ্যা:
                    </FormLabel>
                    <div className="flex flex-col space-y-2">
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="সন্তান সংখ্যা"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          ))}
          {/* Add New Address */}
          <Button
            type="button"
            className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F] flex items-center space-x-2"
            onClick={() =>
              append({
                type: "",
                occupation: "",
                maritalStatus: "",
                children: "",
              })
            }
          >
            <Plus size={20} /> <span>নতুন ভাই/বোন যোগ করুন</span>
          </Button>
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
          Next
        </Button>
      </div>
    </div>
  );
}
