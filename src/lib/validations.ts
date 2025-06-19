import { z } from "zod";

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
    message: "মাতার নাম অবশ্যই প্রদান করতে হবে।",
  }),
  email: requiredString
    .email({ message: "একটি বৈধ ইমেইল প্রদান করুন।" })
    .min(1, { message: "ইমেইল প্রদান করা আবশ্যক।" }),
  phoneNumber: requiredString
    .regex(/^\+?\d{10,15}$/, { message: "একটি বৈধ মোবাইল নম্বর প্রদান করুন।" })
    .min(1, { message: "মোবাইল নম্বর প্রদান করা আবশ্যক।" }),
  guardianContacts: z
    .array(
      z.object({
        relation: requiredString.min(1, {
          message: "অভিভাবকের সম্পর্ক প্রদান করা আবশ্যক।",
        }),
        fullName: requiredString.min(1, {
          message: "অভিভাবকের নাম প্রদান করা আবশ্যক।",
        }),
        phoneNumber: requiredString
          .regex(/^\+?\d{10,15}$/, {
            message: "একটি বৈধ মোবাইল নম্বর প্রদান করুন।",
          })
          .min(1, { message: "অভিভাবকের মোবাইল নম্বর প্রদান করা আবশ্যক।" }),
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
  nationality: z
    .array(
      requiredString.min(1, {
        message: "জাতীয়তা প্রদান করা আবশ্যক।",
      })
    )
    .min(1, { message: "জাতীয়তা প্রদান করা আবশ্যক।" }),
});

export const addressInfoFormData = z.object({
  addresses: z.array(
    z
      .object({
        type: requiredString.min(1, {
          message: "ঠিকানার ধরন প্রদান করা আবশ্যক।",
        }),
        location: optionalString,
        // জেলা / স্টেট
        state: optionalString,
        // উপজেলা / শহর
        city: optionalString,
        detail: optionalString,

        // বিদেশি ঠিকানা
        country: optionalString,
        cityzenshipStatus: optionalString,
        permanentHomeAddress: optionalString,
      })
      .superRefine((data, ctx) => {
        if (data.location === "foreign") {
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
  type: z.array(requiredString).min(1, {
    message: "শিক্ষার ধরন প্রদান করা আবশ্যক।",
  }),
  highestDegree: requiredString.min(1, {
    message: "সর্বোচ্চ শিক্ষাগত যোগ্যতা নির্বাচন করা আবশ্যক।",
  }),
  degrees: z.array(
    z.object({
      degreeType: requiredString.min(1, {
        message: "ডিগ্রির ধরন প্রদান করা আবশ্যক।",
      }),
      name: requiredString.min(1, {
        message: "ডিগ্রির নাম প্রদান করা আবশ্যক।",
      }),
      passYear: requiredString.min(1, {
        message: "পাসের বছর প্রদান করা আবশ্যক।",
      }),
      group: optionalString,
      institute: requiredString.min(1, {
        message: "শিক্ষাপ্রতিষ্ঠানের নাম প্রদান করা আবশ্যক।",
      }),
    })
  ),
  religiousEducation: z.array(optionalString).optional(),
  detail: optionalString, // Made optional to align with JSON
});

export const occupationInfoFormData = z.object({
  occupations: z.array(optionalString).min(1, {
    message: "পেশার ধরন প্রদান করা আবশ্যক।",
  }),
  detail: requiredString.min(1, {
    message: "পেশার বিস্তারিত তথ্য প্রদান করা আবশ্যক।",
  }),
  monthlyIncome: optionalString,
});

export const familyInfoFormData = z.object({
  parentsAlive: requiredString.min(1, {
    message: "পিতা-মাতার জীবিত থাকার অবস্থা নির্বাচন করুন।",
  }),
  fatherOccupation: requiredString.min(1, {
    message: "পিতার পেশা উল্লেখ করুন।",
  }),
  motherOccupation: requiredString.min(1, {
    message: "মাতার পেশা উল্লেখ করুন।",
  }),
  siblings: z.array(
    z.object({
      serial: optionalString,
      type: optionalString,
      occupation: optionalString,
      maritalStatus: optionalString,
      children: optionalString,
    })
  ),
  fatherSideDetail: requiredString.min(1, {
    message: "পিতার পরিবারের বিস্তারিত তথ্য প্রদান করুন।",
  }),
  motherSideDetail: requiredString.min(1, {
    message: "মাতার পরিবারের বিস্তারিত তথ্য প্রদান করুন।",
  }),
  familyType: requiredString.min(1, {
    message: "পরিবারের ধরন নির্বাচন করুন।",
  }),
  familyBackground: requiredString.min(1, {
    message: "পরিবারের সামাজিক ও সাংস্কৃতিক পটভূমি উল্লেখ করুন।",
  }),
  livingCondition: requiredString.min(1, {
    message: "পরিবারের বসবাসের পরিবেশ সম্পর্কে উল্লেখ করুন।",
  }),
  wealthDescription: requiredString.min(1, {
    message: "পরিবারের আর্থিক অবস্থা সম্পর্কে সংক্ষিপ্ত বিবরণ দিন।",
  }),
});

export const religiousInfoFormData = z.object({
  type: requiredString.min(1, {
    message: "পেশার ধরন প্রদান করা আবশ্যক।",
  }),
  ideology: requiredString.min(1, {
    message: "ধর্মীয় কোন মতাদর্শ মেনে চলেন তা প্রদান করা আবশ্যক।",
  }),
  madhab: requiredString.min(1, {
    message: "কোন মাজহাব / মানহাজ অনুসরণ করেন তা নির্বাচন করা আবশ্যক।",
  }),
  praysFiveTimes: requiredString.min(1, {
    message: "প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়া হয় কিনা তা নির্বাচন করা আবশ্যক।",
  }),
  hasQazaPrayers: optionalString,
  canReciteQuranProperly: requiredString.min(1, {
    message: "শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন কিনা তা নির্বাচন করা আবশ্যক।",
  }),
  avoidsHaramIncome: optionalString,
  modestDressing: optionalString,
  followsMahramRules: optionalString,
  beliefAboutPirMurshidAndMazar: optionalString,
  practicingSince: optionalString,
  veilWithNiqab: optionalString,
});

export const personalInfoFormData = z.object({
  beardStatus: requiredString.min(1, {
    message: "দয়া করে দাড়ি রাখার ব্যাপারে আপনার অবস্থান উল্লেখ করুন।",
  }),
  preferredOutfit: requiredString.min(1, {
    message: "আপনার বাহিরে পরার পছন্দের পোশাক নির্বাচন করুন।",
  }),
  entertainmentPreferences: requiredString.min(1, {
    message: "দয়া করে আপনি কোন ধরণের বিনোদন উপভোগ করেন তা উল্লেখ করুন।",
  }),
  healthConditions: requiredString.min(1, {
    message: "আপনার যদি কোনো মানসিক বা শারীরিক সমস্যা থাকে, তা উল্লেখ করুন।",
  }),
  personalTraits: z.array(optionalString).min(1, {
    message: "আপনার ব্যক্তিগত কিছু গুণাবলী উল্লেখ করুন।",
  }),
  genderEqualityView: optionalString,
  lgbtqOpinion: optionalString,
  specialConditions: z.array(optionalString).min(1, {
    message: "আপনার ক্ষেত্রে প্রযোজ্য বিশেষ কোনো অবস্থা থাকলে তা উল্লেখ করুন।",
  }),
  aboutYourself: requiredString.min(1, {
    message: "আপনার সম্পর্কে বিবরণিত তথ্য প্রদান করুন।",
  }),
});

export const marriageInfoFormData = z.object({
  // Conditional fields based on marital status
  reasonForRemarriage: optionalString,
  currentSpouseAndChildren: optionalString,
  previousMarriageAndDivorceDetails: optionalString,
  spouseDeathDetails: optionalString,
  childrenDetails: optionalString,
  // Existing fields
  guardianApproval: requiredString.min(1, {
    message: "অভিভাবক আপনার বিয়েতে রাজি আছেন কিনা নির্বাচন করুন।",
  }),
  continueStudy: requiredString.min(1, {
    message: "বিয়ের পর স্ত্রীকে পড়াশোনা করতে দিতে চান কিনা নির্বাচন করুন।",
  }),
  continueStudyDetails: optionalString,
  careerPlan: requiredString.min(1, {
    message:
      "বিয়ের পর স্ত্রী চাইলে চাকরি বা ব্যবসা করতে দিবেন কিনা নির্বাচন করুন।",
  }),
  careerPlanDetails: optionalString,
  residence: requiredString.min(1, {
    message:
      "যৌথ বা একক পরিবারে থাকার ব্যাপারে আপনি কোনটি পছন্দ করেন তা উল্লেখ করুন।",
  }),
  arrangeHijab: optionalString,
  dowryExpectation: requiredString.min(1, {
    message:
      "বিয়ে উপলক্ষে আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে যৌতুক / উপহার / অর্থ আশা করবেন কিনা নির্বাচন করুন।",
  }),
  allowShowingPhotoOnline: optionalString,
  additionalMarriageInfo: optionalString,
});

// export const spousePreferenceInfoFormData = z.object({
//   age: requiredString.min(1, {
//     message: "বয়স প্রদান করা আবশ্যক।",
//   }),
//   skinTone: z.array(optionalString).optional(),
//   height: requiredString.min(1, {
//     message: "উচ্চতা প্রদান করা আবশ্যক।",
//   }),
//   educationalQualification: requiredString.min(1, {
//     message: "শিক্ষাগত যোগ্যতা নির্বাচন করা আবশ্যক।",
//   }),
//   religiousEducationalQualification: z.array(optionalString).optional(),
//   address: optionalString,
//   maritalStatus: z.array(optionalString).optional(),
//   specialCategory: z.array(optionalString).optional(),
//   religiousType: z.array(optionalString).optional(),
//   occupation: z.array(optionalString).optional(),
//   familyBackground: z.array(optionalString).optional(),
//   secondMarrige: requiredString.min(1, {
//     message: "দ্বিতীয় বিয়ে সম্পর্কে নির্বাচন করা আবশ্যক।",
//   }),
//   location: requiredString.min(1, {
//     message: "অবস্থান নির্বাচন করা আবশ্যক।",
//   }),
//   qualities: requiredString.min(1, {
//     message: "জীবনসঙ্গীর বৈশিষ্ট্য বা গুণাবলী প্রদান করা আবশ্যক।",
//   }),
// });
export const spousePreferenceInfoFormData = z.object({
  age: requiredString.min(1, {
    message: "বয়স প্রদান করা আবশ্যক।",
  }),
  skinTone: z.array(optionalString).optional(),
  height: requiredString.min(1, {
    message: "উচ্চতা প্রদান করা আবশ্যক।",
  }),
  educationalQualification: requiredString.min(1, {
    message: "শিক্ষাগত যোগ্যতা নির্বাচন করা আবশ্যক।",
  }),
  address: requiredString.min(1, {
    message: "ঠিকানা প্রদান করা আবশ্যক।",
  }),
  religiousEducationalQualification: z.array(optionalString).optional(),
  maritalStatus: z.array(optionalString).optional(),
  specialCategory: z.array(optionalString).optional(),
  religiousType: z.array(optionalString).optional(),
  occupation: z.string(optionalString).optional(),
  familyBackground: z.array(optionalString).optional(),
  secondMarriage: optionalString,
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
  visibility: requiredString.min(1, {
    message:
      "বায়োডাটা গোপন থাকবে না, শুধু আপনি যাকে প্রস্তাব পাঠাবেন বা লিংক পাঠাবেন তিনি ছাড়া",
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
  personalInfoFormData: personalInfoFormData,
  marriageInfoFormData: marriageInfoFormData,
  spousePreferenceInfoFormData: spousePreferenceInfoFormData,
  profilePicFormData: profilePicFormData,
  finalWordsFormData: finalWordsFormData,
});
