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
const ShortlistPage = () => {
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
      header: "বায়োডাটা নং",
    },
    {
      accessorKey: "mobile",
      header: "স্থায়ী ঠিকানা",
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
      header: "বর্তমান ঠিকানা",
    },
    {
      accessorKey: "address",
      header: "বর্তমান ঠিকানা",
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
  ];

  return (
    <div className="min-h-screen p-4 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          চুড়ান্ত তালিকা
        </h1>

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

export default ShortlistPage;
