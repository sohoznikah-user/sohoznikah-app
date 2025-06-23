"use client";
import { DeleteConfirmationModal } from "@/components/shared/DeleteConfirmationModal";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { ReusableTable } from "@/components/shared/ReusableTable";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emailVerificationOptions, userStatusOptions } from "@/lib/consts";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGiveTokenMutation,
  useUpdateUserMutation,
} from "@/redux/features/admin/userApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
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
  const [tokenValue, setTokenValue] = useState("");

  const [updatedData, setUpdatedData] = useState<any | null>({
    emailConfirmed: null,
    status: null,
    token: null,
    biodataStatus: null,
  });

  const user = useAppSelector(selectCurrentUser);
  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "updatedAt",
      sortOrder: "asc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(filters ? filters : {}),
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading, isError } = useGetAllUsersQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [giveToken, { isLoading: isGivingToken }] = useGiveTokenMutation();

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // set updated data
  useEffect(() => {
    if (selectedData) {
      setUpdatedData({
        emailConfirmed: selectedData?.emailConfirmed
          ? "VERIFIED"
          : "UNVERIFIED",
        status: selectedData?.status,
      });
    }
  }, [selectedData]);

  // edit user
  const handleEditUser = async () => {
    const updatedUserData = {
      emailConfirmed: updatedData?.emailConfirmed === "VERIFIED" ? true : false,
      status: updatedData?.status,
      token: updatedData?.token ? Number(updatedData?.token) : null,
      biodataVisibility: updatedData?.biodataStatus
        ? updatedData?.biodataStatus
        : null,
    };

    try {
      const res = await updateUser({
        id: selectedId,
        updatedData: updatedUserData,
      }).unwrap();
      if (res.success) {
        toast.success("ইউজার সফলভাবে সম্পাদনা হয়েছে");
      }
    } catch (error) {
      toast.error("ইউজার সম্পাদনা হয়নি");
    } finally {
      handleReset();
    }
  };

  // give token
  const handleGiveToken = async () => {
    if (!selectedId) {
      toast.error("ইউজার নির্বাচন করুন");
      return;
    }
    try {
      const res = await giveToken({
        id: selectedId,
        token: { token: Number(tokenValue) },
      }).unwrap();
      if (res.success) {
        toast.success("টোকেন দেওয়া হয়েছে");
      }
    } catch (error) {
      toast.error("টোকেন দেওয়া হয়নি");
    } finally {
      handleReset();
    }
  };

  // delete biodata
  const handleDeleteBiodata = async () => {
    try {
      const res = await deleteUser(selectedId).unwrap();
      if (res.success) {
        toast.success(res?.message || "বায়োডাটা সফলভাবে মুছে ফেলা হয়েছে");
      }
    } catch (error) {
      toast.error(error.message || "বায়োডাটা মুছে ফেলা হয়নি");
    } finally {
      handleReset();
    }
  };

  // reset
  const handleReset = () => {
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setTokenValue("");
    setFilters({});
    setUpdatedData({
      emailConfirmed: "",
      status: "",
      token: "",
      biodataStatus: "",
    });
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "email",
      header: "ইমেইল",
      cell: ({ row }) => {
        const email = row.original.email;
        return (
          <div className="truncate md:max-w-[80px] w-full">{email || "-"}</div>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "ফোন নম্বর",
      cell: ({ row }) => {
        const phoneNumber = row.original.phoneNumber;
        return (
          <div className="truncate md:max-w-[80px] w-full">
            {phoneNumber || "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "emailConfirmed",
      header: "ইমেইল সনাক্ত",
      cell: ({ row }) => {
        const emailConfirmed = row.original.emailConfirmed;

        return (
          <div className="truncate max-w-[300px]">
            {emailConfirmed === true ? (
              <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                সনাক্ত
              </Badge>
            ) : (
              <Badge variant="destructive">নন সনাক্ত</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "code",
      header: "বায়োডাটা কোড",
      cell: ({ row }) => {
        const code = row?.original?.biodatas?.code;
        return <div className="truncate max-w-[300px]">{code || "-"}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "ইউজার স্ট্যাটাস",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div className=" flex items-center gap-2 justify-center">
            {status === "PENDING" ? (
              <Badge className="bg-yellow-500 text-white dark:bg-yellow-600">
                {status}
              </Badge>
            ) : status === "ACTIVE" ? (
              <Badge className="bg-green-500 text-white dark:bg-green-600">
                {status}
              </Badge>
            ) : status === "BLOCKED" ? (
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
      accessorKey: "token",
      header: "টোকেন",
      cell: ({ row }) => {
        const token = row?.original?.token;
        return <div className="truncate max-w-[300px]">{token || 0}</div>;
      },
    },
    {
      accessorKey: "visibility",
      header: "বায়োডাটা স্ট্যাটাস",
      cell: ({ row }) => {
        const visibility = row.original.biodatas?.visibility;
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
      accessorKey: "biodatas?.id",
      header: "ভিউ বায়োডাটা",
      cell: ({ row }) => (
        <Link href={`/dashboard/biodata/${row.original.biodatas?.id}`}>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer">
            View
          </button>
        </Link>
      ),
    },
    {
      accessorKey: "editBiodata",
      header: "ইডিট বায়োডাটা",
      cell: ({ row }) => (
        <Link href={`/biodata-editor/${row.original.biodatas?.id}`}>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer">
            Edit
          </button>
        </Link>
      ),
    },
    {
      accessorKey: "giveToken",
      header: "টোকেন দিন",
      cell: ({ row }) => (
        <button
          className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => {
            setSelectedId(row.original.id);
            setIsModalOpen("giveToken");
          }}
        >
          Give Token
        </button>
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
    <div className="min-h-screen flex justify-center items-center lg:p-5 mb-10">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC]  rounded-lg  md:shadow-lg py-6 lg:pt-10 md:pt-8 pt-5 ">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          ইউজার তালিকা
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

        {/* delete biodata */}
        <DeleteConfirmationModal
          open={isModalOpen === "delete"}
          onClose={() => handleReset()}
          onDelete={handleDeleteBiodata}
          loading={isDeleting}
          itemName={`ইউজার`}
        />

        {/* give token */}
        <ReusableModal
          open={isModalOpen === "giveToken"}
          onClose={() => handleReset()}
          onConfirm={() => handleGiveToken()}
          title="টোকেন দেয়ার জন্য নিচের ফর্মটি পূরণ করুন"
          loading={isGivingToken}
        >
          <form>
            <div className="space-y-2 flex flex-col gap-2">
              <div>
                <label htmlFor="token">টোকেন</label>
                <Input
                  id="token"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  placeholder="টোকেন সংখ্যা লিখুন (ইংরেজি)"
                  type="number"
                />
              </div>
            </div>
          </form>
        </ReusableModal>

        {/* edit user */}
        <ReusableModal
          open={isModalOpen === "edit"}
          onClose={() => handleReset()}
          onConfirm={() => handleEditUser()}
          loading={isUpdating}
          title="ইউজার সম্পাদনা"
        >
          <form>
            <div className="space-y-2 flex flex-col gap-2">
              <div>
                <label htmlFor="emailVerification" className="text-md">
                  Email Verification
                </label>
                <Select
                  value={updatedData?.emailConfirmed}
                  onValueChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      emailConfirmed: e,
                    })
                  }
                >
                  <SelectTrigger className="p-4 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                    <SelectValue placeholder="Email Verification" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                    {emailVerificationOptions.map((x) => (
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
                <label htmlFor="userStatus">User Status</label>
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
                    <SelectValue placeholder="User Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                    {userStatusOptions.map((x) => (
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
              {/* <div>
                <label htmlFor="biodataStatus">Biodata Status</label>
                <Select
                  value={updatedData?.biodataStatus}
                  onValueChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      biodataStatus: e,
                    })
                  }
                >
                  <SelectTrigger className="p-4 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0">
                    <SelectValue placeholder="Biodata Status" />
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
              <div>
                <label htmlFor="token">Give Token</label>
                <Input
                  type="number"
                  placeholder="Give Token"
                  className="p-4 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] m-0"
                  value={updatedData?.token}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      token: e.target.value,
                    })
                  }
                />
              </div> */}
            </div>
          </form>
        </ReusableModal>
      </div>
    </div>
  );
}
