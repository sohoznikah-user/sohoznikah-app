// src/app/(main)/biodatas/listPageComponentes/biodataFilterOptions.ts

export const searchingFilters = {
  specialCategory: [
    { id: "expatriate", title: "প্রবাসী", for: "both" },
    /* address info */
    {
      id: "foreign_citizen",
      title: "ফরেইন সিটিজেন",
      for: "both",
    },
    /* --------- */
    { id: "bcs_cadre", title: "বিসিএস ক্যাডার", for: "both" },
    {
      id: "employed_BRIDE",
      title: "চাকরিজীবী",
      for: "BRIDE",
    },
    /* marrige info */
    {
      id: "post_marriage_job",
      title: "বিয়ের পর চাকরি/ব্যাবসায় আগ্রহী",
      for: "BRIDE",
    },
    {
      id: "post_marriage_study",
      title: "বিয়ের পর পড়াশোনা চালিয়ে যেতে আগ্রহী",
      for: "BRIDE",
    },
    /* ----------- */
    {
      id: "social_worker",
      title: "সমাজ সেবক",
      for: "both",
    },
    { id: "tabligh_member", title: "তাবলীগ", for: "both" },
    {
      id: "religious_service",
      title: "দ্বীনের খেদমতকারী",
      for: "both",
    },
    { id: "new_muslim", title: "নওমুসলিম", for: "both" },
    {
      id: "disabled",
      title: "প্রতিবন্ধী",
      for: "both",
    },
    { id: "orphan", title: "এতিম", for: "both" },
    {
      id: "infertility_issues",
      title: "বন্ধ্যা/ইনফার্টিলিটি",
      for: "both",
    },
    {
      id: "short_divorced",
      title: "শর্ট ডিভোর্সি",
      for: "both",
    },
    /* spouse-preference-info */
    {
      id: "masna_interest",
      title: "মাসনায় আগ্রহী",
      for: "BRIDE",
    },
    /* ------------ */
    {
      id: "single_father",
      title: "সিঙ্গেল ফাদার",
      for: "GROOM",
    },
    {
      id: "single_mother",
      title: "সিঙ্গেল মাদার",
      for: "BRIDE",
    },
    {
      id: "short_height",
      title: "স্বল্প উচ্চতার",
      for: "both",
    },
    { id: "older_age", title: "বয়সে বেশি", for: "both" },
    {
      id: "urban_resident",
      title: "শহরে বসবাসকারী",
      for: "both",
    },
    {
      id: "rural_resident",
      title: "গ্রামে বসবাসকারী",
      for: "both",
    },
    /* marriage info */
    {
      id: "allow_wife_job",
      title: "স্ত্রীকে চাকরি/ব্যবসা করতে দিবে",
      for: "GROOM",
    },
    {
      id: "allow_wife_study",
      title: "স্ত্রীকে পড়াশোনা করতে দিবে",
      for: "GROOM",
    },
  ],
};

export const beingSearchedFilters = {
  specialCategory: [
    {
      id: "expatriate",
      title: "আমি একজন প্রবাসী",
      for: "both",
    },
    {
      id: "foreign_citizen",
      title: "আমার ফরেইন সিটিজেনশিপ আছে",
      for: "both",
    },
    {
      id: "short_divorced",
      title: "আমি শর্ট ডিভোর্সি বা ডিভোর্সড",
      for: "both",
    },
    {
      id: "widowed_GROOM",
      title: "আমি বিপত্নীক",
      for: "GROOM",
    },
    {
      id: "widowed_BRIDE",
      title: "আমি বিধবা",
      for: "BRIDE",
    },
    {
      id: "single_father",
      title: "আমি সিঙ্গেল ফাদার (সন্তান আছে কিন্তু মা নেই বা দায়িত্বে নেই)",
      for: "GROOM",
    },
    {
      id: "single_mother",
      title: "আমি সিঙ্গেল মাদার (সন্তান আছে কিন্তু বাবা নেই বা দায়িত্বে নেই)",
      for: "BRIDE",
    },
    {
      id: "second_marriage_GROOM",
      title: "আমি মাসনা বা দ্বিতীয় বিবাহে আগ্রহী",
      for: "GROOM",
    },
    {
      id: "second_marriage_BRIDE",
      title: "আমি দ্বিতীয় স্ত্রী বা মাসনা হতে আগ্রহী",
      for: "BRIDE",
    },
    {
      id: "short_height",
      title: "আমি স্বল্প উচ্চতার",
      for: "both",
    },
    {
      id: "older_age",
      title: "আমি বয়সে বেশি",
      for: "both",
    },
    {
      id: "village_resident",
      title: "আমি গ্রামে বসবাসকারী",
      for: "both",
    },
    {
      id: "dark_complexion",
      title: "আমার গায়ের বর্ণ গাঢ়",
      for: "BRIDE",
    },
    {
      id: "infertility",
      title: "আমি বন্ধ্যাত্ব সমস্যায় ভুগছি",
      for: "both",
    },
    {
      id: "new_muslim",
      title: "আমি একজন নওমুসলিম",
      for: "both",
    },
    { id: "orphan", title: "আমি এতিম", for: "both" },
    {
      id: "disabled",
      title: "আমি প্রতিবন্ধী",
      for: "both",
    },
    {
      id: "religious_service",
      title: "আমি দ্বীনের খেদমতে আছি",
      for: "both",
    },
    {
      id: "tabligh",
      title: "আমি তাবলীগ এর সাথে যুক্ত",
      for: "both",
    },
    {
      id: "social_worker",
      title: "আমি একজন সমাজ সেবক",
      for: "both",
    },
    {
      id: "employed",
      title: "আমি একজন চাকরিজীবী",
      for: "BRIDE",
    },
    {
      id: "post_marriage_job",
      title: "আমি বিয়ের পর চাকরি / ব্যাবসায় আগ্রহী",
      for: "BRIDE",
    },
    {
      id: "post_marriage_study",
      title: "আমি বিয়ের পর পড়াশোনা করতে আগ্রহী",
      for: "BRIDE",
    },
  ],
};
