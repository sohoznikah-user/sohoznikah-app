import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface BaseFilterAccordionProps {
  value: string;
  title: string;
}

interface RadioFilterAccordionProps extends BaseFilterAccordionProps {
  contentType: "radio";
  filterKey: string;
  options: { value: string; label: string }[];
  selectedFilters: Record<string, string>;
  handleRadioChange: (key: string, value: string) => void;
}

interface CheckboxFilterAccordionProps extends BaseFilterAccordionProps {
  contentType: "checkbox";
  filterKey: string;
  options: { value: string; label: string }[];
  selectedFilters: Record<string, string[]>;
  handleCheckboxChange: (key: string, value: string, checked: boolean) => void;
}

interface SliderFilterAccordionProps extends BaseFilterAccordionProps {
  contentType: "slider";
  filterKey: string;
  range: [number, number];
  onRangeChange: (value: [number, number]) => void;
  min: number;
  max: number;
}

type FilterAccordionProps =
  | RadioFilterAccordionProps
  | CheckboxFilterAccordionProps
  | SliderFilterAccordionProps;

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

  // Default renderRadioGroup
  const renderRadioGroup = (
    key: string,
    options: { value: string; label: string }[],
    selectedFilters: Record<string, string>,
    handleRadioChange: (key: string, value: string) => void
  ) => (
    <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
      <RadioGroup
        value={selectedFilters[key] || ""}
        onValueChange={(value) => handleRadioChange(key, value)}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${key}-${option.value}`}
            />
            <Label htmlFor={`${key}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </AccordionContent>
  );

  // Default renderCheckboxGroup
  const renderCheckboxGroup = (
    key: string,
    options: { value: string; label: string }[],
    selectedFilters: Record<string, string[]>,
    handleCheckboxChange: (key: string, value: string, checked: boolean) => void
  ) => (
    <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`${key}-${option.value}`}
            checked={selectedFilters[key]?.includes(option.value) || false}
            onCheckedChange={(checked) =>
              handleCheckboxChange(key, option.value, checked as boolean)
            }
          />
          <Label htmlFor={`${key}-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </AccordionContent>
  );

  // Default renderSlider
  const renderSlider = (
    key: string,
    label: string,
    value: number[],
    onChange: (value: number[]) => void,
    min: number,
    max: number
  ) => (
    <AccordionContent className="bg-white text-[#1f4f69] space-y-1">
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
        renderRadioGroup(
          props.filterKey,
          props.options,
          props.selectedFilters,
          props.handleRadioChange
        )}
      {contentType === "checkbox" &&
        renderCheckboxGroup(
          props.filterKey,
          props.options,
          props.selectedFilters,
          props.handleCheckboxChange
        )}
      {contentType === "slider" &&
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
