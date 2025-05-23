"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  biodataTypes,
  bloodGroups,
  education,
  familyBackgrounds,
  madhhabs,
  maritalStatuses,
  occupationsList,
  religiousEducation,
  religiousLifestyle,
  skinTones,
} from "@/lib/consts";
import { districtsAndUpazilas } from "@/lib/districtsAndUpazilas";
import {
  FilterState,
  resetFilters,
  setFilterData,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { searchingFilters } from "./biodataFilterOptions";
import { FilterAccordion } from "./FilterAccordian";
import { PermanentAddressFilter } from "./PermanentAddressFilter"; // Import the new component

interface BiodatasPageFiltersProps {
  onReset: () => void;
  onFilterChange: () => void;
  filters: FilterState;
}

export default function BiodatasPageFilters({
  onReset,
  onFilterChange,
  filters,
}: BiodatasPageFiltersProps) {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"searching" | "beingSearched">(
    "searching"
  );

  const handleRadioChange = (key: keyof FilterState, value: string) => {
    dispatch(setFilterData({ [key]: value }));
    onFilterChange();
  };

  const handleCheckboxChange = (
    key: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    const currentValues = Array.isArray(filters[key])
      ? [...(filters[key] as string[])]
      : [];
    let updatedValues: string[];
    if (checked) {
      updatedValues = [...currentValues, value];
    } else {
      updatedValues = currentValues.filter((item) => item !== value);
    }
    dispatch(setFilterData({ [key]: updatedValues }));
    onFilterChange();
  };

  const handleSliderChange = (
    key: "age" | "height" | "partnerAge" | "partnerHeight",
    value: [number, number]
  ) => {
    dispatch(
      setFilterData({
        [`${key}Min`]: value[0],
        [`${key}Max`]: value[1],
      })
    );
    onFilterChange();
  };

  const handleTabChange = (tab: "searching" | "beingSearched") => {
    setActiveTab(tab);
    dispatch(resetFilters());
  };

  // Prepare district and subdistrict options for PermanentAddressFilter
  const districtOptions = Object.entries(districtsAndUpazilas).map(
    ([districtName, district]) => ({
      id: district.value,
      title: districtName,
    })
  );

  const allSubdistricts = Object.values(districtsAndUpazilas).flatMap(
    (district) => district.upazilas
  );
  const subdistrictOptions = allSubdistricts.map((upazila) => ({
    id: upazila.value,
    title: upazila.title,
  }));

  const handlePermanentAddressChange = (updatedFilters: {
    permanent_address_type?: "bangladesh" | "foreign";
    district?: string[];
    subdistrict?: string[];
    all_countries?: boolean;
  }) => {
    dispatch(
      setFilterData({
        permanentLocation: updatedFilters.permanent_address_type,
        permanentState: updatedFilters.district,
        permanentCity: updatedFilters.subdistrict,
        allCountries: updatedFilters.all_countries,
      })
    );
    onFilterChange();
  };

  const permanentAddressValue = {
    permanent_address_type: filters.permanentLocation as
      | "bangladesh"
      | "foreign"
      | undefined,
    district: filters.permanentState || [],
    subdistrict: filters.permanentCity || [],
    all_countries: filters.allCountries || false,
  };

  return (
    <div className="w-72 bg-white ml-4 px-4 space-y-2">
      <div className="flex items-center justify-center text-center text-[#1f4f69] pb-2">
        <div className="pb-1 border-b border-[#1f4f69]">ফিল্টার করুন</div>
      </div>
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
      <form className="flex flex-col space-y-2">
        <Accordion type="multiple" className="flex flex-col space-y-2 mb-2">
          {activeTab === "searching" ? (
            <>
              <FilterAccordion
                value="বায়োডাটার ধরন"
                title="বায়োডাটার ধরন"
                contentType="radio"
                filterKey="biodataType"
                options={biodataTypes}
                selectedFilters={filters}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="বৈবাহিক অবস্থা"
                title="বৈবাহিক অবস্থা"
                contentType="checkbox"
                filterKey="maritalStatus"
                options={maritalStatuses.filter(
                  (item) =>
                    item.for === filters.biodataType || item.for === "both"
                )}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="বয়স"
                title="বয়স"
                contentType="slider"
                filterKey="age"
                range={[filters.ageMin, filters.ageMax]}
                onRangeChange={(val: [number, number]) =>
                  handleSliderChange("age", val)
                }
                min={18}
                max={80}
              />
              <FilterAccordion
                value="উচ্চতা"
                title="উচ্চতা"
                contentType="slider"
                filterKey="height"
                range={[filters.heightMin, filters.heightMax]}
                onRangeChange={(val: [number, number]) =>
                  handleSliderChange("height", val)
                }
                min={36}
                max={84}
              />
              <FilterAccordion
                value="গাত্রবর্ণ"
                title="গাত্রবর্ণ"
                contentType="checkbox"
                filterKey="skinTone"
                options={skinTones}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <AccordionItem
                className="border border-gray-300 rounded-xl px-4"
                value="স্থায়ী ঠিকানা"
              >
                <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
                  স্থায়ী ঠিকানা
                </AccordionTrigger>
                <AccordionContent className="bg-white text-[#1f4f69] space-y-4">
                  <PermanentAddressFilter
                    filterValue={permanentAddressValue}
                    onChange={handlePermanentAddressChange}
                    districtOptions={districtOptions}
                    subdistrictOptions={subdistrictOptions}
                  />
                </AccordionContent>
              </AccordionItem>
              <FilterAccordion
                value="বর্তমান ঠিকানা"
                title="বর্তমান ঠিকানা"
                contentType="checkbox"
                filterKey="currentState"
                options={districtOptions}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="ধর্মীয় লাইফস্টাইল"
                title="ধর্মীয় লাইফস্টাইল"
                contentType="checkbox"
                filterKey="religiousLifestyle"
                options={religiousLifestyle}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="পেশা"
                title="পেশা"
                contentType="checkbox"
                filterKey="occupation"
                options={occupationsList}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="শিক্ষা"
                title="শিক্ষা"
                contentType="checkbox"
                filterKey="education"
                options={education}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="দ্বীনি যোগ্যতা"
                title="দ্বীনি যোগ্যতা"
                contentType="checkbox"
                filterKey="religiousEducation"
                options={religiousEducation}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="পরিবারের আর্থসামাজিক অবস্থা"
                title="পরিবারের আর্থসামাজিক অবস্থা"
                contentType="checkbox"
                filterKey="familyStatus"
                options={familyBackgrounds}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="মাজহাব/মানহাজ"
                title="মাজহাব/মানহাজ"
                contentType="checkbox"
                filterKey="madhhab"
                options={madhhabs}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="রক্তের গ্রুপ"
                title="রক্তের গ্রুপ"
                contentType="checkbox"
                filterKey="bloodGroup"
                options={bloodGroups}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterAccordion
                value="বিশেষ ক্যাটাগরি"
                title="বিশেষ ক্যাটাগরি"
                contentType="checkbox"
                filterKey="specialCategory"
                options={searchingFilters.specialCategory}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
            </>
          ) : (
            <>
              <FilterAccordion
                value="বায়োডাটার ধরন"
                title="বায়োডাটার ধরন"
                contentType="radio"
                filterKey="partnerBiodataType"
                options={biodataTypes}
                selectedFilters={filters}
                handleRadioChange={handleRadioChange}
              />
              <FilterAccordion
                value="বিশেষ ক্যাটাগরি"
                title="বিশেষ ক্যাটাগরি"
                contentType="checkbox"
                filterKey="specialCategory"
                options={searchingFilters.specialCategory}
                selectedFilters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
            </>
          )}
        </Accordion>
        <button
          type="button"
          className="py-2 px-4 bg-[#e25a6f] text-white rounded-xl cursor-pointer"
          onClick={() => {
            dispatch(resetFilters());
            onReset();
          }}
        >
          ফিল্টার রিসেট
        </button>
      </form>
    </div>
  );
}
