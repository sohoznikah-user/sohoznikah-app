import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterState } from "@/redux/features/filter/filterSlice";
import { useState } from "react";
import { FilterAccordion } from "./FilterAccordian";

interface PermanentAddressFilterProps {
  filterValue: {
    permanent_address_type?: "bangladesh" | "foreign";
    district?: string[];
    subdistrict?: string[];
    all_countries?: boolean;
  };
  onChange: (value: {
    permanent_address_type?: "bangladesh" | "foreign";
    district?: string[];
    subdistrict?: string[];
    all_countries?: boolean;
  }) => void;
  districtOptions: { id: string; title: string }[];
  subdistrictOptions: { id: string; title: string }[];
  handleCheckboxChange: (
    key: keyof FilterState,
    value: string,
    checked: boolean
  ) => void;
  filters: FilterState;
}

export const PermanentAddressFilter: React.FC<PermanentAddressFilterProps> = ({
  filters,
  filterValue,
  onChange,
  districtOptions,
  subdistrictOptions,
  handleCheckboxChange,
}) => {
  const [activeTab, setActiveTab] = useState<"bangladesh" | "foreign">(
    filterValue.permanent_address_type === "foreign" ? "foreign" : "bangladesh"
  );

  const handleAllCountriesToggle = (checked: boolean) => {
    onChange({
      permanent_address_type: checked ? "foreign" : undefined,
      district: [],
      subdistrict: [],
      all_countries: checked,
    });
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
              permanent_address_type: "bangladesh",
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
              permanent_address_type: "foreign",
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
            filterKey="permanentState"
            options={districtOptions}
            selectedFilters={filters}
            handleCheckboxChange={handleCheckboxChange}
          />

          <FilterAccordion
            value="উপজেলা"
            title="উপজেলা"
            contentType="checkbox"
            filterKey="permanentCity"
            options={subdistrictOptions}
            selectedFilters={filters}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {activeTab === "foreign" && (
        <div className="flex items-center justify-center space-x-2 mt-3">
          <Checkbox
            id="foreign"
            checked={filterValue.all_countries || false}
            onCheckedChange={(checked) =>
              handleAllCountriesToggle(Boolean(checked))
            }
            className="text-md font-semibold cursor-pointer"
          />
          <Label className="text-md cursor-pointer" htmlFor="foreign">
            সকল দেশ
          </Label>
        </div>
      )}
    </div>
  );
};
