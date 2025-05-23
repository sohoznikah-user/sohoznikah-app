"use client";

import { useGetAllBiodatasQuery } from "@/redux/features/biodata/biodataApi";
import {
  filterInitialState,
  FilterState,
  resetFilters,
  setFilterData,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector, useDebounced } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BiodatasPageCard from "./BiodatasPageCard";
import BiodatasPageFilters from "./BiodatasPageFilters";
import BiodatasPageSearchByBiodataNo from "./SearchByBiodataNo";

const BiodataPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filter);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
    sortOrder: "desc",
    sortBy: "createdAt",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  // Transform filters for API query
  const transformFiltersForAPI = (filters: typeof filterInitialState) => {
    const arrayKeys = [
      "skinTone",
      "occupation",
      "education",
      "religiousEducation",
      "familyStatus",
      "bloodGroup",
      "specialCategory",
      "partnerMaritalStatus",
      "madhhab",

      "permanentState",
      "permanentCity",
      "currentState",
      "currentCity",
      "religiousLifestyle",
      "maritalStatus",
    ] as const;

    const stringKeys = [
      "biodataType",
      "partnerBiodataType",
      "permanentLocation",
      "currentLocation",
    ] as const;

    // 1) start with all your array & string filters
    const acc: Record<string, any> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (
        arrayKeys.includes(key as any) &&
        Array.isArray(value) &&
        value.length > 0
      ) {
        acc[key] = (value as string[]).join(",");
      } else if (
        stringKeys.includes(key as any) &&
        typeof value === "string" &&
        value.trim() !== ""
      ) {
        acc[key] = value;
      }
    });

    // 2) now handle all your min/max ranges in one go
    const rangePairs: Array<[keyof typeof filters, keyof typeof filters]> = [
      ["ageMin", "ageMax"],
      ["heightMin", "heightMax"],
      ["partnerAgeMin", "partnerAgeMax"],
      ["partnerHeightMin", "partnerHeightMax"],
    ];

    rangePairs.forEach(([minKey, maxKey]) => {
      const minVal = filters[minKey];
      const maxVal = filters[maxKey];
      // if _either_ end is different from the initial state, send both
      if (
        (typeof minVal === "number" && minVal !== filterInitialState[minKey]) ||
        (typeof maxVal === "number" && maxVal !== filterInitialState[maxKey])
      ) {
        acc[minKey] = minVal;
        acc[maxKey] = maxVal;
      }
    });

    return acc;
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    }
    const apiFilters = transformFiltersForAPI(filters);
    Object.entries(apiFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value.toString());
      }
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, searchTerm, pathname, router]);

  // Query for API
  const query = {
    page: pagination.page,
    limit: pagination.pageSize,
    sortBy: pagination.sortBy,
    sortOrder: pagination.sortOrder,
    ...(debouncedTerm && { searchTerm: debouncedTerm }),
    ...transformFiltersForAPI(filters),
  };

  const { data: biodatas, isLoading } = useGetAllBiodatasQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  // Parse URL query parameters and initialize Redux state (inspired by your snippet)
  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams.toString());
    const filterData: Partial<FilterState> = {};

    queryParams.forEach((value, key) => {
      switch (key) {
        // ARRAY‐TYPE FILTERS: split the comma string back into an array
        case "occupation":
        case "education":
        case "religiousEducation":
        case "familyStatus":
        case "bloodGroup":
        case "specialCategory":
        case "partnerMaritalStatus":
        case "madhhab":
        case "maritalStatus":
        case "skinTone":
        case "currentState":
        case "permanentState":
        case "permanentDistrict":
        case "currentDistrict":
        case "religiousLifestyle":
          filterData[key] = value.split(",").filter((v) => v !== "");
          break;

        // STRING‐TYPE FILTERS: assign directly

        case "biodataType":
        case "partnerBiodataType":
          filterData[key] = value;
          break;

        // RANGE FILTERS: parse numbers (you already avoid default‐only logic in transformFiltersForAPI)
        case "ageMin":
          filterData.ageMin = parseInt(value) || undefined;
          break;
        case "ageMax":
          filterData.ageMax = parseInt(value) || undefined;
          break;
        case "heightMin":
          filterData.heightMin = parseInt(value) || undefined;
          break;
        case "heightMax":
          filterData.heightMax = parseInt(value) || undefined;
          break;
        case "partnerAgeMin":
          filterData.partnerAgeMin = parseInt(value) || undefined;
          break;
        case "partnerAgeMax":
          filterData.partnerAgeMax = parseInt(value) || undefined;
          break;
        case "partnerHeightMin":
          filterData.partnerHeightMin = parseInt(value) || undefined;
          break;
        case "partnerHeightMax":
          filterData.partnerHeightMax = parseInt(value) || undefined;
          break;

        // SEARCH‐TERM
        case "searchTerm":
          // handled elsewhere via setSearchTerm(...)
          break;

        default:
          break;
      }
    });

    if (Object.keys(filterData).length > 0) {
      console.log("Initializing Filters from URL:", filterData);
      dispatch(setFilterData(filterData));
    }
  }, [dispatch, searchParams]);

  console.log("API Query:", query); // Debug

  const handleSearchChange = (newSearchTerm: string) => {
    console.log("New Search Term:", newSearchTerm); // Debug
    setSearchTerm(newSearchTerm);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
    console.log("Resetting Filters and Search Term"); // Debug
    dispatch(resetFilters());
    setSearchTerm("");
    setPagination({
      page: 1,
      pageSize: 15,
      sortOrder: "desc",
      sortBy: "createdAt",
    });
  };

  const handleFilter = () => {
    // Reset to first page when filters change
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="flex justify-between  gap-5">
      <BiodatasPageFilters
        onFilterChange={handleFilter}
        onReset={handleReset}
        filters={filters}
      />
      <div className="flex-grow max-w-7xl">
        <div className="flex justify-end items-center mb-6">
          <BiodatasPageSearchByBiodataNo
            onSearchChange={handleSearchChange}
            onReset={handleReset}
            initialSearchTerm={searchTerm}
          />
        </div>
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : biodatas && biodatas.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodatas?.data?.map((biodata) => (
              <BiodatasPageCard key={biodata.id} {...biodata} />
            ))}
          </div>
        ) : (
          <div className="text-center py-4">No biodatas found</div>
        )}
      </div>
    </div>
  );
};

export default BiodataPage;
