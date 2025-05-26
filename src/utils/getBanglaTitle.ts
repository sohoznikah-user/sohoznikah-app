import { districtsAndUpazilas } from "@/lib/districtsAndUpazilas";

// For flat array lists like maritalStatuses
export function getTitleById(
  list: { id: string; title: string }[],
  id: string | string[] | undefined | null
): string {
  if (!id) return "";

  // Handle array of IDs
  if (Array.isArray(id)) {
    const matchedTitles = id
      .map((singleId) => list.find((item) => item.id === singleId)?.title)
      .filter(Boolean); // remove undefined
    return matchedTitles.join(", ");
  }

  // Handle single ID
  const matched = list.find((item) => item.id === id);
  return matched ? matched.title : id;
}

// For nested district/upazila structure
export function getDistrictTitle(value: string): string {
  // console.log("getDistrictTitle value", value);
  const entry = Object.entries(districtsAndUpazilas).find(
    ([, district]) => district.value === value
  );
  // console.log("getDistrictTitle entry", entry);
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
