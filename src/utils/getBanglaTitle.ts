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
  // console.log("getUpazilaTitle upazilaValue", upazilaValue);
  for (const district of Object.values(districtsAndUpazilas)) {
    const upazila = district.upazilas.find((u) => u.value === upazilaValue);
    if (upazila) {
      return upazila.title;
    }
  }
  return upazilaValue;
}

export function getBanglaDistrictAndUpazila(
  districtEn: string,
  upazilaEn: string
): string | null {
  // Find the matching district entry
  const matchedDistrict = Object.entries(districtsAndUpazilas).find(
    ([_, district]) => district?.value === districtEn?.toLowerCase()?.trim()
  );

  if (!matchedDistrict) return "--";

  const [districtBn, districtObj] = matchedDistrict;

  // Find the matching upazila inside the district
  const matchedUpazila = districtObj.upazilas.find(
    (u) => u.value === upazilaEn?.toLowerCase()?.trim()
  );

  if (!matchedUpazila) return "--";

  // Return both as comma-separated Bangla string
  return `${districtBn}, ${matchedUpazila.title}`;
}

export function getBanglaLocation(location: string): string | null {
  if (location === "bangladesh") return "বাংলাদেশ";
  if (location === "foreign") return "বিদেশ";
  if (location === "other") return "অন্যান্য";
}
