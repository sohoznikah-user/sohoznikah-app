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
import { Textarea } from "@/components/ui/textarea";
import { afterMarriageJobs, afterMarriageStudies } from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  MarriageInfoFormData,
} from "@/lib/types";
import { marriageInfoFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MarriageInfo({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const form = useForm<MarriageInfoFormData>({
    resolver: zodResolver(marriageInfoFormData),
    defaultValues: {
      // Conditional fields based on marital status
      reasonForRemarriage:
        biodataFormData?.marriageInfoFormData?.reasonForRemarriage || "",
      currentSpouseAndChildren:
        biodataFormData?.marriageInfoFormData?.currentSpouseAndChildren || "",
      previousMarriageAndDivorceDetails:
        biodataFormData?.marriageInfoFormData
          ?.previousMarriageAndDivorceDetails || "",
      spouseDeathDetails:
        biodataFormData?.marriageInfoFormData?.spouseDeathDetails || "",
      childrenDetails:
        biodataFormData?.marriageInfoFormData?.childrenDetails || "",
      // Existing fields
      guardianApproval:
        biodataFormData?.marriageInfoFormData?.guardianApproval || "",
      continueStudy: biodataFormData?.marriageInfoFormData?.continueStudy || "",
      continueStudyDetails:
        biodataFormData?.marriageInfoFormData?.continueStudyDetails || "",
      careerPlan: biodataFormData?.marriageInfoFormData?.careerPlan || "",
      careerPlanDetails:
        biodataFormData?.marriageInfoFormData?.careerPlanDetails || "",
      residence: biodataFormData?.marriageInfoFormData?.residence || "",
      arrangeHijab: biodataFormData?.marriageInfoFormData?.arrangeHijab || "",
      dowryExpectation:
        biodataFormData?.marriageInfoFormData?.dowryExpectation || "",
      allowShowingPhotoOnline:
        biodataFormData?.marriageInfoFormData?.allowShowingPhotoOnline || "",
      additionalMarriageInfo:
        biodataFormData?.marriageInfoFormData?.additionalMarriageInfo || "",
    },
  });

  const afterMarriageStudyOptions = afterMarriageStudies.filter(
    (x) =>
      x.for === biodataFormData?.primaryInfoFormData?.biodataType ||
      x.for === "both"
  );
  const afterMarriageJobOptions = afterMarriageJobs.filter(
    (x) =>
      x.for === biodataFormData?.primaryInfoFormData?.biodataType ||
      x.for === "both"
  );

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.marriageInfoFormData;
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
        Object.keys(form.formState.errors)[0] as keyof MarriageInfoFormData
      );
    }
  };

  const yesNoOptions = [
    { id: "yes", title: "হ্যাঁ - বিস্তারিত লিখতে চাইলে লিখুন" },
    { id: "no", title: "না - বিস্তারিত লিখতে চাইলে লিখুন" },
  ];

  const biodataType = biodataFormData?.primaryInfoFormData?.biodataType;
  const maritalStatus = biodataFormData?.generalInfoFormData?.maritalStatus;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">বিয়ে সংক্রান্ত তথ্য</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          {/* Conditional Questions for Marital Status */}
          {biodataType === "GROOM" && maritalStatus === "married" && (
            <>
              <FormField
                control={form.control}
                name="reasonForRemarriage"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        বিবাহিত অবস্থায় আবার বিবাহে অগ্রসর হওয়ার কারণ:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="বিবাহিত অবস্থায় আবার বিবাহে অগ্রসর হওয়ার কারণ লিখুন"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSpouseAndChildren"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        বর্তমানে আপনার স্ত্রী এবং সন্তান সংখ্যা কত?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: ১ স্ত্রী, ২ সন্তান"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {maritalStatus === "divorced" && (
            <>
              <FormField
                control={form.control}
                name="previousMarriageAndDivorceDetails"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        পূর্বের বিবাহ এবং ডিভোর্সের তারিখ উল্লেখ করুন এবং
                        ডিভোর্সের কারণ লিখুন।
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: বিবাহ - জানুয়ারি ২০২০, ডিভোর্স - মার্চ ২০২৩, কারণ - ..."
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childrenDetails"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        বর্তমানে আপনার সন্তান সংখ্যা কত এবং কার কাছে থাকে?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: ২ সন্তান, আমার কাছে থাকে"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {biodataType === "GROOM" && maritalStatus === "widowed_male" && (
            <>
              <FormField
                control={form.control}
                name="spouseDeathDetails"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        স্ত্রী কবে, কিভাবে মারা গিয়েছিলেন এবং বিবাহিত জীবনের
                        সময়কাল কত ছিল?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: মারা গিয়েছিলেন - জানুয়ারি ২০২৩, কারণ - অসুস্থতা, বিবাহিত জীবন - ৫ বছর"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childrenDetails"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        বর্তমানে আপনার সন্তান সংখ্যা কত এবং কার কাছে থাকে?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: ২ সন্তান, আমার কাছে থাকে"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {biodataType === "BRIDE" && maritalStatus === "widowed_female" && (
            <>
              <FormField
                control={form.control}
                name="spouseDeathDetails"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        স্বামী কবে, কিভাবে মারা গিয়েছিলেন এবং বিবাহিত জীবনের
                        সময়কাল কত ছিল?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: মারা গিয়েছিলেন - জানুয়ারি ২০২৩, কারণ - অসুস্থতা, বিবাহিত জীবন - ৫ বছর"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childrenDetails"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-md space-y-1 leading-4.5">
                        বর্তমানে সন্তান সংখ্যা কত এবং কার কাছে থাকে?
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                          placeholder="যেমন: ২ সন্তান, আমার কাছে থাকে"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Existing Fields */}
          <FormField
            control={form.control}
            name="guardianApproval"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>অভিভাবক আপনার বিয়েতে রাজি আছেন?</div>
                    <div className="text-xs">
                      (যদি অভিভাবক রাজি নাও থাকে তাহলে এর কারণ লিখুন এবং
                      সেক্ষেত্রে আপনি কেন বিবাহে আগাচ্ছেন সেটা বিস্তারিত লিখুন।)
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
          <FormField
            control={form.control}
            name="continueStudy"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataType === "GROOM"
                      ? "বিয়ের পর স্ত্রীকে পড়াশোনা করতে দিতে চান?"
                      : "বিয়ের পর পড়াশোনা চালিয়ে যেতে চান? (ছাত্রী হলে)"}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="w-full flex gap-4"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {yesNoOptions.map((x) => (
                        <div key={x.id} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={x.id}
                            id={`continueStudy-${x.id}`}
                          />
                          <Label htmlFor={`continueStudy-${x.id}`}>
                            {x.title}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                {form.getValues("continueStudy") && (
                  <FormField
                    control={form.control}
                    name="continueStudyDetails"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col space-y-2 mt-4">
                          <FormLabel className="text-md space-y-1 leading-4.5">
                            বিস্তারিত:
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                              placeholder="বিস্তারিত লিখুন (যদি চান)"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="careerPlan"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataType === "GROOM"
                      ? "বিয়ের পর স্ত্রী চাইলে চাকরি বা ব্যবসা করতে দিবেন?"
                      : "আপনি কি বিয়ের পর চাকরি বা ব্যবসা করতে ইচ্ছুক?"}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="w-full flex gap-4"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {yesNoOptions.map((x) => (
                        <div key={x.id} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={x.id}
                            id={`careerPlan-${x.id}`}
                          />
                          <Label htmlFor={`careerPlan-${x.id}`}>
                            {x.title}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                {form.getValues("careerPlan") && (
                  <FormField
                    control={form.control}
                    name="careerPlanDetails"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col space-y-2 mt-4">
                          <FormLabel className="text-md space-y-1 leading-4.5">
                            বিস্তারিত:
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                              placeholder="বিস্তারিত লিখুন (যদি চান)"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residence"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataType === "GROOM"
                      ? "বিয়ের পর স্ত্রীকে নিয়ে কোথায় থাকবেন?"
                      : "যৌথ বা একক পরিবারে থাকার ব্যাপারে আপনি কোনটি পছন্দ করেন?"}
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
          {biodataType === "GROOM" && (
            <FormField
              control={form.control}
              name="arrangeHijab"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel className="text-md space-y-1 leading-4.5">
                      বাড়িতে বা বাহিরে স্ত্রী পর্দা করতে চাইলে পর্দার ব্যবস্থা
                      রাখতে পারবেন?
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
          )}
          <FormField
            control={form.control}
            name="dowryExpectation"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    {biodataType === "GROOM"
                      ? "বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক / উপহার / অর্থ আশা করবেন কিনা?"
                      : "বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রপক্ষকে যৌতুক / উপহার / অর্থ দিতে ইচ্ছুক?"}
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
          {biodataType === "GROOM" && (
            <FormField
              control={form.control}
              name="allowShowingPhotoOnline"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel className="text-md space-y-1 leading-4.5">
                      পাত্রীপক্ষ অনলাইনে আপনার ছবি দেখতে চাইলে দেখাতে রাজি আছেন?
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
          )}
          <FormField
            control={form.control}
            name="additionalMarriageInfo"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>
                      বিয়ে সংক্রান্ত আরো কিছু জানাতে চাইলে এখানে লিখুন: অন্যথায়
                      খালি রাখুন।
                    </div>
                    <div className="text-xs">
                      (যেমন: পাত্র-পাত্রী সাক্ষাতের ব্যাপারে, অভিভাবকদের মতামত
                      নিয়ে, কেমন বিয়ে চান, বিয়ের পর কোন কোন বিষয় ছাড় দিতে রাজি
                      নন ইত্যাদি কিছু জানানোর থাকলে লিখুন।)
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
    </div>
  );
}
