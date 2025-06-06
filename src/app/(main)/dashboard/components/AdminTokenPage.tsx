"use client";
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
import { tokenTypeOptions } from "@/lib/consts";
import {
  useGetAllTokensQuery,
  useUpdateTokenMutation,
} from "@/redux/features/admin/tokenApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminTokenPage() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
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

  const { data, isLoading, isError } = useGetAllTokensQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [updateToken, { isLoading: isUpdating }] = useUpdateTokenMutation();

  const handleUpdateTokenType = async () => {
    const updatedData = {
      tokenStatus: "APPROVED",
      userId: selectedData?.userId,
    };
    try {
      const res = await updateToken({
        id: selectedId,
        updatedData,
      }).unwrap();
      if (res.success) {
        toast.success("টোকেন টাইপ আপডেট হয়েছে");
      }
    } catch (error) {
      toast.error("টোকেন টাইপ আপডেট হয়নি");
    } finally {
      handleReset();
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
    {
      accessorKey: "tokenType",
      header: "টাইপ",
      cell: ({ row }) => {
        const tokenType = row.original.tokenType;

        return (
          <div className="truncate max-w-[300px]">
            {tokenType === "BUNDLE1" ? (
              <Badge className="bg-cyan-500 text-white dark:bg-cyan-600">
                {tokenType}
              </Badge>
            ) : tokenType === "BUNDLE2" ? (
              <Badge className="bg-teal-500 text-white dark:bg-teal-600">
                {tokenType}
              </Badge>
            ) : tokenType === "BUNDLE3" ? (
              <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                {tokenType}
              </Badge>
            ) : (
              <Badge className="bg-red-500 text-white dark:bg-red-600">
                {tokenType}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "টোকেন সংখ্যা",
      cell: ({ row }) => (
        <div className="truncate max-w-[300px]">{row.original.quantity}</div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "মোট দাম",
      cell: ({ row }) => row.original.totalPrice,
    },
    {
      accessorKey: "phoneNumber",
      header: "ফোন নাম্বার",
      cell: ({ row }) => row.original.phoneNumber,
    },
    {
      accessorKey: "transactionId",
      header: "ট্রান্সাকশন আইডি",
      cell: ({ row }) => row.original.transactionId,
    },
    {
      accessorKey: "tokenStatus",
      header: "স্ট্যাটাস",
      cell: ({ row }) => {
        const biodataType = row.original.tokenStatus;

        return (
          <div className="truncate max-w-[300px]">
            {biodataType === "REQUESTED" ? (
              <Badge className="bg-yellow-500 text-white dark:bg-yellow-600">
                {biodataType}
              </Badge>
            ) : biodataType === "APPROVED" ? (
              <Badge className="bg-green-500 text-white dark:bg-green-600">
                {biodataType}
              </Badge>
            ) : (
              <Badge variant="destructive"> {biodataType}</Badge>
            )}
          </div>
        );
      },
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
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <EditDeleteButtons
          onView={() => {
            setSelectedId(row.original.id);
            setSelectedData(row.original);
            setIsModalOpen("view");
          }}
          onEdit={() => {
            setSelectedId(row.original.id);
            setSelectedData(row.original);
            setIsModalOpen("edit");
          }}
          //   onDelete={() => {
          //     setSelectedId(row.original.id);
          //     setIsModalOpen("delete");
          //   }}
        />
      ),
    },
  ];

  return (
    <div className="min-h-[500px] p-5 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-[#F5F4FC] rounded-lg shadow-lg py-6 pt-10">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          টোকেন
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

        <ReusableModal
          open={isModalOpen === "view"}
          onClose={() => handleReset()}
          title="বিস্তারিত"
          hideFooter
        >
          {selectedData && (
            <div className="space-y-2 flex flex-col gap-2">
              <p>
                <strong>Date:</strong>{" "}
                {format(new Date(selectedData?.createdAt), "PPpp")}
              </p>
              <p>
                <strong>User ID:</strong> {selectedData?.userId}
              </p>

              <p>
                <strong>User Name:</strong> {selectedData?.userName}
              </p>
              <p>
                <strong>User Email:</strong> {selectedData?.userEmail}
              </p>
              <p>
                <strong>Type:</strong> {selectedData?.tokenType}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedData?.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> {selectedData?.totalPrice}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedData?.phoneNumber}
              </p>
              <p>
                <strong>Transaction ID:</strong> {selectedData?.transactionId}
              </p>
              <p>
                <strong>Status:</strong> {selectedData?.tokenStatus}
              </p>
            </div>
          )}
        </ReusableModal>

        <ReusableModal
          open={isModalOpen === "edit"}
          onClose={() => handleReset()}
          onConfirm={() => handleUpdateTokenType()}
          title="টোকেন সম্পাদনা"
        >
          <div className="space-y-2 flex flex-col gap-2">
            <Select onValueChange={(e) => setTokenType(e)}>
              <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                <SelectValue placeholder="টোকেন টাইপ" />
              </SelectTrigger>
              <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                {tokenTypeOptions.map((x) => (
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
        </ReusableModal>
      </div>
    </div>
  );
}
