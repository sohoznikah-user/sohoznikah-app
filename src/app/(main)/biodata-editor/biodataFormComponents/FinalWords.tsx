import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BiodataFormDataProps, FinalWordsFormData } from "@/lib/types";
import { finalWordsFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function FinalWords({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

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
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      if (submittedOnce) {
        await form.trigger();
      }
      setBiodataFormData({
        ...biodataFormData,
        finalWordsFormData: { ...values },
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
          </div>
        </form>
      </Form>

      <div className="max-w-4xl w-ful">
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Submit and Send For Approval
        </Button>
      </div>
    </div>
  );
}
