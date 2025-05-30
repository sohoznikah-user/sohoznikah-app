"use client";

import { ReusableTable } from "@/components/shared/ReusableTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

// Sample data for "My Records"
const myRecordsData = [
  {
    date: "01/04/2025",
    mobile: "MS462",
    name: "অনুপম, শোভনা",
    address: "ঢাকা, ঢাকা, ঢাকা",
    private: true,
    icons: { check: "black", camera: "red" },
  },
  {
    date: "25/03/2025",
    mobile: "MS463",
    name: "রাহুল, সরকার",
    address: "চট্টগ্রাম, চট্টগ্রাম",
    private: false,
    icons: { check: "gray", camera: "red" },
  },
  {
    date: "14/02/2025",
    mobile: "MS464",
    name: "মিতা, দাস",
    address: "সিলেট, সিলেট",
    private: true,
    icons: { check: "gray", camera: "red" },
  },
  {
    date: "26/01/2025",
    mobile: "MS465",
    name: "সুমন, রায়",
    address: "রাজশাহী, রাজশাহী",
    private: false,
    icons: { check: "black", camera: "red" },
  },
];

// Sample data for "Other's Records"
const othersRecordsData = [
  {
    date: "01/04/2025",
    mobile: "MS466",
    name: "প্রিয়া, সাহা",
    address: "খুলনা, খুলনা",
    private: true,
  },
  {
    date: "25/03/2025",
    mobile: "MS467",
    name: "কাজল, মিত্র",
    address: "বরিশাল, বরিশাল",
    private: false,
  },
  {
    date: "14/02/2025",
    mobile: "MS468",
    name: "তানিয়া, আক্তার",
    address: "ময়মনসিংহ, ময়মনসিংহ",
    private: true,
  },
  {
    date: "26/01/2025",
    mobile: "MS469",
    name: "অর্জুন, সেন",
    address: "ঢাকা, ঢাকা",
    private: false,
  },
];

// PaymentTracker component
const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("myRecords");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: myRecordsData.length,
  });

  // Define columns for the table
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "তারিখ",
    },
    {
      accessorKey: "mobile",
      header: "মোবাইল নম্বর",
      cell: ({ row }) => (
        <div>
          {row.original.mobile}{" "}
          {row.original.private && (
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">
              প্রাইভেট
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "ফুল নাম",
    },
    {
      accessorKey: "address",
      header: "ঠিকানা",
    },
    {
      id: "view",
      header: "বায়োডাটা দেখুন",
      cell: ({ row }) => (
        <div>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
            View
          </button>
        </div>
      ),
    },
    ...(activeTab === "myRecords"
      ? [
          {
            id: "viewContact",
            header: "যোগাযোগ তথ্য দেখুন",
            cell: ({ row }) => (
              <div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
                  যোগাযোগ নাম্বার
                </button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-pink-100 p-6 flex justify-center items-center font-solaiman">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6 font-solaiman">
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
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("myRecords")}
            className={`px-6 py-2 rounded-lg font-medium transition font-solaiman ${
              activeTab === "myRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            আমি যাদের যোগাযোগ তথ্য কিনেছি
          </button>
          <button
            onClick={() => setActiveTab("othersRecords")}
            className={`px-6 py-2 rounded-lg -ml-2 font-medium transition font-solaiman ${
              activeTab === "othersRecords"
                ? "bg-[#c65c5c] text-white z-10"
                : "bg-[#d9d9d9] text-[#777] z-0"
            }`}
          >
            আমার যোগাযোগ তথ্য যারা কিনেছে
          </button>
        </div>
        <ReusableTable
          data={activeTab === "myRecords" ? myRecordsData : othersRecordsData}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          enablePagination
          // searchable
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default ContactPage;
