import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterState } from "@/redux/features/filter/filterSlice";
import { useState } from "react";
import { FilterAccordion } from "./FilterAccordian";

interface PresentAddressFilterProps {
  filterValue: {
    present_address_type?: "bangladesh" | "foreign";
    district?: string[];
    subdistrict?: string[];
    all_countries?: boolean;
  };
  onChange: (value: {
    present_address_type?: "bangladesh" | "foreign";
    district?: string[];
    subdistrict?: string[];
    all_countries?: boolean;
  }) => void;
  districtOptions: { id: string; title: string }[];
  subdistrictOptions: { id: string; title: string; originalValue: string }[];
  handleCheckboxChange: (
    key: keyof FilterState,
    value: string,
    checked: boolean
  ) => void;
  filters: FilterState;
}

export const PresentAddressFilter: React.FC<PresentAddressFilterProps> = ({
  filters,
  filterValue,
  onChange,
  districtOptions,
  subdistrictOptions,
  handleCheckboxChange,
}) => {
  const [activeTab, setActiveTab] = useState<"bangladesh" | "foreign">(
    filterValue.present_address_type === "foreign" ? "foreign" : "bangladesh"
  );

  const handleAllCountriesToggle = (checked: boolean) => {
    onChange({
      present_address_type: checked ? "foreign" : undefined,
      district: [],
      subdistrict: [],
      all_countries: checked,
    });
  };

  const handleSubdistrictChange = (
    key: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    // Find the original value from the subdistrict options
    const subdistrictOption = subdistrictOptions.find(
      (option) => option.id === value
    );
    if (subdistrictOption) {
      handleCheckboxChange(key, subdistrictOption.originalValue, checked);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          className={`mr-[-1rem] rounded-lg py-2 px-2 z-10 w-full text-md cursor-pointer ${
            activeTab === "bangladesh"
              ? "text-white bg-[#E25A6F] z-10"
              : "text-black border border-gray-400 z-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("bangladesh");
            onChange({
              present_address_type: "bangladesh",
              all_countries: false,
            });
          }}
        >
          বাংলাদেশ
        </button>
        <button
          className={`py-2 rounded-lg px-2 w-full text-md cursor-pointer ${
            activeTab === "foreign"
              ? "text-white bg-[#E25A6F] z-10"
              : "text-black border border-gray-400 z-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("foreign");
            onChange({
              present_address_type: "foreign",
              district: [],
              subdistrict: [],
              all_countries: false,
            });
          }}
        >
          বিদেশ
        </button>
      </div>

      {activeTab === "bangladesh" && (
        <div className="space-y-3">
          <FilterAccordion
            value="জেলা"
            title="জেলা"
            contentType="checkbox"
            filterKey="currentState"
            options={districtOptions}
            selectedFilters={filters}
            handleCheckboxChange={handleCheckboxChange}
          />

          <AccordionItem
            className="border border-gray-300 rounded-xl text-md px-4"
            value="উপজেলা"
          >
            <AccordionTrigger className="hover:no-underline text-md text-[#1f4f69]">
              উপজেলা
            </AccordionTrigger>
            <AccordionContent className="bg-white text-[#1f4f69] space-y-2 pt-1 pb-3 px-4 shadow-sm rounded-b-xl">
              {subdistrictOptions.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-2">
                  প্রথমে জেলা নির্বাচন করুন
                </div>
              ) : (
                subdistrictOptions.map((option) => (
                  <div
                    key={`currentCity-${option.id}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      id={`currentCity-${option.id}`}
                      checked={
                        (filters.currentCity as string[])?.includes(
                          option.originalValue
                        ) || false
                      }
                      onCheckedChange={(checked) =>
                        handleSubdistrictChange(
                          "currentCity",
                          option.id,
                          checked as boolean
                        )
                      }
                      className="text-md font-semibold cursor-pointer"
                    />
                    <Label
                      className="text-md cursor-pointer"
                      htmlFor={`currentCity-${option.id}`}
                    >
                      {option.title}
                    </Label>
                  </div>
                ))
              )}
            </AccordionContent>
          </AccordionItem>
        </div>
      )}

      {activeTab === "foreign" && (
        <div className="flex items-center justify-center space-x-2 mt-3">
          <Checkbox
            id="foreign-present"
            checked={filterValue.all_countries || false}
            onCheckedChange={(checked) =>
              handleAllCountriesToggle(Boolean(checked))
            }
            className="text-md font-semibold cursor-pointer"
          />
          <Label className="text-md cursor-pointer" htmlFor="foreign-present">
            সকল দেশ
          </Label>
        </div>
      )}
    </div>
  );
};
