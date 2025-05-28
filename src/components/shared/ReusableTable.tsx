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
  caption?: string;
  searchable?: boolean;
  filterable?: boolean;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  filterKey?: string;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (val: string) => void;
}

export function ReusableTable<T>({
  data = [],
  columns = [],
  meta = { page: 1, limit: 10, total: 0 },
  pagination = { page: 1, limit: 10, total: 0 },
  setPagination,
  enablePagination = false,
  searchable = false,
  caption,
  filterable = false,
  filterOptions,
  onFilterChange,
  onSearchChange,
  searchTerm,
}: ReusableTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");

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
    <div className=" p-5">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Search */}
        {searchable && onSearchChange && (
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-xs text-background"
          />
        )}

        {filterable && filterOptions?.length && onFilterChange && (
          <Select onValueChange={onFilterChange} defaultValue="">
            <SelectTrigger className="w-[160px] bg-foreground">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptions?.map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-foreground text-background shadow-sm overflow-x-auto">
        <Table>
          {caption && <caption className="text-left p-2">{caption}</caption>}
          <TableHeader className="bg-[#5B8EAA] text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white">
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
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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

      <div className="flex justify-between items-center gap-4 text-background mt-5">
        {/* Limit */}
        {enablePagination && pagination && setPagination && (
          <div className="flex items-center w-full gap-2">
            <span className="text-sm">Rows per page:</span>
            <Select
              value={String(pagination.limit)}
              onValueChange={(val) =>
                setPagination({ ...pagination, limit: Number(val), page: 1 })
              }
            >
              <SelectTrigger className="w-[80px] bg-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
