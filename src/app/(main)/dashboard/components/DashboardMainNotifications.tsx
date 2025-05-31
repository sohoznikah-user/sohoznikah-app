"use client";
import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { ReusableTable } from "@/components/shared/ReusableTable";
import {
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  useUpdateNotificationMutation,
} from "@/redux/features/admin/notificationApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const user = useAppSelector(selectCurrentUser);
  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });

  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(filters ? filters : {}),
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading, isError } = useGetAllNotificationsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

  const [viewData, { isLoading: isViewing }] = useUpdateNotificationMutation();

  const handleDeleteNotification = async () => {
    if (!selectedId) return;
    try {
      const res = await deleteNotification(selectedId).unwrap();
      if (res.success) {
        toast.success(res.message || "Notification deleted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete notification");
    } finally {
      handleReset();
    }
  };

  const handleViewNotification = async (id: any) => {
    if (!id) return;
    try {
      const res = await viewData({ id, updatedData: {} }).unwrap();
      if (res.success) {
        toast.success("নোটিফিকেশন পড়া হয়েছে");
      }
    } catch (error) {
      toast.error("নোটিফিকেশন পড়া হয়নি");
    }
  };

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  const handleReset = () => {
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setFilters({});
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "type", header: "টাইপ" },
    {
      accessorKey: "message",
      header: "বার্তা",
      cell: ({ row }) => (
        <div className="truncate max-w-[300px]">{row.original.message}</div>
      ),
    },
    {
      accessorKey: "isRead",
      header: "পড়া হয়েছে",
      cell: ({ row }) => (row.original.isRead ? "হ্যা" : "না"),
    },
    {
      accessorKey: "createdAt",
      header: "তারিখ",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formattedDate;
      },
    },
    {
      id: "view",
      header: "বায়োডাটা দেখুন",
      cell: ({ row }) => (
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleViewNotification(row?.original?.id);
            setSelectedData(row.original);
            setIsModalOpen("view");
          }}
        >
          View
        </button>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <EditDeleteButtons
          onDelete={() => {
            setSelectedId(row.original.id);
            setIsModalOpen("delete");
          }}
        />
      ),
    },
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
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <DeleteConfirmationModal
          open={isModalOpen === "delete"}
          onClose={() => handleReset()}
          onDelete={handleDeleteNotification}
          loading={isDeleting}
          itemName={`নোটিফিকেশন`}
        />

        <ReusableModal
          open={isModalOpen === "view"}
          onClose={() => handleReset()}
          title="নোটিফিকেশন বিস্তারিত"
          hideFooter
        >
          {selectedData && (
            <div className="space-y-2 flex flex-col gap-2">
              <p>
                <strong>Date:</strong>{" "}
                {format(new Date(selectedData?.createdAt), "PPpp")}
              </p>
              <p>
                <strong>Type:</strong> {selectedData?.type}
              </p>
              <p>
                <strong>Message:</strong> {selectedData?.message}
              </p>
            </div>
          )}
        </ReusableModal>
      </div>
    </div>
  );
}
