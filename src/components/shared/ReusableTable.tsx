// File: src/components/shared/ReusableTable.tsx
"use client";

import { PaginationControls } from "@/components/shared/PaginationControl";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface Meta {
  page: number;
  limit: number;
  total: number;
}

interface ReusableTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  meta?: Meta;
  pagination?: Meta;
  setPagination?: React.Dispatch<React.SetStateAction<Meta>>;
  enablePagination?: boolean;
  enableMobileView?: boolean;
  searchPlaceholder?: string;
  filterPlaceholder?: string;
  caption?: string;
  searchable?: boolean;
  filterable?: boolean;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  filterKey?: string;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (val: string) => void;
  loading?: boolean;
}

export function ReusableTable<T>({
  data = [],
  columns = [],
  meta = { page: 1, limit: 10, total: 0 },
  pagination = { page: 1, limit: 10, total: 0 },
  setPagination,
  enablePagination = false,
  enableMobileView = false,
  searchable = false,
  searchPlaceholder = "Search...",
  caption,
  filterPlaceholder = "Filter by",
  filterable = false,
  filterOptions,
  onFilterChange,
  onSearchChange,
  searchTerm,
  loading = false,
}: ReusableTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const user = useAppSelector(selectCurrentUser);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      ...(enablePagination && pagination
        ? {
            pagination: {
              pageIndex: (pagination.page || 1) - 1,
              pageSize: pagination.limit || 10,
            },
          }
        : {}),
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (!setPagination || !pagination) return;
      const updated =
        typeof updater === "function"
          ? updater({
              pageIndex: (pagination.page || 1) - 1,
              pageSize: pagination.limit || 10,
            })
          : updater;
      setPagination({
        ...pagination,
        page: updated.pageIndex + 1,
        limit: updated.pageSize,
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(enablePagination
      ? {
          pageCount: Math.ceil((meta?.total || 0) / (meta?.limit || 10)),
          manualPagination: true,
          getPaginationRowModel: getPaginationRowModel(),
        }
      : {}),
  });

  return (
    <div className=" md:p-5 lg:p-6 text-black">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-5">
        {/* Search */}
        {searchable && onSearchChange && (
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-[150px] bg-white text-black border-gray-300 border"
          />
        )}

        {filterable && filterOptions?.length && onFilterChange && (
          <Select onValueChange={onFilterChange} defaultValue="">
            <SelectTrigger className="w-[160px] bg-white border-gray-300 border text-sm">
              <SelectValue placeholder={filterPlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border-gray-300 border text-xs">
              <SelectItem
                value="all"
                className="hover:bg-gray-500 hover:text-white cursor-pointer"
              >
                ALL
              </SelectItem>
              {filterOptions?.map((option) => (
                <SelectItem
                  key={option.label}
                  value={option.value}
                  className="hover:bg-gray-500 hover:text-white cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className={`${loading ? "opacity-50" : ""}`}>
        {/* Table for desktop */}
        <div className="overflow-x-auto hidden sm:block">
          <Table>
            {caption && <caption className="text-left p-2">{caption}</caption>}
            <TableHeader className=" rounded-full border-none text-[#333333] bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent cursor-default rounded-full"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center font-semibold text-md border-b-0"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={
                      // index % 2 === 0
                      //   ? "bg-white hover:bg-gradient-to-r hover:from-blue-200 hover:to-pink-300"
                      //   : "bg-gradient-to-r from-blue-100 to-pink-100 hover:bg-gradient-to-r hover:from-blue-200 hover:to-pink-300"
                      " hover:bg-[#E8E8E8] border-none "
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Cards for mobile */}
        {(user?.role === "SUPER_ADMIN" ||
          user?.role === "ADMIN" ||
          enableMobileView) && (
          <div className="block sm:hidden">
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  className="bg-[#F5F4FC] rounded-lg shadow p-4 mb-4"
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      className="mb-2 flex gap-2 justify-start items-center flex-wrap"
                    >
                      <span className="font-semibold">
                        {cell.column.columnDef.header as string}:
                      </span>
                      <span className="ml-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center">No results.</div>
            )}
          </div>
        )}
      </div>

      <div
        className={`flex justify-between items-start gap-4  mt-5 text-black ${
          loading ? "opacity-50" : ""
        }`}
      >
        {/* Limit */}
        {enablePagination && pagination && setPagination && (
          <div className="flex flex-col justify-center items-start w-full  text-black">
            <div className="flex items-center w-full gap-2 text-black">
              <span className="text-sm w-28">Rows per page:</span>

              <Select
                value={String(pagination.limit)}
                onValueChange={(val) =>
                  setPagination({ ...pagination, limit: Number(val), page: 1 })
                }
              >
                <SelectTrigger className="w-[80px] bg-white text-black border-gray-300 border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border-gray-300 border">
                  {[10, 20, 50, 100].map((n) => (
                    <SelectItem
                      key={n}
                      value={String(n)}
                      className="hover:bg-gray-500 hover:text-white text-sm cursor-pointer"
                    >
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm w-28">Total: {meta?.total}</div>
          </div>
        )}

        {/* Pagination */}
        {enablePagination && meta && pagination && setPagination && (
          <PaginationControls
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </div>
    </div>
  );
}
