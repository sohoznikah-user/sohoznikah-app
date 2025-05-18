// src/app/(main)/biodatas/listPageComponentes/BiodataPage.tsx

"use client";
import { useGetAllBiodatasQuery } from "@/redux/features/biodata/biodataApi";
import { useDebounced } from "@/redux/hooks";
import { useCallback, useMemo, useState } from "react";
import BiodatasPageCard from "./BiodatasPageCard";
import BiodatasPageFilters from "./BiodatasPageFilters";
import BiodatasPageSearchByBiodataNo from "./SearchByBiodataNo";

const BiodataPage = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    sortOrder: "desc",
    sortBy: "createdAt",
  });
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  // Transform filters for API query
  const transformFiltersForAPI = useCallback((filters: Record<string, any>) => {
    const rangeKeys = ["age", "partner_age", "height", "partner_height"];
    return Object.entries(filters).reduce(
      (acc: Record<string, any>, [key, value]) => {
        if (
          rangeKeys.includes(key) &&
          Array.isArray(value) &&
          value.length === 2
        ) {
          acc[`${key}Min`] = value[0];
          acc[`${key}Max`] = value[1];
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
  }, []);

  // Query for API
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.pageSize,
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      ...(debouncedTerm && { searchTerm: debouncedTerm }),
      ...transformFiltersForAPI(filters),
    }),
    [pagination, debouncedTerm, filters, transformFiltersForAPI]
  );

  const { data: biodatas, isLoading } = useGetAllBiodatasQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  console.log("biodatas", biodatas);
  // Handle filter change
  const handleFilter = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setFilterActive(Object.keys(newFilters).length > 0);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Handle reset
  const handleReset = () => {
    setFilters({});
    setSearchTerm("");
    setFilterActive(false);
    setFileList([]);
    setModalActive(false);
    setSelectedData(null);
    setIsEdit(false);
    setPagination({
      page: 1,
      pageSize: 25,
      sortOrder: "desc",
      sortBy: "createdAt",
    });
  };

  return (
    <div className="flex justify-between container mx-auto gap-5">
      <BiodatasPageFilters
        onFilterChange={handleFilter}
        onReset={handleReset}
      />
      <div className="flex-grow max-w-7xl">
        <div className="flex justify-end items-center mb-6">
          <BiodatasPageSearchByBiodataNo
            onSearchChange={handleSearchChange}
            onReset={handleReset}
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
      {/* <BiodatasPageAppliedFilters /> */}
    </div>
  );
};

export default BiodataPage;
