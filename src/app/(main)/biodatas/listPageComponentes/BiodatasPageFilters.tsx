"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { beingSearchedFilters, searchingFilters } from "./biodataFilterOptions";
import { FilterAccordion } from "./FilterAccordian";

interface BiodatasPageFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
  onReset: () => void;
}

export default function BiodatasPageFilters({
  onFilterChange,
  onReset,
}: BiodatasPageFiltersProps) {
  const [activeTab, setActiveTab] = useState<"searching" | "beingSearched">(
    "searching"
  );
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 80]);
  const [heightRange, setHeightRange] = useState<[number, number]>([36, 84]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | string[] | [number, number]>
  >({});

  // Radio change handler
  const handleRadioChange = (key: string, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Checkbox change handler
  const handleCheckboxChange = (
    key: string,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const currentValues = Array.isArray(prev[key])
        ? ([...prev[key]] as string[])
        : [];
      if (checked) {
        currentValues.push(value);
      } else {
        const index = currentValues.indexOf(value);
        if (index > -1) currentValues.splice(index, 1);
      }
      const newFilters = { ...prev, [key]: currentValues };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Slider change handler
  const handleSliderChange = (key: string, value: [number, number]) => {
    if (key === "age" || key === "partner_age") setAgeRange(value);
    if (key === "height" || key === "partner_height") setHeightRange(value);
    const newFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Tab change handler
  const handleTabChange = (tab: "searching" | "beingSearched") => {
    setActiveTab(tab);
    setSelectedFilters({});
    setAgeRange([18, 80]);
    setHeightRange([36, 84]);
    onFilterChange({});
  };

  return (
    <div className="w-72 bg-white ml-4 px-4 space-y-2">
      <div className="flex items-center justify-center text-center text-[#1f4f69] pb-2">
        <div className="pb-1 border-b border-[#1f4f69]">ফিল্টার করুন</div>
      </div>
      {/* Filter buttons */}
      <div className="flex justify-center mb-4">
        <button
          className={`mr-[-1rem] rounded-xl py-3 px-4 z-10 ${
            activeTab === "searching"
              ? "text-white bg-gradient-to-r from-[#e25a6f] to-[#016ca7]"
              : "text-[#989898] border border-[#989898]"
          }`}
          onClick={() => handleTabChange("searching")}
        >
          আমি খুঁজছি
        </button>
        <button
          className={`py-3 rounded-xl px-4 ${
            activeTab === "beingSearched"
              ? "text-white bg-gradient-to-r from-[#e25a6f] to-[#016ca7]"
              : "text-[#989898] border border-[#989898]"
          }`}
          onClick={() => handleTabChange("beingSearched")}
        >
          আমাকে খুঁজছে
        </button>
      </div>
      {/* Filter accordion */}
      <form className="flex flex-col space-y-2">
        <Accordion type="multiple" className="flex flex-col space-y-2 mb-2">
          {activeTab === "searching" ? (
            <>
              <FilterAccordion
                value="বায়োডাটার ধরন"
                title="বায়োডাটার ধরন"
                contentType="radio"
                filterKey="biodataType"
                options={searchingFilters.biodataType}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="বৈবাহিক অবস্থা"
                title="বৈবাহিক অবস্থা"
                contentType="radio"
                filterKey="maritalStatus"
                options={searchingFilters.maritalStatus}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="বয়স"
                title="বয়স"
                contentType="slider"
                filterKey="age"
                range={ageRange}
                onRangeChange={(val) => handleSliderChange("age", val)}
                min={18}
                max={80}
              />
              <FilterAccordion
                value="উচ্চতা"
                title="উচ্চতা"
                contentType="slider"
                filterKey="height"
                range={heightRange}
                onRangeChange={(val) => handleSliderChange("height", val)}
                min={36}
                max={84}
              />
              <FilterAccordion
                value="গাত্রবর্ণ"
                title="গাত্রবর্ণ"
                contentType="radio"
                filterKey="complexion"
                options={searchingFilters.complexion}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="স্থায়ী ঠিকানা"
                title="স্থায়ী ঠিকানা"
                contentType="radio"
                filterKey="permanentAddress"
                options={searchingFilters.permanentAddress}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="বর্তমান ঠিকানা"
                title="বর্তমান ঠিকানা"
                contentType="radio"
                filterKey="currentAddress"
                options={searchingFilters.currentAddress}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="ধর্মীয় লাইফস্টাইল"
                title="ধর্মীয় লাইফস্টাইল"
                contentType="radio"
                filterKey="religiousLifestyle"
                options={searchingFilters.religiousLifestyle}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="পেশা"
                title="পেশা"
                contentType="radio"
                filterKey="occupation"
                options={searchingFilters.occupation}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="শিক্ষা"
                title="শিক্ষা"
                contentType="radio"
                filterKey="education"
                options={searchingFilters.education}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="দ্বীনি যোগ্যতা"
                title="দ্বীনি যোগ্যতা"
                contentType="radio"
                filterKey="religiousEducation"
                options={searchingFilters.religiousEducation}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="পরিবারের আর্থসামাজিক অবস্থা"
                title="পরিবারের আর্থসামাজিক অবস্থা"
                contentType="radio"
                filterKey="familyStatus"
                options={searchingFilters.familyStatus}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="মাজহাব/মানহাজ"
                title="মাজহাব/মানহাজ"
                contentType="radio"
                filterKey="madhhab"
                options={searchingFilters.madhhab}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="রক্তের গ্রুপ"
                title="রক্তের গ্রুপ"
                contentType="radio"
                filterKey="bloodGroup"
                options={searchingFilters.bloodGroup}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="বিশেষ ক্যাটাগরি"
                title="বিশেষ ক্যাটাগরি"
                contentType="checkbox"
                filterKey="specialCategory"
                options={searchingFilters.specialCategory}
                selectedFilters={selectedFilters as Record<string, string[]>}
                handleCheckboxChange={handleCheckboxChange}
              />
            </>
          ) : (
            <>
              <FilterAccordion
                value="বায়োডাটার ধরন"
                title="বায়োডাটার ধরন"
                contentType="radio"
                filterKey="selfBiodataType"
                options={beingSearchedFilters.selfBiodataType}
                selectedFilters={selectedFilters as Record<string, string>}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="বিশেষ ক্যাটাগরি"
                title="বিশেষ ক্যাটাগরি"
                contentType="checkbox"
                filterKey="specialCategory"
                options={beingSearchedFilters.specialCategory}
                selectedFilters={selectedFilters as Record<string, string[]>}
                handleCheckboxChange={handleCheckboxChange}
              />
              <AccordionItem
                className="border border-gray-300 rounded-xl px-4 max-h-40 overflow-y-auto"
                value="যেমন জীবনসঙ্গী আশা করেন"
              >
                <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
                  যেমন জীবনসঙ্গী আশা করেন
                </AccordionTrigger>
                <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
                  <Accordion
                    type="multiple"
                    className="flex flex-col space-y-2"
                  >
                    <FilterAccordion
                      value="partner_biodataType"
                      title="জীবনসঙ্গীর বায়োডাটার ধরন"
                      contentType="radio"
                      filterKey="partner_biodataType"
                      options={searchingFilters.biodataType}
                      selectedFilters={
                        selectedFilters as Record<string, string>
                      }
                      handleRadioChange={handleRadioChange}
                    />
                    <FilterAccordion
                      value="partner_maritalStatus"
                      title="জীবনসঙ্গীর বৈবাহিক অবস্থা"
                      contentType="checkbox"
                      filterKey="partner_maritalStatus"
                      options={searchingFilters.maritalStatus}
                      selectedFilters={
                        selectedFilters as Record<string, string[]>
                      }
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <FilterAccordion
                      value="partner_age"
                      title="জীবনসঙ্গীর বয়স"
                      contentType="slider"
                      filterKey="partner_age"
                      range={ageRange}
                      onRangeChange={(val) =>
                        handleSliderChange("partner_age", val)
                      }
                      min={18}
                      max={80}
                    />
                    <FilterAccordion
                      value="partner_height"
                      title="জীবনসঙ্গীর উচ্চতা"
                      contentType="slider"
                      filterKey="partner_height"
                      range={heightRange}
                      onRangeChange={(val) =>
                        handleSliderChange("partner_height", val)
                      }
                      min={36}
                      max={84}
                    />
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
        <button
          type="button"
          className="py-2 px-4 bg-[#e25a6f] text-white rounded-xl"
          onClick={() => {
            setSelectedFilters({});
            setAgeRange([18, 80]);
            setHeightRange([36, 84]);
            onReset();
          }}
        >
          ফিল্টার রিসেট
        </button>
      </form>
    </div>
  );
}
