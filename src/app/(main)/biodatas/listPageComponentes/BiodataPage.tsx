"use client";

import filterIcon from "@/assets/images/filter.svg";
import { useGetAllBiodatasQuery } from "@/redux/features/biodata/biodataApi";
import {
  filterInitialState,
  FilterState,
  resetFilters,
  setFilterData,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector, useDebounced } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import Image from "next/image";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      "mySpecialCategory",
      "myMaritalStatus",
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
      "myBiodataType",
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
      ["myAgeMin", "myAgeMax"],
      ["myHeightMin", "myHeightMax"],
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
        case "myAgeMin":
          filterData.myAgeMin = parseInt(value) || undefined;
          break;
        case "myAgeMax":
          filterData.myAgeMax = parseInt(value) || undefined;
          break;
        case "myHeightMin":
          filterData.myHeightMin = parseInt(value) || undefined;
          break;
        case "myHeightMax":
          filterData.myHeightMax = parseInt(value) || undefined;
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

  // console.log("API Query:", query); // Debug

  const handleSearchChange = (newSearchTerm: string) => {
    // console.log("New Search Term:", newSearchTerm); // Debug
    setSearchTerm(newSearchTerm);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
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

  // console.log("biodatas", biodatas);
  return (
    <div className="relative">
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-end items-center mb-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5  rounded-md border border-gray-300 cursor-pointer"
        >
          <Image src={filterIcon} alt="filter" width={70} height={20} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-5">
        {/* Filter Panel - Mobile */}
        <div
          className={`fixed inset-0 bg-black/20  z-40 lg:hidden transition-opacity duration-300 ${
            isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className={`absolute right-0 top-0 h-full md:w-96 w-full bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto pb-10 ${
              isFilterOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <BiodatasPageFilters
                onFilterChange={handleFilter}
                onReset={handleReset}
                filters={filters}
              />
            </div>
          </div>
        </div>

        {/* Filter Panel - Desktop */}
        <div className="hidden lg:block">
          <BiodatasPageFilters
            onFilterChange={handleFilter}
            onReset={handleReset}
            filters={filters}
          />
        </div>

        <div className="flex-grow max-w-7xl">
          <div className="flex justify-end items-center mb-6">
            <BiodatasPageSearchByBiodataNo
              onSearchChange={handleSearchChange}
              onReset={handleReset}
              initialSearchTerm={searchTerm}
            />
          </div>
          {isLoading ? (
            <div className="text-center py-4 flex justify-center items-center min-h-[300px]">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : biodatas && biodatas?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 md:gap-10 gap-5 mx-auto ">
              {biodatas?.data?.map((biodata) => (
                <BiodatasPageCard key={biodata.id} {...biodata} />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 min-h-[400px] text-red-500 flex justify-center items-center text-lg font-semibold">
              বায়োডাটা খুজে পাওয়া যায়নি
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiodataPage;
