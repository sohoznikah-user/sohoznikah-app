"use client";
import DashboardTitle from "@/components/shared/DashboardTitle";
import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import NotificationCard from "@/components/shared/NotificationCard";
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
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const handleViewNotification = async (id: any, type: string) => {
    console.log(id, type);
    if (!id) return;
    try {
      const res = await viewData({ id, updatedData: {} }).unwrap();
      if (res.success) {
        toast.success("নোটিফিকেশন পড়া হয়েছে");
      }
    } catch (error) {
      toast.error("নোটিফিকেশন পড়া হয়নি");
    } finally {
      if (
        type === "TOKEN_CREATED" ||
        type === "TOKEN_APPROVED" ||
        type === "TOKEN_GIVEN"
      ) {
        router.push(`/dashboard/token`);
      } else if (
        type === "NEW_BIODATA" ||
        type === "UPDATE_BIODATA" ||
        type === "APPROVED_BIODATA"
      ) {
        router.push(`/dashboard/biodata`);
      } else if (type === "SHORTLIST_CREATED") {
        router.push(`/dashboard/shortlist`);
      } else if (type === "FAVOURITE_CREATED") {
        router.push(`/dashboard/favourite`);
      } else if (
        type === "NEW_PROPOSAL" ||
        type === "PROPOSAL_RESPONSE" ||
        type === "PROPOSAL_CANCELLED"
      ) {
        router.push(`/dashboard/proposal`);
      } else {
        router.push(`/dashboard/notification`);
      }
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
    ...(user && (user?.role === "SUPER_ADMIN" || user?.role === "ADMIN")
      ? [
          {
            accessorKey: "type",
            header: "টাইপ",
            cell: ({ row }) => {
              return <div className="text-[#1F4F69]">{row.original.type}</div>;
            },
          },
          {
            accessorKey: "adminMessage",
            header: "বার্তা",
            cell: ({ row }) => (
              <div className="truncate">{row.original.adminMessage}</div>
            ),
          },
        ]
      : [
          {
            accessorKey: "message",
            header: "বার্তা",
            cell: ({ row }) => (
              <div className="truncate">{row.original.message}</div>
            ),
          },
        ]),

    {
      accessorKey: "createdAt",
      header: "তারিখ",
      cell: ({ row }) => {
        return (
          <div className=" text-center">
            {format(new Date(row.original.createdAt), "dd MMM yyyy")}
          </div>
        );
      },
    },
    {
      id: "view",
      header: "বিস্তারিত",
      cell: ({ row }) => (
        <button
          className="bg-[#307FA7] text-white px-4 py-1 rounded hover:bg-[#307FA7]/80 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleViewNotification(row?.original?.id, row?.original?.type);
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
    <div className="min-h-[500px] w-full flex justify-center lg:p-5 items-center mb-10">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC]  rounded-lg  md:shadow-lg py-6 lg:pt-10 md:pt-8 pt-5 ">
        <DashboardTitle title="নোটিফিকেশন" />

        {user && user?.role === "USER" && (
          <div className="flex flex-col gap-4 md:hidden sm:block">
            {data?.data?.map((item: any) => (
              <NotificationCard
                key={item.id}
                title={item.type}
                message={item.message}
                date={item.createdAt}
                type={item.type}
                isRead={item.isRead}
                onDelete={() => {
                  setSelectedId(item.id);
                  setIsModalOpen("delete");
                }}
                onView={() => {
                  handleViewNotification(item.id, item.type);
                  setSelectedData(item);
                  setIsModalOpen("view");
                }}
              />
            ))}
          </div>
        )}

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

        {/* <ReusableModal
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
        </ReusableModal> */}
      </div>
    </div>
  );
}
