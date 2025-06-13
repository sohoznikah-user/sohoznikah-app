// File: src/app/(main)/biodata-editor/biodataFormComponents/ProfilePic.tsx

"use client";

import female1 from "@/assets/images/female-1.svg";
import female2 from "@/assets/images/female-2.svg";
import female3 from "@/assets/images/female-3.svg";
import female4 from "@/assets/images/female-4.svg";
import female5 from "@/assets/images/female-5.svg";
import female6 from "@/assets/images/female-6.svg";
import male1 from "@/assets/images/male-1.svg";
import male2 from "@/assets/images/male-2.svg";
import male3 from "@/assets/images/male-3.svg";
import male4 from "@/assets/images/male-4.svg";
import male5 from "@/assets/images/male-5.svg";
import male6 from "@/assets/images/male-6.svg";
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
import {
  BiodataFormData,
  BiodataFormDataProps,
  ProfilePicFormData,
} from "@/lib/types";
import { profilePicFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ProfilePic({
  biodataFormData,
  setBiodataFormData,
  handleSave,
  currentStep,
  setCurrentStep,
}: BiodataFormDataProps) {
  const form = useForm<ProfilePicFormData>({
    resolver: zodResolver(profilePicFormData),
    defaultValues: {
      photoId: biodataFormData?.profilePicFormData?.photoId || "",
    },
  });

  const images =
    biodataFormData?.primaryInfoFormData?.biodataType === "GROOM"
      ? [male1, male2, male3, male4, male5, male6]
      : [female1, female2, female3, female4, female5, female6];

  // Sync form data to Redux in real-time
  useEffect(() => {
    const subscription = form.watch((values) => {
      const currentValues = biodataFormData?.profilePicFormData;
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
        Object.keys(form.formState.errors)[0] as keyof ProfilePicFormData
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-10">
      <div className="text-3xl text-center text-black">প্রোফাইল পিকচার</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="photoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-center mb-5">
                  আপনার সাথে মানানসই বা সামঞ্জস্যপূর্ণ একটি প্রোফাইল পিকচার
                  বাছাই করুন:
                </FormLabel>
                <FormControl>
                  <div className="flex flex-wrap">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="md:w-1/3 w-full mb-4 flex items-center justify-center relative"
                      >
                        <div
                          className={`border p-12 rounded-3xl cursor-pointer transition-all relative ${
                            form.getValues().photoId === image.src
                              ? "border-[#E25A6F] ring-2 ring-[#E25A6F]"
                              : "border-gray-300"
                          } `}
                          onClick={() => {
                            field.onChange(image.src);
                          }}
                        >
                          <Image
                            src={image}
                            alt={`Profile${index + 1}`}
                            width={120}
                            height={40}
                            priority
                          />
                          {form.getValues().photoId === image.src && (
                            <CheckCircle className="absolute top-4 right-4 text-[#E25A6F]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </FormControl>
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
