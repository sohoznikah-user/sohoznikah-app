import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}

export const PermanentAddressFilter: React.FC<PermanentAddressFilterProps> = ({
  filterValue,
  onChange,
  districtOptions,
  subdistrictOptions,
}) => {
  const handleStateChange = (states: string[]) => {
    onChange({
      permanent_address_type: "bangladesh",
      district: states,
      subdistrict: [], // Reset subdistricts when districts change
    });
  };

  const handleCityChange = (cities: string[]) => {
    onChange({
      ...filterValue,
      subdistrict: cities,
    });
  };

  return (
    <div>
      <Select
        value={filterValue.district?.join(",")}
        onValueChange={(value) => handleStateChange(value.split(","))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Districts" />
        </SelectTrigger>
        <SelectContent>
          {districtOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterValue.subdistrict?.join(",")}
        onValueChange={(value) => handleCityChange(value.split(","))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Subdistricts" />
        </SelectTrigger>
        <SelectContent>
          {subdistrictOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
