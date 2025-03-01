import { boolean, z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

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

export const biodataEditForm = z.object({
  ...firstWordForm.shape,
});

export const biodataCreateForm = z.object({
  ...firstWordForm.shape,
});
