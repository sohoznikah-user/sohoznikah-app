import { boolean, z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const requiredString = z.string().trim();

export const firstWordForm = z.object({
  preApprovalAcceptTerms: z.boolean().refine((val) => val === true, {
    message: "আপনাকে শর্তসমূহ মেনে নিতে হবে।",
  }),
  preApprovalOathTruthfulInfo: z.boolean().refine((val) => val === true, {
    message: "আপনাকে সত্য তথ্য প্রদান করার শপথ করতে হবে।",
  }),
  preApprovalOathLegalResponsibility: z
    .boolean()
    .refine((val) => val === true, {
      message: "আপনাকে সকল আইনী ও পরকালীন দায়ভার স্বীকার করতে হবে।",
    }),
});

export const primaryInfoForm = z.object({
  biodataType: requiredString.min(1, {
    message: "বায়োডাটা ধরন নির্বাচন করা আবশ্যক।",
  }),
  biodataFor: requiredString.min(1, {
    message: "বায়োডাটা কার জন্য তৈরি করা হচ্ছে তা নির্বাচন করুন।",
  }),
  fullName: requiredString.min(1, {
    message: "পূর্ণ নাম অবশ্যই প্রদান করতে হবে।",
  }),
  fatherName: requiredString.min(1, {
    message: "পিতার নাম অবশ্যই প্রদান করতে হবে।",
  }),
  motherName: requiredString.min(1, {
    message: "মাতার ধরন নির্বাচন করা আবশ্যক।",
  }),
  email: requiredString.min(1, {
    message: "ইমেইল প্রদান করা আবশ্যক।",
  }),
  mobile: requiredString.min(1, {
    message: "মোবাইল নম্বর প্রদান করা আবশ্যক।",
  }),
  guardianMobile: requiredString.min(1, {
    message: "অভিভাবকের মোবাইল নম্বর প্রদান করা আবশ্যক।",
  }),
});

export const biodataForm = z.object({
  ...firstWordForm.shape,
  ...primaryInfoForm.shape,
});
