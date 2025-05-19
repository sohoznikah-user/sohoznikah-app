export const biodataTypes = [
  { id: "GROOM", title: "পাত্রের বায়োডাটা" },
  { id: "BRIDE", title: "পাত্রীর বায়োডাটা" },
];

export const maritalStatuses = [
  { id: "unmarried", title: "অবিবাহিত", for: "both" },
  { id: "married", title: "বিবাহিত", for: "both" },
  { id: "divorced", title: "ডিভোর্সড", for: "both" },
  { id: "widowed_male", title: "বিপত্নীক", for: "GROOM" },
  { id: "widowed_female", title: "বিধবা", for: "BRIDE" },
];

export const religiousLifestyle = [
  { id: "devout", title: "পূর্ণ ধার্মিক/প্র্যাক্টিসিং", for: "both" },
  { id: "practicing", title: "প্রাক্টিসিংয়ের চেষ্টারত", for: "both" },
  { id: "general", title: "জেনারেল/নন-প্রাক্টিসিং", for: "both" },
];

export const skinTones = [
  { id: "dark", title: "গাঢ় ত্বক", for: "both" },
  { id: "medium", title: "শ্যামলা", for: "both" },
  { id: "light_medium", title: "উজ্জ্বল শ্যামলা", for: "both" },
  { id: "fair", title: "ফর্সা", for: "both" },
  { id: "very_fair", title: "উজ্জ্বল ফর্সা", for: "both" },
];

export const bloodGroups = [
  { id: "A+", title: "A+", for: "both" },
  { id: "B+", title: "B+", for: "both" },
  { id: "A-", title: "A-", for: "both" },
  { id: "B-", title: "B-", for: "both" },
  { id: "AB+", title: "AB+", for: "both" },
  { id: "AB-", title: "AB-", for: "both" },
  { id: "O+", title: "O+", for: "both" },
  { id: "O-", title: "O-", for: "both" },
];

export const nationalities = [
  { id: "bangladeshi", title: "বাংলাদেশী", for: "both" },
  { id: "foreign_citizen", title: "ফরেইন সিটিজেন", for: "both" },
];

export const types = [
  { id: "permanent_address", title: "স্থায়ী ঠিকানা", for: "both" },
  { id: "current_address", title: "বর্তমান ঠিকানা", for: "both" },
];

export const locations = [
  { id: "bangladesh", title: "বাংলাদেশ", for: "both" },
  { id: "foreign", title: "বিদেশ", for: "both" },
];

export const citizenshipOptions = [
  { id: "yes", title: "হ্যা", for: "both" },
  { id: "no", title: "না", for: "both" },
];

export const educationTypes = [
  { id: "general", title: "জেনারেল", for: "both" },
  { id: "alia", title: "আলিয়া", for: "both" },
  { id: "qawmi", title: "কওমী", for: "both" },
];

export const degreeTypes = [
  { id: "below_secondary", title: "নিম্ন মাধ্যমিক বা এর নিচে", for: "both" },
  { id: "secondary", title: "মাধ্যমিক", for: "both" },
  { id: "higher_secondary", title: "উচ্চ মাধ্যমিক", for: "both" },
  { id: "diploma", title: "ডিপ্লোমা", for: "both" },
  { id: "bachelor", title: "স্নাতক", for: "both" },
  { id: "master", title: "স্নাতকোত্তর", for: "both" },
  { id: "doctoral", title: "ডক্টরাল", for: "both" },
  { id: "medical", title: "মেডিকেল", for: "both" },
  { id: "defense", title: "ডিফেন্স", for: "both" },
  {
    id: "police_law_enforcement",
    title: "পুলিশ/আইন-শৃঙ্খলা বাহিনী",
    for: "both",
  },
  { id: "aviation", title: "এভিয়েশন", for: "both" },
  { id: "other", title: "অন্যান্য", for: "both" },
];

export const occupationsList = [
  { id: "business", title: "ব্যবসা", for: "both" },
  { id: "govt_job", title: "সরকারি চাকরিজীবী", for: "both" },
  { id: "private_job", title: "বেসরকারি চাকরিজীবী", for: "both" },
  { id: "home_tutor", title: "হোম টিউটর", for: "both" },
  { id: "teacher", title: "শিক্ষক/শিক্ষিকা", for: "both" },
  { id: "lawyer", title: "আইনজীবী", for: "both" },
  { id: "engineer", title: "ইঞ্জিনিয়ার", for: "both" },
  { id: "doctor", title: "ডাক্তার", for: "both" },
  { id: "vet_doctor", title: "ভেটেরিনারি ডাক্তার", for: "both" },
  { id: "nurse", title: "নার্স", for: "both" },
  { id: "pharmacist", title: "ফার্মাসিস্ট", for: "both" },
  { id: "paramedic", title: "প্যারামেডিক", for: "both" },
  { id: "therapist", title: "থেরাপিস্ট", for: "both" },
  { id: "medical_technologist", title: "মেডিকেল টেকনোলজিস্ট", for: "both" },
  { id: "medical_assistant", title: "মেডিক্যাল অ্যাসিস্ট্যান্ট", for: "both" },
  { id: "military_job", title: "সামরিক জব", for: "both" },
  { id: "paramilitary_job", title: "আধা সামরিক জব", for: "both" },
  { id: "imam", title: "ইমাম", for: "both" },
  { id: "muezzin", title: "মুয়াজ্জিন", for: "both" },
  { id: "pilot", title: "পাইলট", for: "both" },
  { id: "freelancer", title: "ফ্রিল্যান্সার", for: "both" },
  { id: "student", title: "শিক্ষার্থী", for: "both" },
  { id: "mbbs_bds_student", title: "MBBS/BDS শিক্ষার্থী", for: "both" },
  { id: "expatriate_job", title: "প্রবাসী-প্রবাস জব", for: "both" },
  { id: "manual_labor", title: "মিস্ত্রী/কায়িক শ্রম", for: "both" },
  { id: "agriculture", title: "কৃষিকাজ", for: "both" },
  { id: "jobless", title: "চাকরির সন্ধানরত/বেকার", for: "both" },
  { id: "family_property", title: "পারিবারিক সম্পত্তি", for: "both" },
  { id: "no_occupation", title: "পেশা নেই/কর্মহীন", for: "both" },
  { id: "other_occupation", title: "অন্যান্য", for: "both" },
];

export const familyBackgrounds = [
  { id: "upper_class", title: "উচ্চবিত্ত", for: "both" },
  { id: "upper_middle", title: "উচ্চ মধ্যবিত্ত", for: "both" },
  { id: "middle", title: "মধ্যবিত্ত", for: "both" },
  { id: "lower_middle", title: "নিম্ন মধ্যবিত্ত", for: "both" },
  { id: "lower_class", title: "নিম্নবিত্ত", for: "both" },
];

export const familyTypes = [
  { id: "nuclear_family", title: "একক পরিবার", for: "both" },
  { id: "joint_family", title: "যৌথ পরিবার", for: "both" },
];

export const siblingTypes = [
  { id: "brother", title: "ভাই", for: "both" },
  { id: "sister", title: "বোন", for: "both" },
];

export const religiousIdeologies = [
  { id: "sunni", title: "সুন্নি", for: "both" },
  { id: "shia", title: "শিয়া", for: "both" },
  { id: "other", title: "অন্যান্য", for: "both" },
  { id: "unknown", title: "জানা নেই", for: "both" },
];

export const madhhabs = [
  { id: "hanafi", title: "হানাফি", for: "both" },
  { id: "salafi", title: "সালাফি/আহলে হাদিস", for: "both" },
  { id: "shafi", title: "শাফেঈ", for: "both" },
  { id: "maliki", title: "মালিকী", for: "both" },
  { id: "hambali", title: "হাম্বলি", for: "both" },
  { id: "other_madhhab", title: "অন্যান্য", for: "both" },
  { id: "unknown_madhhab", title: "জানা নেই", for: "both" },
];

export const education = [
  { id: "qawmi", title: "কওমি", for: "both" },
  { id: "alia", title: "আলিয়া", for: "both" },
  { id: "diploma", title: "ডিপ্লোমা", for: "both" },
  { id: "bachelor", title: "স্নাতক", for: "both" },
  { id: "masters", title: "স্নাতকোত্তর", for: "both" },
  { id: "doctoral", title: "ডক্টরাল", for: "both" },
  { id: "bcs", title: "বি.সি.এস (BCS)", for: "both" },
  { id: "medical", title: "মেডিকেল", for: "both" },
  { id: "defense", title: "ডিফেন্স", for: "both" },
  { id: "police_law", title: "পুলিশ/আইন-শৃঙ্খলা বাহিনী", for: "both" },
  { id: "aviation", title: "এভিয়েশন", for: "both" },
];

export const religiousEducation = [
  { id: "hafiz_male", title: "হাফেজ", for: "BRIDE" },
  { id: "hafiza_female", title: "হাফেজা", for: "GROOM" },
  { id: "maulana_male", title: "মাওলানা", for: "BRIDE" },
  { id: "alema_female", title: "আলেমা", for: "GROOM" },
  { id: "mufti_male", title: "মুফতি", for: "BRIDE" },
  { id: "muftia_female", title: "মুফতিয়া", for: "GROOM" },
  { id: "muhaddis_male", title: "মুহাদ্দিস", for: "BRIDE" },
  { id: "muhaddisa_female", title: "মুহাদ্দিসা", for: "GROOM" },
  { id: "mufassir", title: "মুফাসসির", for: "both" },
  { id: "faqih", title: "ফকিহ", for: "both" },
  { id: "daee_male", title: "দা'য়ী", for: "BRIDE" },
  { id: "daiya_female", title: "দাঈয়া", for: "GROOM" },
  { id: "adib", title: "আদিব", for: "both" },
  { id: "qari_male", title: "ক্বারী", for: "BRIDE" },
  { id: "qaria_female", title: "ক্বারিয়া", for: "GROOM" },
  { id: "talib_quran", title: "তালিবে কুরআন", for: "both" },
  { id: "tajwid_student", title: "তাজবীদ শিক্ষার্থী", for: "both" },
  { id: "muallim_talim", title: "মুয়াল্লিমুন ফি তালিম", for: "both" },
  { id: "islamic_scholar", title: "ইসলামিক স্কলার", for: "both" },
];

export const characteristics = [
  { id: "introvert", title: "ইন্ট্রোভার্ট", for: "both" },
  { id: "extrovert", title: "এক্সট্রোভার্ট", for: "both" },
  { id: "family_oriented", title: "সাংসারিক", for: "both" },
  { id: "sociable", title: "মিশুক", for: "both" },
  { id: "calm_polite", title: "শান্ত-শিষ্ট", for: "both" },
  { id: "patient", title: "ধৈর্যশীল", for: "both" },
  { id: "affectionate", title: "ভালবাসাপ্রবণ", for: "both" },
  { id: "supportive", title: "সাপোর্টিভ", for: "both" },
  { id: "conscious", title: "সচেতন", for: "both" },
  { id: "emotional", title: "ইমোশনাল", for: "both" },
  { id: "kind", title: "দয়ালু", for: "both" },
  { id: "generous", title: "দানশীল", for: "both" },
  { id: "cultured", title: "সংস্কৃতিমনা", for: "both" },
  { id: "religious", title: "ধার্মিক", for: "both" },
  { id: "caring", title: "যত্নশীল", for: "both" },
  { id: "responsible", title: "দায়িত্ববান", for: "both" },
  { id: "assertive", title: "প্রতিবাদী", for: "both" },
  { id: "temperamental", title: "রাগী", for: "both" },
  { id: "restless", title: "অস্থির", for: "both" },
  { id: "stubborn", title: "একগুঁয়ে", for: "both" },
  { id: "perfectionist", title: "খুঁতখুঁতে", for: "both" },
];

export const specialCatagories = [
  { id: "bcs_cadre", title: "আমি বিসিএস ক্যাডার", for: "both" },
  { id: "social_worker", title: "আমি একজন সমাজ সেবক", for: "both" },
  { id: "tabligh_member", title: "আমি তাবলীগ এর সাথে যুক্ত", for: "both" },
  {
    id: "religious_service",
    title: "আমি দ্বীনের খেদমতে আছি",
    for: "both",
  },
  { id: "new_muslim", title: "আমি একজন নওমুসলিম", for: "both" },
  { id: "disabled", title: "আমি প্রতিবন্ধী", for: "both" },
  { id: "orphan", title: "আমি এতিম", for: "both" },
  {
    id: "infertility_issues",
    title: "আমি বন্ধ্যাত্ব সমস্যায় ভুগছি",
    for: "both",
  },
  {
    id: "short_term_divorcee",
    title: "আমি শর্ট ডিভোর্সি",
    for: "both",
  },
  {
    id: "short_height",
    title: "আমি স্বল্প উচ্চতার মানুষ আলহামদুলিল্লাহ",
    for: "both",
  },
  {
    id: "older_age",
    title: "আমি বয়সে বেশি",
    for: "both",
  },
  {
    id: "urban_resident",
    title: "আমি শহরে বসবাসকারী",
    for: "both",
  },
  {
    id: "rural_resident",
    title: "আমি গ্রামে বসবাসকারী",
    for: "both",
  },
  {
    id: "single_father",
    title: "আমি সিঙ্গেল ফাদার-সন্তান আছে কিন্তু মা নেই বা দায়িত্বে নেই",
    for: "BRIDE",
  },
  {
    id: "single_mother",
    title: "আমি সিঙ্গেল মাদার-সন্তান আছে কিন্তু বাবা নেই বা দায়িত্বে নেই",
    for: "GROOM",
  },
];

export const spouseSpecialCatagories = [
  { id: "expatriate", title: "প্রবাসী", for: "both" },
  { id: "foreign_citizen", title: "ফরেইন সিটিজেন", for: "both" },
  { id: "social_worker", title: "সমাজ সেবক", for: "both" },
  { id: "tabligh", title: "তাবলীগ", for: "both" },
  { id: "deen_service", title: "দ্বীনের খেদমতকারী", for: "both" },
  { id: "new_muslim", title: "নওমুসলিম", for: "both" },
  { id: "disabled", title: "প্রতিবন্ধী", for: "both" },
  { id: "orphan", title: "এতিম", for: "both" },
  { id: "infertile", title: "বন্ধ্যা/ইনফার্টিলিটি", for: "both" },
  { id: "short_divorced", title: "শর্ট ডিভোর্সি", for: "both" },
  { id: "single_father", title: "সিঙ্গেল ফাদার", for: "BRIDE" },
  { id: "single_mother", title: "সিঙ্গেল মাদার", for: "GROOM" },
  { id: "short_height", title: "স্বল্প উচ্চতার", for: "both" },
  { id: "older_age", title: "বয়সে বেশি", for: "both" },
  { id: "urban_resident", title: "শহরে বসবাসকারী", for: "both" },
  { id: "rural_resident", title: "গ্রামে বসবাসকারী", for: "both" },
  {
    id: "allow_wife_job",
    title: "স্ত্রীকে চাকরি/ব্যবসা করতে দিবে",
    for: "BRIDE",
  },
  { id: "allow_wife_study", title: "স্ত্রীকে পড়াশোনা করতে দিবে", for: "BRIDE" },
  { id: "employed_female", title: "চাকরিজীবী", for: "GROOM" },
  {
    id: "job_interest_post_marriage",
    title: "বিয়ের পর চাকরি/ব্যাবসায় আগ্রহী",
    for: "GROOM",
  },
  { id: "masna_interest", title: "মাসনায় আগ্রহী", for: "GROOM" },
];

export const afterMarriageStudies = [
  { id: "not_interested", title: "না, আমি একদমই চাই না", for: "BRIDE" },
  {
    id: "definitely_allowed",
    title: "হ্যা, অবশ্যই করতে পারবে",
    for: "BRIDE",
  },
  {
    id: "not_preferred_but_allowed",
    title: "ইচ্ছা নাই, তবে করতে চাইলে করতে পারবে",
    for: "BRIDE",
  },
  {
    id: "allowed_with_full_hijab",
    title: "পরিপূর্ণ পর্দা মেনে করতে পারলে ঠিক আছে",
    for: "BRIDE",
  },
  { id: "not_interested_groom", title: "না, একদমই ইচ্ছা নেই", for: "GROOM" },
  { id: "definitely_want", title: "হ্যা, অবশ্যই করতে চাই", for: "GROOM" },
  {
    id: "interested_with_discussion",
    title: "হ্যা, করতে ইচ্ছুক (আলোচনা/অনুমতি সাপেক্ষে)",
    for: "GROOM",
  },
];

export const afterMarriageJobs = [
  { id: "not_interested", title: "না, আমি একদমই চাই না", for: "BRIDE" },
  {
    id: "definitely_allowed",
    title: "হ্যা, অবশ্যই করতে পারবে",
    for: "BRIDE",
  },
  {
    id: "not_preferred_but_allowed",
    title: "ইচ্ছা নাই, তবে করতে চাইলে করতে পারবে",
    for: "BRIDE",
  },
  {
    id: "allowed_with_full_hijab",
    title: "পরিপূর্ণ পর্দা মেনে করতে পারলে ঠিক আছে",
    for: "BRIDE",
  },
  {
    id: "work_from_home",
    title: "বাসায় থেকে কিছু করতে চাইলে করবে",
    for: "BRIDE",
  },
  {
    id: "considered_if_needed",
    title: "খুব প্রয়োজন হলে বিবেচনা করা হবে",
    for: "BRIDE",
  },
  {
    id: "social_or_religious_service",
    title: "সমাজসেবা/দ্বীনের খেদমত করতে চাইলে করতে পারবে",
    for: "BRIDE",
  },
  { id: "not_interested_groom", title: "না, একদমই ইচ্ছা নেই", for: "GROOM" },
  {
    id: "job_with_discussion",
    title: "চাকরি করতে ইচ্ছুক (আলোচনা/অনুমতি সাপেক্ষে)",
    for: "GROOM",
  },
  {
    id: "business_with_discussion",
    title: "ব্যবসা করতে ইচ্ছুক (আলোচনা/অনুমতি সাপেক্ষে)",
    for: "GROOM",
  },
  {
    id: "work_from_home_online",
    title: "ঘরে বসে/অনলাইনে কিছু করতে ইচ্ছুক",
    for: "GROOM",
  },
  {
    id: "social_or_religious_service_groom",
    title: "সমাজসেবা/দ্বীনের খেদমত করতে ইচ্ছুক (অনলাইনে/অফলাইনে)",
    for: "GROOM",
  },
];

export const spouseLocationOptions = [
  { id: "urban_resident", title: "শহরে বসবাসকারী", for: "both" },
  { id: "rural_resident", title: "গ্রামে বসবাসকারী", for: "both" },
  { id: "both", title: "উভয়ই", for: "both" },
];

export const secondMarriageOptions = [
  { id: "yes", title: "হ্যা", for: "both" },
  { id: "no", title: "না", for: "both" },
];

export const heights = [
  { id: "47", title: "৪ ফুটের কম", for: "both" },
  { id: "48", title: "৪'", for: "both" },
  { id: "49", title: "৪'১\"", for: "both" },
  { id: "50", title: "৪'২\"", for: "both" },
  { id: "51", title: "৪'৩\"", for: "both" },
  { id: "52", title: "৪'৪\"", for: "both" },
  { id: "53", title: "৪'৫\"", for: "both" },
  { id: "54", title: "৪'৬\"", for: "both" },
  { id: "55", title: "৪'৭\"", for: "both" },
  { id: "56", title: "৪'৮\"", for: "both" },
  { id: "57", title: "৪'৯\"", for: "both" },
  { id: "58", title: "৪'১০\"", for: "both" },
  { id: "59", title: "৪'১১\"", for: "both" },
  { id: "60", title: "৫'", for: "both" },
  { id: "61", title: "৫'১\"", for: "both" },
  { id: "62", title: "৫'২\"", for: "both" },
  { id: "63", title: "৫'৩\"", for: "both" },
  { id: "64", title: "৫'৪\"", for: "both" },
  { id: "65", title: "৫'৫\"", for: "both" },
  { id: "66", title: "৫'৬\"", for: "both" },
  { id: "67", title: "৫'৭\"", for: "both" },
  { id: "68", title: "৫'৮\"", for: "both" },
  { id: "69", title: "৫'৯\"", for: "both" },
  { id: "70", title: "৫'১০\"", for: "both" },
  { id: "71", title: "৫'১১\"", for: "both" },
  { id: "72", title: "৬'", for: "both" },
  { id: "73", title: "৬'১\"", for: "both" },
  { id: "74", title: "৬'২\"", for: "both" },
  { id: "75", title: "৬'৩\"", for: "both" },
  { id: "76", title: "৬'৪\"", for: "both" },
  { id: "77", title: "৬'৫\"", for: "both" },
  { id: "78", title: "৬'৬\"", for: "both" },
  { id: "79", title: "৬'৭\"", for: "both" },
  { id: "80", title: "৬'৮\"", for: "both" },
  { id: "81", title: "৬'৯\"", for: "both" },
  { id: "82", title: "৬'১০\"", for: "both" },
  { id: "83", title: "৬'১১\"", for: "both" },
  { id: "84", title: "৭'", for: "both" },
  { id: "85", title: "৭ ফুটের বেশি", for: "both" },
];

export const weights = [
  { id: "29", title: "৩০ কেজির কম", for: "both" },
  { id: "30", title: "৩০ কেজি", for: "both" },
  { id: "31", title: "৩১ কেজি", for: "both" },
  { id: "32", title: "৩২ কেজি", for: "both" },
  { id: "33", title: "৩৩ কেজি", for: "both" },
  { id: "34", title: "৩৪ কেজি", for: "both" },
  { id: "35", title: "৩৫ কেজি", for: "both" },
  { id: "36", title: "৩৬ কেজি", for: "both" },
  { id: "37", title: "৩৭ কেজি", for: "both" },
  { id: "38", title: "৩৮ কেজি", for: "both" },
  { id: "39", title: "৩৯ কেজি", for: "both" },
  { id: "40", title: "৪০ কেজি", for: "both" },
  { id: "41", title: "৪১ কেজি", for: "both" },
  { id: "42", title: "৪২ কেজি", for: "both" },
  { id: "43", title: "৪৩ কেজি", for: "both" },
  { id: "44", title: "৪৪ কেজি", for: "both" },
  { id: "45", title: "৪৫ কেজি", for: "both" },
  { id: "46", title: "৪৬ কেজি", for: "both" },
  { id: "47", title: "৪৭ কেজি", for: "both" },
  { id: "48", title: "৪৮ কেজি", for: "both" },
  { id: "49", title: "৪৯ কেজি", for: "both" },
  { id: "50", title: "৫০ কেজি", for: "both" },
  { id: "51", title: "৫১ কেজি", for: "both" },
  { id: "52", title: "৫২ কেজি", for: "both" },
  { id: "53", title: "৫৩ কেজি", for: "both" },
  { id: "54", title: "৫৪ কেজি", for: "both" },
  { id: "55", title: "৫৫ কেজি", for: "both" },
  { id: "56", title: "৫৬ কেজি", for: "both" },
  { id: "57", title: "৫৭ কেজি", for: "both" },
  { id: "58", title: "৫৮ কেজি", for: "both" },
  { id: "59", title: "৫৯ কেজি", for: "both" },
  { id: "60", title: "৬০ কেজি", for: "both" },
  { id: "61", title: "৬১ কেজি", for: "both" },
  { id: "62", title: "৬২ কেজি", for: "both" },
  { id: "63", title: "৬৩ কেজি", for: "both" },
  { id: "64", title: "৬৪ কেজি", for: "both" },
  { id: "65", title: "৬৫ কেজি", for: "both" },
  { id: "66", title: "৬৬ কেজি", for: "both" },
  { id: "67", title: "৬৭ কেজি", for: "both" },
  { id: "68", title: "৬৮ কেজি", for: "both" },
  { id: "69", title: "৬৯ কেজি", for: "both" },
  { id: "70", title: "৭০ কেজি", for: "both" },
  { id: "71", title: "৭১ কেজি", for: "both" },
  { id: "72", title: "৭২ কেজি", for: "both" },
  { id: "73", title: "৭৩ কেজি", for: "both" },
  { id: "74", title: "৭৪ কেজি", for: "both" },
  { id: "75", title: "৭৫ কেজি", for: "both" },
  { id: "76", title: "৭৬ কেজি", for: "both" },
  { id: "77", title: "৭৭ কেজি", for: "both" },
  { id: "78", title: "৭৮ কেজি", for: "both" },
  { id: "79", title: "৭৯ কেজি", for: "both" },
  { id: "80", title: "৮০ কেজি", for: "both" },
  { id: "81", title: "৮১ কেজি", for: "both" },
  { id: "82", title: "৮২ কেজি", for: "both" },
  { id: "83", title: "৮৩ কেজি", for: "both" },
  { id: "84", title: "৮৪ কেজি", for: "both" },
  { id: "85", title: "৮৫ কেজি", for: "both" },
  { id: "86", title: "৮৬ কেজি", for: "both" },
  { id: "87", title: "৮৭ কেজি", for: "both" },
  { id: "88", title: "৮৮ কেজি", for: "both" },
  { id: "89", title: "৮৯ কেজি", for: "both" },
  { id: "90", title: "৯০ কেজি", for: "both" },
  { id: "91", title: "৯১ কেজি", for: "both" },
  { id: "92", title: "৯২ কেজি", for: "both" },
  { id: "93", title: "৯৩ কেজি", for: "both" },
  { id: "94", title: "৯৪ কেজি", for: "both" },
  { id: "95", title: "৯৫ কেজি", for: "both" },
  { id: "96", title: "৯৬ কেজি", for: "both" },
  { id: "97", title: "৯৭ কেজি", for: "both" },
  { id: "98", title: "৯৮ কেজি", for: "both" },
  { id: "99", title: "৯৯ কেজি", for: "both" },
  { id: "100", title: "১০০ কেজি", for: "both" },
  { id: "101", title: "১০১ কেজি", for: "both" },
  { id: "102", title: "১০২ কেজি", for: "both" },
  { id: "103", title: "১০৩ কেজি", for: "both" },
  { id: "104", title: "১০৪ কেজি", for: "both" },
  { id: "105", title: "১০৫ কেজি", for: "both" },
  { id: "106", title: "১০৬ কেজি", for: "both" },
  { id: "107", title: "১০৭ কেজি", for: "both" },
  { id: "108", title: "১০৮ কেজি", for: "both" },
  { id: "109", title: "১০৯ কেজি", for: "both" },
  { id: "110", title: "১১০ কেজি", for: "both" },
  { id: "111", title: "১১১ কেজি", for: "both" },
  { id: "112", title: "১১২ কেজি", for: "both" },
  { id: "113", title: "১১৩ কেজি", for: "both" },
  { id: "114", title: "১১৪ কেজি", for: "both" },
  { id: "115", title: "১১৫ কেজি", for: "both" },
  { id: "116", title: "১১৬ কেজি", for: "both" },
  { id: "117", title: "১১৭ কেজি", for: "both" },
  { id: "118", title: "১১৮ কেজি", for: "both" },
  { id: "119", title: "১১৯ কেজি", for: "both" },
  { id: "120", title: "১২০ কেজি", for: "both" },
  { id: "121", title: "১২0 কেজির বেশি", for: "both" },
];

export const siblingSerialOptions = [
  { id: "1st", title: "১ম" },
  { id: "2nd", title: "২য়" },
  { id: "3rd", title: "৩য়" },
  { id: "4th", title: "৪র্থ" },
  { id: "5th", title: "৫ম" },
  { id: "6th", title: "৬ষ্ঠ" },
  { id: "7th", title: "৭ম" },
  { id: "8th", title: "৮ম" },
  { id: "9th", title: "৯ম" },
  { id: "10th", title: "১০ম" },
];

export const yesNoOptions = [
  { id: "yes", title: "হ্যাঁ" },
  { id: "no", title: "না" },
];

export const visibilityOptions = [
  {
    id: "PUBLIC",
    title: "পাবলিক",
    description: "বায়োডাটা ওয়েবসাইটে পাবলিশ হবে এবং সকলে দেখতে পারবে",
  },
  {
    id: "PRIVATE",
    title: "প্রাইভেট",
    description:
      "বায়োডাটা গোপন থাকবে। ওয়েবসাইটে দেখা যাবে না, শুধু আপনি যাকে প্রস্তাব পাঠাবেন বা লিংক পাঠাবেন তিনি ছাড়া",
  },
];
