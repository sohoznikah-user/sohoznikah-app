import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { biodataTypes } from "@/lib/consts";
import { BiodataFormProps, PrimaryInfoForm } from "@/lib/types";
import { primaryInfoForm } from "@/lib/validations";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { steps } from "../steps";

export default function PrimaryInfo({
  biodataForm,
  setBiodataForm,
  setCurrentStep,
}: BiodataFormProps) {
  const form = useForm<PrimaryInfoForm>({
    resolver: zodResolver(primaryInfoForm),
    defaultValues: {
      biodataType: "",
      biodataFor: "",
      fullName: "",
      fatherName: "",
      motherName: "",
      email: "",
      mobile: "",
      guardianMobile: "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setBiodataForm({ ...biodataForm, ...values });
    });
    return unsubscribe;
  }, [form, biodataForm, setBiodataForm]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">প্রাথমিক তথ্য</div>
      <Form {...form}>
        <form className="max-w-4xl w-full text-[#005889] flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="biodataType"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    বায়োডাটার ধরন:
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                        <SelectValue placeholder="বায়োডাটার ধরন" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                        {biodataTypes.map((x) => (
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
            name="biodataFor"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>বায়োডাটা কার জন্য তৈরী করছেন?</div>
                    <div className="text-xs">
                      (যেমনঃ নিজের জন্য/বোনের জন্য/বন্ধুর জন্য/ভাগ্নির জন্য
                      ইত্যাদি)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="নিজের জন্য"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পাত্র/পাত্রীর সম্পূর্ণ নাম:</div>
                    <div className="text-xs">
                      (NID কার্ডে যে নাম আছে। নাম বায়োডাটায় প্রকাশ করা হবে না।
                      শুধুমাত্র ভেরিফিকেশন ও অপরপক্ষকে যোগাযোগ তথ্য প্রদানের
                      ক্ষেত্রে প্রয়োজন হবে।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="সম্পূর্ণ নাম"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পিতার নাম:</div>
                    <div className="text-xs">
                      (পূর্ণ নাম লিখবেন। বায়োডাটায় প্রকাশ করা হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="পিতার নাম"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>মাতার নাম:</div>
                    <div className="text-xs">
                      (পূর্ণ নাম লিখবেন। বায়োডাটায় প্রকাশ করা হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মাতার নাম"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>ইমেইল আইডি:</div>
                    <div className="text-xs">
                      (পাত্র/পাত্রীর সাথে আমাদের যোগাযোগের জন্য প্রয়োজন হবে।
                      অপরপক্ষ যোগাযোগ তথ্য নিতে চাইলে যুক্তিসঙ্গত কারণ বা
                      প্রয়োজন ছাড়া পাঠানো হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="ইমেইল আইডি"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পাত্র/পাত্রীর মোবাইল নম্বর:</div>
                    <div className="text-xs">
                      (মোবাইল নম্বর শুধুমাত্র ভেরিফিকেশনের জন্য আমাদের কাছে
                      থাকবে। কাউকে প্রদান করা হবে না।)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="মোবাইল নম্বর"
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guardianMobile"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-md space-y-1 leading-4.5">
                    <div>পাত্র/পাত্রীর অভিভাবকের মোবাইল নম্বর:</div>
                    <div className="text-xs">
                      <div>কমপক্ষে ২ টি সচল নম্বর দিন। এভাবে লিখুন:</div>
                      <div>বাবা - ০১২৩৪৫৭৮৯১০</div>
                      <div>বড়ভাই - ০১২৩৪৫৭৮৯১০</div>
                      <div>
                        [আপনার বায়োডাটা কেউ পছন্দ করলে এবং যোগাযোগ করতে চাইলে
                        শুধুমাত্র এই অভিভাবকের যোগাযোগ তথ্য প্রদান করা হবে।]
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
                      placeholder="অভিভাবকের মোবাইল নম্বর"
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
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Previous
        </Button>
        <Button
          className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]"
          onClick={() => setCurrentStep(steps[2].key)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
