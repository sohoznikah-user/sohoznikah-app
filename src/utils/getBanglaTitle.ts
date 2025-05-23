import { districtsAndUpazilas } from "@/lib/districtsAndUpazilas";

// For flat array lists like maritalStatuses
export function getTitleById(
  list: { id: string; title: string }[],
  id: string | undefined | null
): string {
  const matched = list.find((item) => item.id === id);
  return matched ? matched.title : (id ?? "");
}

// For nested district/upazila structure
export function getDistrictTitle(value: string): string {
  console.log("getDistrictTitle value", value);
  const entry = Object.entries(districtsAndUpazilas).find(
    ([, district]) => district.value === value
  );
  return entry ? entry[0] : value;
}

export function getUpazilaTitle(upazilaValue: string): string {
  for (const district of Object.values(districtsAndUpazilas)) {
    const upazila = district.upazilas.find((u) => u.value === upazilaValue);
    if (upazila) {
      return upazila.title;
    }
  }
  return upazilaValue;
}
