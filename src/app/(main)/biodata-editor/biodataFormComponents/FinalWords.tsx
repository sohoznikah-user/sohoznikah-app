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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { visibilityOptions } from "@/lib/consts";
import {
  BiodataFormData,
  BiodataFormDataProps,
  FinalWordsFormData,
} from "@/lib/types";
import { finalWordsFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FinalWords({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const form = useForm<FinalWordsFormData>({
    resolver: zodResolver(finalWordsFormData),
    defaultValues: {
      postApprovalOathTruthfulInfo:
        biodataFormData?.finalWordsFormData?.postApprovalOathTruthfulInfo ||
        false,
      postApprovalOathNoMisuse:
        biodataFormData?.finalWordsFormData?.postApprovalOathNoMisuse || false,
      postApprovalOathLegalResponsibility:
        biodataFormData?.finalWordsFormData
          ?.postApprovalOathLegalResponsibility || false,
      visibility: biodataFormData?.finalWordsFormData?.visibility || "",
    },
  });

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.finalWordsFormData;
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
        Object.keys(form.formState.errors)[0] as keyof FinalWordsFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-[#004972]">শেষ কথা</div>
      <Form {...form}>
        <form className="max-w-4xl w-full bg-[#f6f6f6] p-10 space-y-4 text-black rounded-4xl">
          <div className="text-[#005A8B] text-xl text-center">
            প্রতিশ্রুতি নামা
          </div>
          <div className="text-[#cd0000] space-y-3">
            <div className="flex items-center space-x-2">
              <Label htmlFor="preApprove1" className="text-[#6C0011] leading-5">
                আমি আল্লাহর নামে শপথ করছি যে,
              </Label>
            </div>
            <FormField
              control={form.control}
              name="postApprovalOathTruthfulInfo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-4.5">
                      আমি বায়োডাটায় সকল তথ্য সত্য প্রদান করেছি।
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postApprovalOathNoMisuse"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-4.5">
                      সহজনিকাহ ম্যাট্রিমনি ওয়েবসাইটের কোনো তথ্য অসৎ কাজে ব্যবহার
                      করবো না।
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postApprovalOathLegalResponsibility"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="leading-4.5">
                      কোনো মিথ্যা তথ্য প্রদান করলে বা কোনো তথ্য অসৎ কাজে ব্যবহার
                      করে থাকলে, দুনিয়াবী যেকোনো আইনী জটিলতা এবং পরকালীন সকল
                      দায়ভার আমি বহন করবো।
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="finalStatement"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel className="text-md space-y-1 leading-4.5">
                      আপনার শেষ বক্তব্য (যদি থাকে):
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                        placeholder="আপনার শেষ বক্তব্য লিখুন (যদি থাকে)"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2 mt-5">
                  <FormLabel className="text-md space-y-1 leading-4.5 text-[#005A8B]">
                    বায়োডাটা এপ্রুভ হলে আপনি পাবলিক নাকি প্রাইভেট রাখতে চান?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="w-full flex flex-col gap-4"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {visibilityOptions.map((x) => (
                        <div key={x.id} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={x.id}
                            id={`biodataVisibility-${x.id}`}
                          />
                          <Label
                            htmlFor={`biodataVisibility-${x.id}`}
                            className="leading-4.5 text-[#005A8B] flex flex-col"
                          >
                            <span className="font-semibold ">{x.title}</span>{" "}
                            <span className="text-xs text-[#cd0000]">
                              ({x.description})
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="max-w-4xl w-ful">
        <Button
          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]"
          onClick={handleNextClick}
        >
          Submit and Send For Approval
        </Button>
      </div>
    </div>
  );
}
