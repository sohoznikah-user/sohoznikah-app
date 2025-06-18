import { education, religiousEducation } from "@/lib/consts";
import { FilterState } from "@/redux/features/filter/filterSlice";
import { useState } from "react";
import { FilterAccordion } from "./FilterAccordian";

interface EducationfilterProps {
  handleCheckboxChange: (
    key: keyof FilterState,
    value: string,
    checked: boolean
  ) => void;
  filters: FilterState;
}

export const Educationfilter: React.FC<EducationfilterProps> = ({
  filters,
  handleCheckboxChange,
}) => {
  const [activeTab, setActiveTab] = useState<
    "education" | "religiousEducation"
  >("education");

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          className={`mr-[-1rem] rounded-lg py-2 px-2 z-10 w-full text-md cursor-pointer ${
            activeTab === "education"
              ? "text-white bg-[#E25A6F] z-10"
              : "text-black border border-gray-400 z-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("education");
          }}
        >
          শিক্ষা
        </button>
        <button
          className={`py-2 rounded-lg px-2 w-full text-md cursor-pointer ${
            activeTab === "religiousEducation"
              ? "text-white bg-[#E25A6F] z-10"
              : "text-black border border-gray-400 z-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("religiousEducation");
          }}
        >
          দ্বীনি শিক্ষা
        </button>
      </div>

      {activeTab === "education" && (
        <div className="space-y-3">
          <FilterAccordion
            value="শিক্ষার ধরণ:"
            title="শিক্ষার ধরণ:"
            contentType="checkbox"
            filterKey="education"
            options={education}
            selectedFilters={filters}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {activeTab === "religiousEducation" && (
        <div className="space-y-3">
          <FilterAccordion
            value="দ্বীনি যোগ্যতা"
            title="দ্বীনি যোগ্যতা"
            contentType="checkbox"
            filterKey="religiousEducation"
            options={religiousEducation}
            selectedFilters={filters}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}
    </div>
  );
};
