"use client";
import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { ReusableTable } from "@/components/shared/ReusableTable";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { biodataStatusOptions, biodataVisibilityOptions } from "@/lib/consts";
import {
  useDeleteBiodataMutation,
  useGetBiodatasByAdminQuery,
  useUpdateBiodataStatusMutation,
} from "@/redux/features/biodata/biodataApi";
import { useDebounced } from "@/redux/hooks";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminBiodataPage() {
  const router = useRouter();
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
  const [updatedData, setUpdatedData] = useState<any | null>({
    visibility: null,
    status: null,
  });

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const [deleteBiodata, { isLoading: isDeleting }] = useDeleteBiodataMutation();

  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(filters ? filters : {}),
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading, isError } = useGetBiodatasByAdminQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const [updateBiodataStatus, { isLoading: isUpdating }] =
    useUpdateBiodataStatusMutation();

  // set updated data
  useEffect(() => {
    if (selectedData) {
      setUpdatedData({
        status: selectedData.status,
        visibility: selectedData.visibility,
      });
    }
  }, [selectedData]);

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  const handleDeleteBiodata = async () => {
    try {
      const res = await deleteBiodata(selectedId).unwrap();
      if (res.success) {
        toast.success("বায়োডাটা সফলভাবে মুছে ফেলা হয়েছে");
      }
    } catch (error) {
      toast.error("বায়োডাটা মুছে ফেলা হয়নি");
    } finally {
      handleReset();
    }
  };

  const handleEditBiodata = async () => {
    try {
      const res = await updateBiodataStatus({
        id: selectedId,
        updatedData: updatedData,
      }).unwrap();
      if (res.success) {
        toast.success("বায়োডাটা সফলভাবে সম্পাদনা হয়েছে");
      }
    } catch (error) {
      toast.error("বায়োডাটা সম্পাদনা হয়নি");
    } finally {
      handleReset();
    }
  };

  const handleReset = () => {
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setFilters({});
  };

  const columns: ColumnDef<any>[] = [
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
      accessorKey: "biodataType",
      header: "টাইপ",
      cell: ({ row }) => {
        const biodataType = row.original.biodataType;

        return (
          <div className="truncate max-w-[300px]">
            {biodataType === "BRIDE" ? (
              <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                পাত্রী
              </Badge>
            ) : (
              <Badge variant="destructive">পাত্র</Badge>
            )}
          </div>
        );
      },
    },
    { accessorKey: "code", header: "বায়োডাটা কোড" },
    {
      accessorKey: "status",
      header: "স্ট্যাটাস",

      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div className=" flex items-center gap-2 justify-center">
            {status === "PENDING" ? (
              <Badge className="bg-yellow-500 text-white dark:bg-yellow-600">
                {status}
              </Badge>
            ) : status === "APPROVED" ? (
              <Badge className="bg-green-500 text-white dark:bg-green-600">
                {status}
              </Badge>
            ) : status === "REJECTED" ? (
              <Badge className="bg-red-500 text-white dark:bg-red-600">
                {status}
              </Badge>
            ) : status === "UPDATE_REQUESTED" ? (
              <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                {status}
              </Badge>
            ) : status === "DELETE_REQUESTED" ? (
              <Badge className="bg-red-500 text-white dark:bg-red-600">
                {status}
              </Badge>
            ) : (
              <Badge className="bg-red-500 text-white dark:bg-red-600">
                {status}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "visibility",
      header: "ভিজিবিলিটি",
      cell: ({ row }) => {
        const visibility = row.original.visibility;
        return (
          <div className="truncate max-w-[300px]">
            {visibility === "PUBLIC" ? (
              <Badge className="bg-green-500 text-white dark:bg-green-600">
                পাবলিক
              </Badge>
            ) : (
              <Badge variant="destructive">প্রাইভেট</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ইডিট বায়োডাটা",
      cell: ({ row }) => (
        <Link href={`/biodata-editor/${row.original.id}`}>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer">
            View
          </button>
        </Link>
      ),
    },
    {
      accessorKey: "biodatas?.id",
      header: "ভিউ বায়োডাটা",
      cell: ({ row }) => (
        <Link href={`/dashboard/biodata/${row.original.id}`}>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer">
            View
          </button>
        </Link>
      ),
    },

    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <EditDeleteButtons
          onEdit={() => {
            setSelectedId(row.original.id);
            setSelectedData(row.original);
            setIsModalOpen("edit");
          }}
          onDelete={() => {
            setSelectedId(row.original.id);
            setIsModalOpen("delete");
          }}
        />
      ),
    },
  ];

  return (
    <div className="min-h-[500px] flex justify-center items-center lg:p-5 mb-10">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC]  rounded-lg  md:shadow-lg py-6 lg:pt-10 md:pt-8 pt-5 ">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          বায়োডাটা
        </h1>

        <ReusableTable
          data={data?.data || []}
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
          onDelete={handleDeleteBiodata}
          loading={isDeleting}
          itemName={`বায়োডাটা`}
        />

        <ReusableModal
          open={isModalOpen === "edit"}
          onClose={() => handleReset()}
          onConfirm={() => handleEditBiodata()}
          title="বায়োডাটা সম্পাদনা"
          loading={isUpdating}
        >
          <form>
            <div className="space-y-2 flex flex-col gap-2">
              <div>
                <label htmlFor="userStatus">Biodata Status</label>
                <Select
                  value={updatedData?.status}
                  onValueChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      status: e,
                    })
                  }
                >
                  <SelectTrigger className="p-4 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                    <SelectValue placeholder="Biodata Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                    {biodataStatusOptions.map((x) => (
                      <SelectItem
                        key={x.id}
                        className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                        value={x.id}
                      >
                        {x.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="visibility">Biodata Visibility</label>
                <Select
                  value={updatedData?.visibility}
                  onValueChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      visibility: e,
                    })
                  }
                >
                  <SelectTrigger className="p-4 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                    <SelectValue placeholder="Biodata Visibility" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                    {biodataVisibilityOptions.map((x) => (
                      <SelectItem
                        key={x.id}
                        className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                        value={x.id}
                      >
                        {x.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </ReusableModal>
      </div>
    </div>
  );
}
