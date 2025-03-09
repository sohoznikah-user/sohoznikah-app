import { boolean, z } from "zod";
import { maritalStatuses } from "./consts";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const requiredString = z.string().trim();

export const firstWordsFormData = z.object({
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

export const primaryInfoFormData = z.object({
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
  guardianContacts: z
    .array(
      z.object({
        relation: requiredString.min(1, {
          message: "অভিভাবকের সম্পর্ক প্রদান করা আবশ্যক।",
        }),
        name: requiredString.min(1, {
          message: "অভিভাবকের নাম নম্বর প্রদান করা আবশ্যক।",
        }),
        mobile: requiredString.min(1, {
          message: "অভিভাবকের মোবাইল নম্বর প্রদান করা আবশ্যক।",
        }),
      })
    )
    .min(2, { message: "কমপক্ষে ২ জন অভিভাবকের তথ্য প্রয়োজন।" }),
});

export const generalInfoFormData = z.object({
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

export const addressInfoFormData = z.object({
  addresses: z.array(
    z
      .object({
        type: requiredString.min(1, {
          message: "ঠিকানার ধরন প্রদান করা আবশ্যক।",
        }),
        location: requiredString.min(1, {
          message: "ঠিকানার অবস্থান প্রদান করা আবশ্যক।",
        }),
        // জেলা / স্টেট
        state: requiredString.min(1, {
          message: "নির্বাচন করা আবশ্যক।",
        }),
        // উপজেলা / শহর
        city: requiredString.min(1, {
          message: "নির্বাচন করা আবশ্যক।",
        }),
        detail: requiredString.min(1, {
          message: "ঠিকানার বিস্তারিত প্রদান করা আবশ্যক।",
        }),

        // বিদেশি ঠিকানা
        country: optionalString,
        cityzenshipStatus: optionalString,
      })
      .superRefine((data, ctx) => {
        if (data.type === "foregin" && !data.country) {
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
      })
  ),
});

export const educationInfoFormData = z.object({
  type: requiredString.min(1, {
    message: "শিক্ষার ধরন প্রদান করা আবশ্যক।",
  }),
  highestDegree: requiredString.min(1, {
    message: "সর্বোচ্চ শিক্ষাগত যোগ্যতা নির্বাচন করা আবশ্যক।",
  }),
  degrees: z.array(
    z.object({
      name: requiredString.min(1, {
        message: "ডিগ্রির নাম প্রদান করা আবশ্যক।",
      }),
      passYear: requiredString.min(1, {
        message: "পাসের বছর প্রদান করা আবশ্যক।",
      }),
      group: requiredString.min(1, {
        message: "শ্রেণী/বিভাগ নির্বাচন করা আবশ্যক।",
      }),
      institute: requiredString.min(1, {
        message: "শিক্ষাপ্রতিষ্ঠানের নাম প্রদান করা আবশ্যক।",
      }),
    })
  ),
  religiousEducation: requiredString.min(1, {
    message: "ধর্মীয় শিক্ষা নির্বাচন করা আবশ্যক।",
  }),
  detail: requiredString.min(1, {
    message: "শিক্ষার বিস্তারিত তথ্য প্রদান করা আবশ্যক।",
  }),
});

export const occupationInfoFormData = z.object({
  occupations: z.array(optionalString).min(1, {
    message: "পেশার ধরন প্রদান করা আবশ্যক।",
  }),
  detail: requiredString.min(1, {
    message: "পেশার বিস্তারিত তথ্য প্রদান করা আবশ্যক।",
  }),
  monthlyIncome: requiredString.min(1, {
    message: "মাসিক আয় প্রদান করা আবশ্যক।",
  }),
});

export const familyInfoFormData = z.object({
  fatherOccupation: requiredString.min(1, {
    message: "পিতার পেশা প্রদান করা আবশ্যক।",
  }),
  motherOccupation: requiredString.min(1, {
    message: "মাতার পেশা প্রদান করা আবশ্যক।",
  }),
  siblings: z.array(
    z.object({
      type: requiredString.min(1, {
        message: "ভাই/বোনের ধরন প্রদান করা আবশ্যক।",
      }),
      occupation: requiredString.min(1, {
        message: "ভাই/বোনের পেশা প্রদান করা আবশ্যক।",
      }),
      maritalStatus: requiredString.min(1, {
        message: "বৈবাহিক অবস্থা নির্বাচন করা আবশ্যক।",
      }),
      children: requiredString.min(1, {
        message: "সন্তান সংখ্যা প্রদান করা আবশ্যক।",
      }),
    })
  ),
  fatherSideDetail: requiredString.min(1, {
    message: "পিতার পারিবারিক বিস্তারিত তথ্য প্রদান করা আবশ্যক।",
  }),
  motherSideDetail: requiredString.min(1, {
    message: "মাতার পারিবারিক বিস্তারিত তথ্য প্রদান করা আবশ্যক।",
  }),
});

export const religiousInfoFormData = z.object({
  type: requiredString.min(1, {
    message: "পেশার ধরন প্রদান করা আবশ্যক।",
  }),
  ideology: requiredString.min(1, {
    message: "ধর্মীয় কোন মতাদর্শ মেনে চলেন তা প্রদান করা আবশ্যক।",
  }),
  madhabOrManhaj: requiredString.min(1, {
    message: "কোন মাজহাব / মানহাজ অনুসরণ করেন তা নির্বাচন করা আবশ্যক।",
  }),
  praysFiveTimes: requiredString.min(1, {
    message: "প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়া হয় কিনা তা নির্বাচন করা আবশ্যক।",
  }),
  hasQazaPrayers: requiredString.min(1, {
    message: "আপনার কি নামাজ কাযা হয় তা নির্বাচন করা আবশ্যক।",
  }),
  canReciteQuranProperly: requiredString.min(1, {
    message: "শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন কিনা তা নির্বাচন করা আবশ্যক।",
  }),
  avoidsHaramIncome: requiredString.min(1, {
    message:
      "হারাম উপার্জন বা সুদ-ঘুষ থেকে বিরত আছেন কিনা তা নির্বাচন করা আবশ্যক।",
  }),
  modestDressing: requiredString.min(1, {
    message: "আপনার পোশাকধারণ কেমন তা নির্বাচন করা আবশ্যক।",
  }),
  followsMahramRules: requiredString.min(1, {
    message: "মাহরাম/গাইরে-মাহরাম মেনে চলেন কিনা তা নির্বাচন করা আবশ্যক।",
  }),
  beliefAboutPirMurshidAndMazar: requiredString.min(1, {
    message:
      "পীর-মুরিদ ও মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস প্রদান করা আবশ্যক।",
  }),
  practicingSince: requiredString.min(1, {
    message:
      "কত সাল/সময় থেকে পরিপূর্ণভাবে দ্বীনের পথে চলা শুরু করেছেন তা প্রদান করা আবশ্যক।",
  }),
});

export const marriageInfoFormData = z.object({
  guardianApproval: requiredString.min(1, {
    message: "অভিভাবক আপনার বিয়েতে রাজি আছেন কিনা নির্বাচন করুন।",
  }),
  continueStudy: requiredString.min(1, {
    message: "বিয়ের পর আপনি পড়াশোনা চালিয়ে যেতে চান কিনা নির্বাচন করুন।",
  }),
  careerPlan: requiredString.min(1, {
    message: "বিয়ের পর আপনি চাকরি বা ব্যবসা করতে চান কিনা নির্বাচন করুন।",
  }),
  residence: requiredString.min(1, {
    message: "বিয়ের পর আপনি কোথায় থাকবেন তা উল্লেখ করুন।",
  }),
  arrangeHijab: requiredString.min(1, {
    message:
      "স্ত্রী পর্দা করতে চাইলে আপনি ব্যবস্থা রাখতে পারবেন কিনা নির্বাচন করুন।",
  }),
  dowryExpectation: requiredString.min(1, {
    message:
      "আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক বা উপহার আশা করে কিনা নির্বাচন করুন।",
  }),
  allowShowingPhotoOnline: requiredString.min(1, {
    message: "অনলাইনে আপনার ছবি দেখতে চাইলে দেখাতে রাজি কিনা নির্বাচন করুন।",
  }),
  additionalMarriageInfo: optionalString,
});

export const spousePreferenceInfoFormData = z.object({
  age: requiredString.min(1, {
    message: "বয়স প্রদান করা আবশ্যক।",
  }),
  skinTone: requiredString.min(1, {
    message: "গায়ের রং নির্বাচন করা আবশ্যক।",
  }),
  height: requiredString.min(1, {
    message: "উচ্চতা প্রদান করা আবশ্যক।",
  }),
  educationalQualification: requiredString.min(1, {
    message: "শিক্ষাগত যোগ্যতা নির্বাচন করা আবশ্যক।",
  }),
  religiousEducationalQualification: requiredString.min(1, {
    message: "ধর্মীয় শিক্ষাগত যোগ্যতা নির্বাচন করা আবশ্যক।",
  }),
  maritalStatus: requiredString.min(1, {
    message: "বৈবাহিক অবস্থা নির্বাচন করা আবশ্যক।",
  }),
  specialCategory: requiredString.min(1, {
    message: "বিশেষ ক্যাটাগরি নির্বাচন করা আবশ্যক।",
  }),
  religiousType: requiredString.min(1, {
    message: "ধর্মীয় মতাদর্শ নির্বাচন করা আবশ্যক।",
  }),
  occupation: requiredString.min(1, {
    message: "পেশা নির্বাচন করা আবশ্যক।",
  }),
  familyBackground: requiredString.min(1, {
    message: "পারিবারিক পটভূমি নির্বাচন করা আবশ্যক।",
  }),
  darkSkinTone: requiredString.min(1, {
    message: "গা dark ় ত্বক রঙের preference প্রদান করা আবশ্যক।",
  }),
  secondMarrige: requiredString.min(1, {
    message: "দ্বিতীয় বিয়ে সম্পর্কে নির্বাচন করা আবশ্যক।",
  }),
  location: requiredString.min(1, {
    message: "অবস্থান নির্বাচন করা আবশ্যক।",
  }),
  qualities: requiredString.min(1, {
    message: "জীবনসঙ্গীর বৈশিষ্ট্য বা গুণাবলী প্রদান করা আবশ্যক।",
  }),
});

export const profilePicFormData = z.object({
  photoId: requiredString.min(1, {
    message: "প্রোফাইল ছবি প্রদান করা আবশ্যক।",
  }),
});

export const finalWordsFormData = z.object({
  postApprovalOathTruthfulInfo: z.boolean().refine((val) => val === true, {
    message: "আপনাকে বায়োডাটায় সকল তথ্য সত্য প্রদান করার শপথ করতে হবে।",
  }),
  postApprovalOathNoMisuse: z.boolean().refine((val) => val === true, {
    message:
      "আপনাকে সহজনিকাহ ম্যাট্রিমনি ওয়েবসাইটের কোনো তথ্য অসৎ কাজে ব্যবহার না করার শপথ করতে হবে।",
  }),
  postApprovalOathLegalResponsibility: z
    .boolean()
    .refine((val) => val === true, {
      message:
        "আপনাকে কোনো মিথ্যা তথ্য প্রদান করলে বা কোনো তথ্য অসৎ কাজে ব্যবহার করলে সকল আইনী এবং পরকালীন দায়ভার স্বীকার করতে হবে।",
    }),
});

export const biodataFormData = z.object({
  firstWordsFormData: firstWordsFormData,
  primaryInfoFormData: primaryInfoFormData,
  generalInfoFormData: generalInfoFormData,
  addressInfoFormData: addressInfoFormData,
  educationInfoFormData: educationInfoFormData,
  occupationInfoFormData: occupationInfoFormData,
  familyInfoFormData: familyInfoFormData,
  religiousInfoFormData: religiousInfoFormData,
  marriageInfoFormData: marriageInfoFormData,
  spousePreferenceInfoFormData: spousePreferenceInfoFormData,
  profilePicFormData: profilePicFormData,
  finalWordsFormData: finalWordsFormData,
});
