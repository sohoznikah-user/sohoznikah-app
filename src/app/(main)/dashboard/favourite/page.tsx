"use client";

import Loading from "@/app/loading";
import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { ReusableTable } from "@/components/shared/ReusableTable";
import {
  useDeleteFavouriteMutation,
  useGetAllFavouritesQuery,
} from "@/redux/features/admin/favouriteApi";
import { useCreateShortlistMutation } from "@/redux/features/admin/shortlistApi";
import { getDistrictTitle, getUpazilaTitle } from "@/utils/getBanglaTitle";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FavouritePage = () => {
  const [activeTab, setActiveTab] = useState("myRecords");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const router = useRouter();
  // Determine the type based on the active tab
  const type = activeTab === "myRecords" ? "sent" : "received";

  // Fetch data from the API
  const { data, isLoading, error } = useGetAllFavouritesQuery({
    type,
    page: pagination.page,
    limit: pagination.limit,
    searchTerm,
  });

  const [deleteFromFavourite, { isLoading: isDeleting }] =
    useDeleteFavouriteMutation();
  const [addToShortlist, { isLoading: isAdding }] =
    useCreateShortlistMutation();

  const handleDeleteFromFavourite = async () => {
    if (!selectedId) return;
    try {
      const res = await deleteFromFavourite(selectedId).unwrap();
      if (res.success) {
        toast.success("পছন্দের তালিকা থেকে ডিলেট হয়েছে");
      }
    } catch (error) {
      toast.error("পছন্দের তালিকা থেকে ডিলেট হয়নি");
    } finally {
      handleReset();
    }
  };

  const handleAddToShortlist = async () => {
    if (!selectedId) return;
    console.log(selectedId);
    const shortlistData = {
      biodataId: selectedId,
    };
    try {
      const res = await addToShortlist(shortlistData).unwrap();
      console.log("res", res);
      if (res.success) {
        toast.success("চুড়ান্ত তালিকায় রাখা হয়েছে");
      }
    } catch (error) {
      toast.error(error?.message || "চুড়ান্ত তালিকায় রাখা হয়নি");
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

  // Update total count when data is fetched
  useEffect(() => {
    if (data && data.meta) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data]);

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
        <div>
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
      ),
    },
    {
      accessorKey: "bioPresentAddress",
      header: "বর্তমান ঠিকানা",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row?.original?.bioPresentCity
            ? getUpazilaTitle(row?.original?.bioPresentCity)
            : "-"}{" "}
          {row?.original?.bioPresentState
            ? getDistrictTitle(row?.original?.bioPresentState)
            : "-"}
        </div>
      ),
    },
    {
      id: "view",
      header: "বায়োডাটা দেখুন",
      cell: ({ row }) => (
        <div>
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
    ...(activeTab === "myRecords"
      ? [
          {
            id: "isShortlisted",
            header: "চুড়ান্ত তালিকায় রাখুন",
            cell: ({ row }) => (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    if (row?.original?.isShortlisted) {
                      toast.error("এই বায়োডাটাটি চুড়ান্ত তালিকায় রয়েছে");
                      return;
                    }
                    setSelectedId(row?.original?.biodataId);
                    setIsModalOpen("shortlist");
                  }}
                >
                  <CircleCheck
                    className={`w-6 h-6 rounded-full cursor-pointer ${row?.original?.isShortlisted ? "bg-black text-white" : "bg-gray-400 text-white "}`}
                  />
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
        ]
      : []),
  ];

  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-pink-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          পছন্দের তালিকা
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("myRecords")}
            className={`px-6 py-2 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "myRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            আমি পছন্দের তালিকায় যাদের রেখেছি
          </button>
          <button
            onClick={() => setActiveTab("othersRecords")}
            className={`px-6 py-2 rounded-lg -ml-2 font-medium transition cursor-pointer ${
              activeTab === "othersRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            আমাকে যারা পছন্দের তালিকায় রেখেছে
          </button>
        </div>
        <ReusableTable
          data={data?.data || []} // Use API data
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          enablePagination
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <DeleteConfirmationModal
        open={isModalOpen === "delete"}
        onClose={() => handleReset()}
        onDelete={handleDeleteFromFavourite}
        loading={isDeleting}
        description="আপনি কি পছন্দের তালিকা থেকে এই বায়োডাটা মুছে ফেলে চান?
(যদি চূড়ান্ত তালিকায় রেখে থাকেন তাহলে সেখান থেকেও মুছে যাবে"
      />

      <ReusableModal
        open={isModalOpen === "private"}
        onClose={() => handleReset()}
        onConfirm={() => setIsModalOpen(null)}
        loading={isAdding}
        title="প্রাইভেট বায়োডাটা"
        description="এই বায়োডাটা বর্তমানে প্রাইভেট অবস্থায় রয়েছে। পাবলিক করা হলে পুনরায় বায়োডাটাটি দেখতে পারবেন"
        hideCancelButton
      />

      <ReusableModal
        open={isModalOpen === "shortlist"}
        onClose={() => handleReset()}
        onConfirm={handleAddToShortlist}
        loading={isAdding}
        title="চুড়ান্ত তালিকায় রাখুন"
        description="এই বায়োডাটা চুড়ান্ত তালিকায় রাখা হবে। আপনি কি চুড়ান্ত তালিকায় রাখতে চান?"
        confirmText="রাখুন"
      />
    </div>
  );
};

export default FavouritePage;
