"use client";

import { ReusableTable } from "@/components/shared/ReusableTable";
import { proposalStatusOptions } from "@/lib/consts";
import { useGetAllContactsQuery } from "@/redux/features/admin/contactApi";
import {
  getDistrictTitle,
  getTitleById,
  getUpazilaTitle,
} from "@/utils/getBanglaTitle";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

// PaymentTracker component
const ContactPage = () => {
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

  const type = activeTab === "myRecords" ? "sent" : "received";

  const { data: proposalData } = useGetAllContactsQuery({
    type,
    page: pagination.page,
    limit: pagination.limit,
    searchTerm: searchTerm,
  });

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

    ...(activeTab === "myRecords"
      ? [
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
                  View & Respond
                </button>
              </div>
            ),
          },
          {
            id: "status",
            header: "যোগাযোগ নম্বর দেখুন",
            cell: ({ row }) => {
              const status = getTitleById(
                proposalStatusOptions,
                row?.original?.status
              );
              return (
                <div>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
                    {status}
                  </button>
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
        ]),
  ];

  return (
    <div className="min-h-screen p-5 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg py-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          যোগাযোগ তথ্যের তালিকা
        </h1>
        {/* <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder=""
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
        <div className="flex justify-center mb-3">
          <button
            onClick={() => setActiveTab("myRecords")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "myRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            আমি যাদের যোগাযোগ তথ্য কিনেছি
          </button>
          <button
            onClick={() => setActiveTab("othersRecords")}
            className={`px-6 py-2 rounded-lg -ml-2 font-medium transition ${
              activeTab === "othersRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            আমার যোগাযোগ তথ্য যারা কিনেছে
          </button>
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

      {/* <ReusableModal
        open={isModalOpen === "cancel"}
        onClose={() => handleReset()}
        onConfirm={() => handleCancelProposal()}
        loading={isCancelling}
        title="প্রস্তাবটি বাতিল করতে চান?"
        description="এই প্রস্তাবটি বাতিল করতে চান কি? বাতিল করার পর টোকেন রিফান্ড পাবেন"
      /> */}
    </div>
  );
};

export default ContactPage;
