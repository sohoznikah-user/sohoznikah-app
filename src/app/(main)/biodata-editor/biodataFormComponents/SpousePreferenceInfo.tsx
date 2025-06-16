// File: src/app/(main)/biodata-editor/biodataFormComponents/SpousePreferenceInfo.tsx
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  heights,
  maritalStatuses,
  occupationsList,
  religiousEducation,
  religiousLifestyle,
  secondMarriageOptions,
  skinTones,
  spouseLocationOptions,
  spouseSpecialCatagories,
} from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  SpousePreferenceInfoFormData,
} from "@/lib/types";
import { spousePreferenceInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SpousePreferenceInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const form = useForm<SpousePreferenceInfoFormData>({
    resolver: zodResolver(spousePreferenceInfoFormData),
    defaultValues: {
      age: biodataFormData?.spousePreferenceInfoFormData?.age || "",
      skinTone: biodataFormData?.spousePreferenceInfoFormData?.skinTone || [],
      height: biodataFormData?.spousePreferenceInfoFormData?.height || "",
      educationalQualification:
        biodataFormData?.spousePreferenceInfoFormData
          ?.educationalQualification || "",
      religiousEducationalQualification:
        biodataFormData?.spousePreferenceInfoFormData
          ?.religiousEducationalQualification || [],
      address: biodataFormData?.spousePreferenceInfoFormData?.address || "",
      maritalStatus:
        biodataFormData?.spousePreferenceInfoFormData?.maritalStatus || [],
      specialCategory:
        biodataFormData?.spousePreferenceInfoFormData?.specialCategory || [],
      religiousType:
        biodataFormData?.spousePreferenceInfoFormData?.religiousType || [],
      occupation:
        biodataFormData?.spousePreferenceInfoFormData?.occupation || [],
      familyBackground:
        biodataFormData?.spousePreferenceInfoFormData?.familyBackground || [],
      secondMarriage:
        biodataFormData?.spousePreferenceInfoFormData?.secondMarriage || "",
      location: biodataFormData?.spousePreferenceInfoFormData?.location || "",
      qualities: biodataFormData?.spousePreferenceInfoFormData?.qualities || "",
    },
  });

  const spouseSpecialCatagoryOptions = spouseSpecialCatagories.filter(
    (x) =>
      x.for === biodataFormData?.primaryInfoFormData?.biodataType ||
      x.for === "both"
  );

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.spousePreferenceInfoFormData;
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
        Object.keys(
          form.formState.errors
        )[0] as keyof SpousePreferenceInfoFormData
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">
        যেমন জীবনসঙ্গী আশা করেন
      </div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    কাঙ্খিত বয়স:
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
            name="skinTone"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    কাঙ্খিত গাত্রবর্ণ:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {skinTones.map((x) => (
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
            name="height"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    উচ্চতা:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
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
            name="educationalQualification"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    শিক্ষাগত যোগ্যতা:
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
            name="religiousEducationalQualification"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    দ্বীনি শিক্ষাগত যোগ্যতা:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {religiousEducation.map((x) => (
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    ঠিকানা:
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
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    বৈবাহিক অবস্থা:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {maritalStatuses.map((x) => (
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
            name="specialCategory"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    আপনি কোন কোন বিশেষ ক্যাটাগরিতে আগ্রহী?
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {spouseSpecialCatagoryOptions.map((x) => (
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
            name="religiousType"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    ধর্মীয় লাইফস্টাইল:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {religiousLifestyle.map((x) => (
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
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    পেশা:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {occupationsList.map((x) => (
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
            name="familyBackground"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    পরিবারের অর্থনৈতিক অবস্থা:
                  </FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-wrap">
                      {familyBackgrounds.map((x) => (
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
          {biodataFormData?.primaryInfoFormData?.biodataType === "GROOM" && (
            <FormField
              control={form.control}
              name="secondMarriage"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel className="text-md space-y-1 leading-4.5">
                      মাসনা বা দ্বিতীয় বিবাহে আগ্রহী এমন পাত্রের প্রতি আগ্রহী
                      আছেন?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="w-full flex flex-wrap gap-0"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {secondMarriageOptions.map((x) => (
                          <div
                            key={x.id}
                            className="w-1/4 flex items-center space-x-2 mb-2"
                          >
                            <RadioGroupItem value={x.id} id={x.id} />
                            <Label htmlFor={x.id}>{x.title}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    জীবনসঙ্গী নির্বাচনে শহর নাকি গ্রাম, কোনটিকে প্রাধান্য দিবেন?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="w-full flex flex-wrap gap-0"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {spouseLocationOptions.map((x) => (
                        <div
                          key={x.id}
                          className="w-1/4 flex items-center space-x-2 mb-2"
                        >
                          <RadioGroupItem value={x.id} id={x.id} />
                          <Label htmlFor={x.id}>{x.title}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qualities"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>জীবনসঙ্গীর যে বৈশিষ্ট্য বা গুণাবলী আশা করেন:</div>
                    <div className="text-xs">
                      (অর্থাৎ কাঙ্খিত জীবনসঙ্গীর স্বভাব, দ্বীনদারিতা, চারিত্রীক
                      গুণাবলী কেমন আশা করেন। বিশেষ কোনো কার্যক্রম বা চাওয়া থাকলে
                      জানাতে পারেন।)
                    </div>
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
