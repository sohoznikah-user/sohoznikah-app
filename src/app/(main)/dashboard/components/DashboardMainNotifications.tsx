"use client";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import { ReusableTable } from "@/components/shared/ReusableTable";
import {
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  useGetNotificationByIdQuery,
} from "@/redux/features/admin/notificationApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const user = useAppSelector(selectCurrentUser);
  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });

  // Query
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(filters ? filters : {}),
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading } = useGetAllNotificationsQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const { data: get } = useGetNotificationByIdQuery(undefined);
  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

  // Handle delete notification
  const handleDeleteNotification = async (id: string) => {
    try {
      const res = await deleteNotification(id).unwrap();
      if (res.success) {
        toast.success(res.message || "Notification deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error(error.data.message || "Failed to delete notification");
    }
  };

  // Handle filter change
  // const handleFilter = (key: string, value: string | undefined) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  // ✅ Update total only when data changes
  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "type",
      header: "টাইপ",
    },
    {
      accessorKey: "message",
      header: "বার্তা",
      cell: ({ row }) => (
        <div className="truncate max-w-[300px]">{row.original.message}</div>
      ),
    },
    {
      accessorKey: "isRead",
      header: "পড়া হয়েছে",
      cell: ({ row }) => (row.original.isRead ? "হ্যা" : "না"),
    },
    {
      accessorKey: "createdAt",
      header: "তারিখ",
      cell: ({ row }) => format(new Date(row.original.createdAt), "PPpp"),
    },
    {
      id: "view",
      header: "বায়োডাটা দেখুন",
      cell: ({ row }) => (
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`/dashboard/notification/${row.original.id}`);
            }}
          >
            View
          </button>
        </div>
      ),
    },
    ...(user.role === "SUPER_ADMIN"
      ? [
          {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => (
              <EditDeleteButtons
                onDelete={() => handleDeleteNotification(row.original.id)}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen p-4 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          নোটিফিকেশন
        </h1>

        <ReusableTable
          data={data?.data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          enablePagination
          // searchable
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* <ReusableTable
      data={data?.data}
      columns={columns}
      pagination={pagination}
      setPagination={setPagination}
      enablePagination
      searchable
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterKey={filters}
      onFilterChange={(value: string) => handleFilter("category", value)}
      filterable
      filterOptions={[
        { label: "All", value: "all" },
        { label: "Music", value: "music" },
        { label: "Tech", value: "tech" },
        { label: "Art", value: "art" },
      ]}
    /> */}
      </div>
    </div>
  );
}
