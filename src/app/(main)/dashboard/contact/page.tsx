"use client";

import { ReusableModal } from "@/components/shared/ReusableModal";
import { ReusableTable } from "@/components/shared/ReusableTable";
import Title from "@/components/shared/Title";
import { proposalStatusOptions } from "@/lib/consts";
import { useGetAllContactsQuery } from "@/redux/features/admin/contactApi";
import {
  getDistrictTitle,
  getTitleById,
  getUpazilaTitle,
} from "@/utils/getBanglaTitle";
import { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const router = useRouter();

  const type = activeTab === "myRecords" ? "sent" : "received";

  const { data: contactData, isLoading } = useGetAllContactsQuery({
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
            id: "status",
            header: "যোগাযোগ নম্বর দেখুন",
            cell: ({ row }) => {
              const status = getTitleById(
                proposalStatusOptions,
                row?.original?.status
              );
              return (
                <div>
                  <button
                    className="bg-[#129900] text-white px-4 py-1 rounded hover:bg-[#129900ee] transition cursor-pointer"
                    onClick={() => {
                      setSelectedData(row?.original);
                      setIsModalOpen("showContacts");
                    }}
                  >
                    যোগাযোগ নম্বর
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
        ]),
  ];

  return (
    <div className="min-h-[500px] lg:p-5 flex justify-center items-center">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC]  rounded-lg  md:shadow-lg py-6 lg:pt-10 md:pt-8 pt-5 ">
        <Title leftTitle="যোগাযোগ তথ্যের তালিকা" hideCenter />

        <div className="flex justify-center mb-0 px-4">
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
          data={contactData?.data || []}
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
        open={isModalOpen === "showContacts"}
        onConfirm={() => handleReset()}
        onClose={() => handleReset()}
        loading={false}
        title="যোগাযোগ নম্বর দেখুন"
        hideCancelButton
      >
        <>
          {selectedData?.contacts?.length > 0 ? (
            <>
              <div className="flex items-center gap-3 justify-center mb-2  w-full">
                <p className="text-lg font-semibold text-center">
                  {selectedData?.fullName}
                </p>
              </div>
              <div className="w-full  mt-2 mb-2 border border-gray-300 rounded-md bg-white">
                <div className="grid grid-cols-5 border-b border-gray-200">
                  <div className="py-1 px-3 text-center font-semibold text-[#016CA7] border-r border-gray-200 col-span-2">
                    সম্পর্ক
                  </div>
                  <div className="py-1 px-3 text-center font-semibold text-[#016CA7] col-span-3">
                    মোবাইল নম্বর
                  </div>
                </div>
                {selectedData?.contacts?.map((contact: any, idx: number) => (
                  <div
                    key={idx}
                    className="grid grid-cols-5 border-b last:border-b-0 border-gray-100"
                  >
                    <div className="py-2 px-3 text-center text-black col-span-2">
                      {contact.relation}
                    </div>
                    <div className="py-2 px-3 flex items-center justify-center gap-2 col-span-3 text-center">
                      <span className="text-black">{contact.phoneNumber}</span>
                      <button
                        className="ml-1 p-1 rounded hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(contact.phoneNumber);
                          toast.success("নম্বর কপি করা হয়েছে");
                        }}
                        title="Copy"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // <div className="w-full mt-2 mb-2 border border-gray-300 rounded-md bg-white">
            //   <div className="grid grid-cols-8 border-b border-gray-200">
            //     <div className="py-1 px-3 text-center font-semibold text-[#016CA7] border-r border-gray-200 col-span-2">
            //       সম্পর্ক
            //     </div>
            //     <div className="py-1 px-3 text-center font-semibold text-[#016CA7] col-span-3">
            //       মোবাইল নম্বর
            //     </div>
            //   </div>
            //   {selectedData.contacts?.map((contact: any, idx: number) => (
            //     <div
            //       key={idx}
            //       className="grid grid-cols-8 border-b last:border-b-0 border-gray-100"
            //     >
            //       <div className="py-2 px-3 text-center text-black col-span-3">
            //         {contact.fullName}
            //       </div>
            //       <div className="py-2 px-3 text-center text-black col-span-2">
            //         {contact.relation}
            //       </div>
            //       <div className="py-2 px-3 flex items-center justify-center gap-2 col-span-3 text-center">
            //         <span className="text-black">{contact.phoneNumber}</span>
            //         <button
            //           className="ml-1 p-1 rounded hover:bg-gray-100 cursor-pointer"
            //           onClick={() => {
            //             navigator.clipboard.writeText(contact.phoneNumber);
            //             toast.success("নম্বর কপি করা হয়েছে");
            //           }}
            //           title="Copy"
            //         >
            //           <Copy className="w-4 h-4" />
            //         </button>
            //       </div>
            //     </div>
            //   ))}
            // </div>
            <div className="flex items-center gap-3 justify-start ">
              <p className="text-lg font-semibold">
                অপর পক্ষ এখনো রাজি হয়নি। রাজি হলে তারপর আপনি যোগাযোগ নম্বর দেখতে
                পারবেন।
              </p>
            </div>
          )}
        </>
      </ReusableModal>
    </div>
  );
};

export default ContactPage;
