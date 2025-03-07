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
  guardianContact: z
    .array(
      z.object({
        guardianRelation: requiredString.min(1, {
          message: "অভিভাবকের সম্পর্ক প্রদান করা আবশ্যক।",
        }),
        guardianName: requiredString.min(1, {
          message: "অভিভাবকের নাম নম্বর প্রদান করা আবশ্যক।",
        }),
        guardianMobile: requiredString.min(1, {
          message: "অভিভাবকের মোবাইল নম্বর প্রদান করা আবশ্যক।",
        }),
      })
    )
    .min(2, { message: "কমপক্ষে ২ জন অভিভাবকের তথ্য প্রয়োজন।" }),
});

export const generalInfoForm = z.object({
  dateOfBirth: requiredString.min(1, {
    message: "জন্ম তারিখ প্রদান করা আবশ্যক।",
  }),
  maritalStatus: requiredString.min(1, {
    message: "বৈবাহিক অবস্থা নির্বাচন করা আবশ্যক।",
  }),
  skinTone: requiredString.min(1, {
    message: "গায়ের রং প্রদান করা আবশ্যক।",
  }),
  height: requiredString.min(1, {
    message: "উচ্চতা প্রদান করা আবশ্যক।",
  }),
  weight: requiredString.min(1, {
    message: "ওজন প্রদান করা আবশ্যক।",
  }),
  bloodGroup: requiredString.min(1, {
    message: "রক্তের গ্রুপ নির্বাচন করা আবশ্যক।",
  }),
  nationality: requiredString.min(1, {
    message: "জাতীয়তা প্রদান করা আবশ্যক।",
  }),
});

export const addressInfoForm = z.object({
  addressList: z
    .array(
      z
        .object({
          addressType: requiredString.min(1, {
            message: "ঠিকানার ধরন প্রদান করা আবশ্যক।",
          }),
          state: requiredString.min(1, {
            // বিভাগ
            message: "নির্বাচন করা আবশ্যক।",
          }),
          city: requiredString.min(1, {
            // জেলা
            message: "নির্বাচন করা আবশ্যক।",
          }),
          addressDetail: requiredString.min(1, {
            message: "ঠিকানার বিস্তারিত প্রদান করা আবশ্যক।",
          }),

          // বাংলাদেশি ঠিকানা
          subDistrict: optionalString,

          // বিদেশি ঠিকানা
          country: optionalString,
          cityzenshipStatus: optionalString,
        })
        .superRefine((data, ctx) => {
          if (data.addressType === "foregin" && !data.country) {
            if (!data.country) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "দেশের নাম প্রদান করা আবশ্যক।",
                path: ["country"],
              });
            }
            if (!data.cityzenshipStatus) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "নাগরিকত্বের অবস্থা প্রদান করা আবশ্যক।",
                path: ["cityzenshipStatus"],
              });
            }
          }

          if (data.addressType === "local" && !data.subDistrict) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "উপজেলা নির্বাচন করা আবশ্যক।",
              path: ["subDistrict"],
            });
          }
        })
    )
    .min(2, { message: "কমপক্ষে দুইটি তথ্য প্রদান করতে হবে।" }),
});

export const biodataForm = z.object({
  ...firstWordForm.shape,
  ...primaryInfoForm.shape,
  ...generalInfoForm.shape,
  ...addressInfoForm.shape,
});
