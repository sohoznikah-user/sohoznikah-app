"use client";

import DashboardTitle from "@/components/shared/DashboardTitle";
import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import ReusableMobileCard from "@/components/shared/ReusableMobileCard";
import { ReusableTable } from "@/components/shared/ReusableTable";
import {
  useDeleteShortlistMutation,
  useGetAllShortlistsQuery,
} from "@/redux/features/admin/shortlistApi";
import { getDistrictTitle, getUpazilaTitle } from "@/utils/getBanglaTitle";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// PaymentTracker component
const ShortlistPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const router = useRouter();

  const { data: shortlistData, isLoading } = useGetAllShortlistsQuery({
    page: pagination.page,
    limit: pagination.limit,
    searchTerm: searchTerm,
  });

  const [deleteShortlist, { isLoading: isDeleting }] =
    useDeleteShortlistMutation();

  const handleDeleteFromShortlist = async () => {
    try {
      const res = await deleteShortlist(selectedId).unwrap();
      if (res.success) {
        toast.success("চুড়ান্ত তালিকা থেকে ডিলেট হয়েছে");
      }
    } catch (error) {
      toast.error(error?.message || "চুড়ান্ত তালিকা থেকে ডিলেট হয়নি");
    } finally {
      handleReset();
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
    });
  };

  // Define columns for the table
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
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
      accessorKey: "bioNo",
      header: "বায়োডাটা নং",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row?.original?.bioNo}{" "}
          {row?.original.bioVisibility === "PRIVATE" && (
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">
              প্রাইভেট
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "bioPermanentAddress",
      header: "স্থায়ী ঠিকানা",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row?.original?.bioPermanentCity
            ? getUpazilaTitle(row?.original?.bioPermanentCity)
            : "-"}
          {", "}
          {row?.original?.bioPermanentState
            ? getDistrictTitle(row?.original?.bioPermanentState)
            : "-"}
        </div>
      ), // Map to API field
    },
    {
      accessorKey: "bioPresentAddress",
      header: "বর্তমান ঠিকানা",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row?.original?.bioPresentCity
            ? getUpazilaTitle(row?.original?.bioPresentCity)
            : "-"}
          {", "}
          {row?.original?.bioPresentState
            ? getDistrictTitle(row?.original?.bioPresentState)
            : "-"}
        </div>
      ), // Map to API field
    },
    {
      id: "view",
      header: "বায়োডাটা দেখুন",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
            onClick={() => {
              row?.original.bioVisibility === "PRIVATE"
                ? setIsModalOpen("private")
                : router.push(`/biodatas/${row?.original?.biodataId}`);
            }}
          >
            View
          </button>
        </div>
      ),
    },
    {
      id: "action", // Note: "viewCotact" seems like a typo; should be "delete"?
      header: "ডিলেট করুন",
      cell: ({ row }) => (
        <div>
          <EditDeleteButtons
            onDelete={() => {
              setSelectedId(row.original.id);
              setIsModalOpen("delete");
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[500px] flex justify-center items-center lg:p-5 mb-10">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC]  rounded-lg  md:shadow-lg py-6 lg:pt-10 md:pt-8 pt-5 ">
        <DashboardTitle title="চুড়ান্ত তালিকা" />

        {/* mobile view */}
        <div className="flex flex-col gap-4 md:hidden sm:block">
          {shortlistData?.data?.map((item: any) => (
            <ReusableMobileCard
              key={item.id}
              biodataNo={item.bioNo}
              permanentAddress={`${
                item.bioPermanentCity
                  ? getUpazilaTitle(item.bioPermanentCity)
                  : "-"
              }, ${item.bioPermanentState ? getDistrictTitle(item.bioPermanentState) : "-"} `}
              date={item.createdAt}
              isShortlisted={item.isShortlisted}
              visibility={item.bioVisibility}
              onDelete={() => {
                setSelectedId(item.id);
                setIsModalOpen("delete");
              }}
              onView={() => {
                item.bioVisibility === "PRIVATE"
                  ? setIsModalOpen("private")
                  : router.push(`/biodatas/${item.biodataId}`);
              }}
            />
          ))}
        </div>

        {/* desktop & tablet view */}
        <ReusableTable
          data={shortlistData?.data || []}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          enablePagination
          // searchable
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <DeleteConfirmationModal
        open={isModalOpen === "delete"}
        onClose={() => setIsModalOpen(null)}
        onDelete={handleDeleteFromShortlist}
        loading={isDeleting}
        description="আপনি কি পছন্দের তালিকা থেকে এই বায়োডাটা মুছে ফেলে চান?
(যদি চূড়ান্ত তালিকায় রেখে থাকেন তাহলে সেখান থেকেও মুছে যাবে"
      />
    </div>
  );
};

export default ShortlistPage;
