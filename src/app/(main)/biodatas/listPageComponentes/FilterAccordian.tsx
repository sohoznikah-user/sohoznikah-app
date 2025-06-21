// src/app/(main)/biodatas/listPageComponentes/FilterAccordian.tsx

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ages, heights } from "@/lib/consts";
import { FilterState } from "@/redux/features/filter/filterSlice";

interface FilterAccordionProps {
  value: string;
  title: string;
  contentType: string;
  filterKey?: keyof FilterState | any;
  options?: { id: string; title: string }[];
  selectedFilters?: FilterState;
  handleRadioChange?: (key: keyof FilterState, value: string) => void;
  handleCheckboxChange?: (
    key: keyof FilterState,
    value: string,
    checked: boolean
  ) => void;
  range?: number[];
  onRangeChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const FilterAccordion = (props: FilterAccordionProps) => {
  const { value, title, contentType, className } = props;

  // Validation for radio
  if (
    contentType === "radio" &&
    (!props.filterKey ||
      !props.options ||
      !props.selectedFilters ||
      !props.handleRadioChange)
  ) {
    return null;
  }

  // Validation for checkbox
  if (
    contentType === "checkbox" &&
    (!props.filterKey ||
      !props.options ||
      !props.selectedFilters ||
      !props.handleCheckboxChange)
  ) {
    return null;
  }

  // Validation for slider
  if (
    contentType === "slider" &&
    (!props.filterKey ||
      !props.range ||
      !props.onRangeChange ||
      props.min === undefined ||
      props.max === undefined)
  ) {
    return null;
  }

  const renderRadioGroup = (
    key: keyof FilterState,
    options: { id: string; title: string }[],
    selectedFilters: FilterState,
    handleRadioChange: (key: keyof FilterState, value: string) => void
  ) => (
    <AccordionContent className="bg-white text-[#1f4f69] space-y-0.5 pt-1 pb-3 px-4 shadow-sm rounded-b-xl ">
      <RadioGroup
        className="text-md font-semibold"
        value={(selectedFilters[key] as string) || ""}
        onValueChange={(value) => handleRadioChange(key, value)}
      >
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem
              value={option.id}
              id={`${key}-${option.id}`}
              className="cursor-pointer"
            />
            <Label
              htmlFor={`${key}-${option.id}`}
              className="text-md cursor-pointer"
            >
              {option.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </AccordionContent>
  );

  const renderCheckboxGroup = (
    key: keyof FilterState,
    options: { id: string; title: string }[],
    selectedFilters: FilterState,
    handleCheckboxChange: (
      key: keyof FilterState,
      value: string,
      checked: boolean
    ) => void
  ) => (
    <AccordionContent className="bg-white text-[#1f4f69] space-y-2 pt-1 pb-3 px-4 shadow-sm rounded-b-xl">
      {options.map((option) => (
        <div
          key={`${key}-${option.id}`}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Checkbox
            id={`${key}-${option.id}`}
            checked={
              (selectedFilters[key] as string[])?.includes(option.id) || false
            }
            onCheckedChange={(checked) =>
              handleCheckboxChange(key, option.id, checked as boolean)
            }
            className="text-md font-semibold cursor-pointer"
          />
          <Label
            className="text-md cursor-pointer"
            htmlFor={`${key}-${option.id}`}
          >
            {option.title}
          </Label>
        </div>
      ))}
    </AccordionContent>
  );

  const renderSlider = (
    key: keyof FilterState,
    label: string,
    value: number[],
    onChange: (value: number[]) => void,
    min: number,
    max: number
  ) => (
    <AccordionContent className="bg-white text-[#1f4f69] space-y-0.5 pt-1 pb-3 px-4 shadow-sm rounded-b-xl">
      <div className="flex flex-col items-center space-x-2 space-y-1">
        <div className="flex justify-between w-full items-center space-x-2 mb-2">
          <div className="text-[#1f4f69] flex-1 overflow-hidden">
            {props.filterKey === "height"
              ? heights?.find((x) => Number(x.id) === value[0])?.title ||
                "৪ ফুটের কম"
              : props.filterKey === "age"
                ? ages?.find((x) => Number(x.id) === value[0])?.title ||
                  "১৮ বছর"
                : value[0]}
          </div>
          <div className="text-[#1f4f69] ">
            {props.filterKey === "height"
              ? heights?.find((x) => Number(x.id) === value[1])?.title ||
                "৭ ফুটের বেশি"
              : props.filterKey === "age"
                ? ages?.find((x) => Number(x.id) === value[1])?.title ||
                  "৭৫ বছর"
                : value[1]}
          </div>
        </div>
        <Slider
          value={value}
          onValueChange={(val) => onChange(val)}
          min={min}
          max={max}
          step={1}
          className="w-full mb-2 cursor-pointer"
        />
      </div>
    </AccordionContent>
  );

  return (
    <AccordionItem
      className={`${className ? className : "border border-gray-300"} rounded-xl px-4 max-h-60 overflow-y-auto`}
      value={value}
    >
      <AccordionTrigger className="hover:no-underline text-[#1f4f69] text-md cursor-pointer">
        {title}
      </AccordionTrigger>
      {contentType === "radio" &&
        props.filterKey &&
        props.options &&
        props.selectedFilters &&
        props.handleRadioChange &&
        renderRadioGroup(
          props.filterKey,
          props.options,
          props.selectedFilters,
          props.handleRadioChange
        )}
      {contentType === "checkbox" &&
        props.filterKey &&
        props.options &&
        props.selectedFilters &&
        props.handleCheckboxChange &&
        renderCheckboxGroup(
          props.filterKey,
          props.options,
          props.selectedFilters,
          props.handleCheckboxChange
        )}
      {contentType === "slider" &&
        props.filterKey &&
        props.range &&
        props.onRangeChange &&
        props.min !== undefined &&
        props.max !== undefined &&
        renderSlider(
          props.filterKey,
          title,
          props.range,
          props.onRangeChange,
          props.min,
          props.max
        )}
    </AccordionItem>
  );
};
