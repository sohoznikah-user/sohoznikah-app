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
  const { value, title, contentType } = props;

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
    <AccordionContent className="bg-white text-[#1f4f69] space-y-0.5 pt-2 pb-4 px-4 shadow-sm rounded-b-xl">
      <RadioGroup
        value={(selectedFilters[key] as string) || ""}
        onValueChange={(value) => handleRadioChange(key, value)}
      >
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={`${key}-${option.id}`} />
            <Label htmlFor={`${key}-${option.id}`}>{option.title}</Label>
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
    <AccordionContent className="bg-white text-[#1f4f69] space-y-0.5 pt-2 pb-4 px-4 shadow-sm rounded-b-xl">
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={`${key}-${option.id}`}
            checked={
              (selectedFilters[key] as string[])?.includes(option.id) || false
            }
            onCheckedChange={(checked) =>
              handleCheckboxChange(key, option.id, checked as boolean)
            }
          />
          <Label htmlFor={`${key}-${option.id}`}>{option.title}</Label>
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
    <AccordionContent className="bg-white text-[#1f4f69] space-y-0.5 pt-2 pb-4 px-4 shadow-sm rounded-b-xl">
      <div className="flex items-center space-x-2">
        <div className="text-[#1f4f69]">{value[0]}</div>
        <Slider
          value={value}
          onValueChange={(val) => onChange(val)}
          min={min}
          max={max}
          step={1}
          className="w-full"
        />
        <div className="text-[#1f4f69]">{value[1]}</div>
      </div>
    </AccordionContent>
  );

  return (
    <AccordionItem
      className="border border-gray-300 rounded-xl px-4 max-h-40 overflow-y-auto"
      value={value}
    >
      <AccordionTrigger className="hover:no-underline text-[#1f4f69]">
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
