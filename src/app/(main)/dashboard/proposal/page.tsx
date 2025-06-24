"use client";

import DashboardTitle from "@/components/shared/DashboardTitle";
import ReusableMobileCard from "@/components/shared/ReusableMobileCard";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { ReusableTable } from "@/components/shared/ReusableTable";
import {
  useCancelProposalMutation,
  useGetAllProposalsQuery,
} from "@/redux/features/admin/proposalApi";
import { getDistrictTitle, getUpazilaTitle } from "@/utils/getBanglaTitle";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// PaymentTracker component
const ProposalPage = () => {
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

  const type = activeTab === "myRecords" ? "received" : "sent";

  const { data: proposalData } = useGetAllProposalsQuery({
    type,
    page: pagination.page,
    limit: pagination.limit,
    searchTerm: searchTerm,
  });

  const [cancelProposal, { isLoading: isCancelling }] =
    useCancelProposalMutation();

  const handleCancelProposal = async () => {
    if (!selectedId) {
      toast.error("প্রস্তাবটি নির্বাচন করুন");
      return;
    }

    try {
      const response = await cancelProposal(selectedId).unwrap();
      if (response.success) {
        toast.success("প্রস্তাবটি বাতিল করা হয়েছে");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "প্রস্তাবটি বাতিল করা হয়নি");
    } finally {
      handleReset();
    }
  };

  const handleReset = () => {
    setIsModalOpen(null);
    setSelectedId(null);
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
      accessorKey: "timeLeft",
      header: "সময় বাকি আছে",
      cell: ({ row }) => {
        const timeLeft = getTimeDifference(
          row?.original?.expiredAt,
          new Date().toISOString()
        );
        return (
          <div>
            {row?.original?.isCancelled ? (
              <button className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 transition">
                প্রস্তাবটি বাতিল করা হয়েছে
              </button>
            ) : timeLeft === "00:00" ? (
              <button
                className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded hover:bg-red-600 transition"
                onClick={() => {
                  setSelectedId(row?.original?.id);
                  setIsModalOpen("cancel");
                }}
              >
                প্রস্তাবটি বাতিল করুন
              </button>
            ) : (
              <>
                <span>{timeLeft}</span>
                <span>ঘন্টা</span>
              </>
            )}
          </div>
        );
      },
    },

    ...(activeTab === "myRecords"
      ? [
          {
            id: "view",
            header: "বায়োডাটা দেখুন",
            cell: ({ row }) => (
              <div>
                <button
                  className="bg-[#307FA7] text-white px-4 py-1 rounded hover:bg-[#307FA7]/80 transition cursor-pointer"
                  onClick={() => {
                    row?.original.bioVisibility === "PRIVATE"
                      ? setIsModalOpen("private")
                      : router.push(`/biodatas/${row?.original?.biodataId}`);
                  }}
                >
                  View & Respond
                </button>
              </div>
            ),
          },
          {
            id: "status",
            header: "আপনার রেসপন্স",
            cell: ({ row }) => {
              return (
                <div>
                  {row?.original?.status === "PENDING" ? (
                    <p className="text-center px-3 py-1 border-blue-500 border-2 rounded-lg text-blue-500 text-md font-semibold">
                      পেন্ডিং
                    </p>
                  ) : row?.original?.status === "ACCEPTED" ? (
                    <p className="text-center px-3 py-1 border-green-500 border-2 rounded-lg text-green-500 text-md font-semibold">
                      আগ্রহী
                    </p>
                  ) : row?.original?.status === "REJECTED" ? (
                    <p className="text-center px-3 py-1 border-red-500 border-2 rounded-lg text-red-500 text-md font-semibold">
                      অনাগ্রহী
                    </p>
                  ) : row?.original?.status === "NEED_TIME" ? (
                    <p className="text-center px-3 py-1 border-yellow-500 border-2 rounded-lg text-yellow-500 text-md font-semibold">
                      সময় নিতে ইচ্ছুক
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              );
            },
          },
        ]
      : [
          {
            id: "view",
            header: "বায়োডাটা দেখুন",
            cell: ({ row }) => (
              <div>
                <button
                  className="bg-[#307FA7] text-white px-4 py-1 rounded hover:bg-[#307FA7]/80 transition cursor-pointer"
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
            id: "viewCont",
            header: "অপর পক্ষের রেসপন্স",
            cell: ({ row }) => {
              return (
                <div>
                  {row?.original?.status === "PENDING" ? (
                    <p className="text-center px-3 py-1 border-blue-500 border-2 rounded-lg text-blue-500 text-md font-semibold">
                      পেন্ডিং
                    </p>
                  ) : row?.original?.status === "ACCEPTED" ? (
                    <p className="text-center px-3 py-1 border-green-500 border-2 rounded-lg text-green-500 text-md font-semibold">
                      আগ্রহী
                    </p>
                  ) : row?.original?.status === "REJECTED" ? (
                    <p className="text-center px-3 py-1 border-red-500 border-2 rounded-lg text-red-500 text-md font-semibold">
                      অনাগ্রহী
                    </p>
                  ) : row?.original?.status === "NEED_TIME" ? (
                    <p className="text-center px-3 py-1 border-yellow-500 border-2 rounded-lg text-yellow-500 text-md font-semibold">
                      সময় নিতে ইচ্ছুক
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              );
            },
          },
        ]),
  ];

  return (
    <div className="min-h-[500px] flex justify-center items-center lg:p-5 mb-10">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC]  rounded-lg  md:shadow-lg py-6 lg:pt-10 md:pt-8 pt-5 ">
        <DashboardTitle title="প্রাথমিক প্রস্তাবের তালিকা" />
        {/* <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder=""
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
        <div className="flex justify-center mb-3 px-4">
          <button
            onClick={() => setActiveTab("myRecords")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "myRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            প্রস্তাব এসেছে
          </button>
          <button
            onClick={() => setActiveTab("othersRecords")}
            className={`px-6 py-2 rounded-lg -ml-2 font-medium transition ${
              activeTab === "othersRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            প্রস্তাব পাঠিয়েছি
          </button>
        </div>

        <p className="text-center text-lg font-semibold text-[#C65C5C] pt-5 max-w-2xl mx-auto px-4">
          {activeTab === "myRecords"
            ? "আপনাকে প্রস্তাব পাঠানোর পর ৭২ ঘন্টার মধ্যে কোনো রেসপন্স না করলে অপরপক্ষ চাইলে প্রস্তাবটি বাতিল করতে পারবে"
            : "আপনি প্রস্তাব পাঠানোর পর ৭২ ঘন্টার মধ্যে অপরপক্ষ রেসপন্স না করলে প্রস্তাবটি বাতিল করার অপশন পাবেন। বাতিল করলে টোকেন রিফান্ড পাবেন, চাইলে অপেক্ষাও করতে পারেন"}
        </p>

        {/* mobile view */}
        <div className="flex flex-col gap-4 md:hidden sm:block">
          {proposalData?.data?.map((item: any) => (
            <ReusableMobileCard
              key={item.id}
              biodataNo={item.bioNo}
              permanentAddress={`${
                item.bioPermanentCity
                  ? getUpazilaTitle(item.bioPermanentCity)
                  : "-"
              }, ${item.bioPermanentState ? getDistrictTitle(item.bioPermanentState) : "-"} `}
              date={item.createdAt}
              visibility={item.bioVisibility}
              activeTab={activeTab}
              onView={() => {
                item.bioVisibility === "PRIVATE"
                  ? setIsModalOpen("private")
                  : router.push(`/biodatas/${item.biodataId}`);
              }}
              myResponse={item.status}
              otherResponse={item.status}
              isCancelled={item.isCancelled}
              expiredAt={item.expiredAt}
            />
          ))}
        </div>

        <ReusableTable
          data={proposalData?.data || []}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          enablePagination
          // searchable
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <ReusableModal
        open={isModalOpen === "cancel"}
        onClose={() => handleReset()}
        onConfirm={() => handleCancelProposal()}
        loading={isCancelling}
        title="প্রস্তাবটি বাতিল করতে চান?"
        description="এই প্রস্তাবটি বাতিল করতে চান কি? বাতিল করার পর টোকেন রিফান্ড পাবেন"
      />

      {/* <DeleteConfirmationModal
        open={isModalOpen === "delete"}
        onClose={() => handleReset()}
        onDelete={handleDeleteFromFavourite}
        loading={isDeleting}
        description="আপনি কি পছন্দের তালিকা থেকে এই বায়োডাটা মুছে ফেলে চান?
(যদি চূড়ান্ত তালিকায় রেখে থাকেন তাহলে সেখান থেকেও মুছে যাবে"
      /> */}
    </div>
  );
};

export default ProposalPage;
