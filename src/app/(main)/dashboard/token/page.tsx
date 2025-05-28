"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tokenOptions } from "@/lib/consts";
import { useState } from "react";

const TokenPage = () => {
  const [activeTab, setActiveTab] = useState("myTokens");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for "My Token Records"
  const myTokenRecords = [
    {
      date: "01/04/2025",
      tokenId: "TK123",
      name: "অনুপম",
      location: "ঢাকা",
      status: "Active",
      private: true,
      icons: { check: "black", camera: "red" },
    },
    {
      date: "25/03/2025",
      tokenId: "TK124",
      name: "শোভনা",
      location: "চট্টগ্রাম",
      status: "Inactive",
      private: false,
      icons: { check: "gray", camera: "red" },
    },
  ];

  // Sample data for "Others' Token Records"
  const othersTokenRecords = [
    {
      date: "01/04/2025",
      tokenId: "TK125",
      name: "রাহুল",
      location: "সিলেট",
      status: "Active",
      private: true,
    },
    {
      date: "25/03/2025",
      tokenId: "TK126",
      name: "সরকার",
      location: "রাজশাহী",
      status: "Inactive",
      private: false,
    },
  ];

  const columns = [
    { header: "তারিখ", accessor: "date" },
    { header: "টোকেন আইডি", accessor: "tokenId" },
    { header: "নাম", accessor: "name" },
    { header: "অবস্থান", accessor: "location" },
    { header: "স্ট্যাটাস", accessor: "status" },
    {
      header: "বোতাম/দেখুন",
      render: (row: any) => (
        <div>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
            View
          </button>
          {row.icons && (
            <div className="flex space-x-2 mt-2">
              {row.icons.check && (
                <span className={`text-${row.icons.check}-500 text-lg`}>
                  ✔
                </span>
              )}
              {row.icons.camera && (
                <span className={`text-${row.icons.camera}-500 text-lg`}>
                  📷
                </span>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  const data = activeTab === "myTokens" ? myTokenRecords : othersTokenRecords;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          টোকেন
        </h1>

        <div className="flex max-w-5xl justify-between items-stretch gap-5">
          <div className="flex md:flex-row flex-col gap-5 justify-center bg-white p-5 rounded-3xl">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-[#ab2929]">
                টোকেন কি?
              </h3>
              <p className="text-gray-800 max-w-sm">
                টোকেন খরচ করে আপনি পছন্দের বায়োডাটায় প্রস্তাব পাঠাতে পারবেন এবং
                অভিভাবকের যোগাযোগ নম্বর দেখতে পারবেন
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-[#ab2929]">
                টোকেনের ব্যবহার
              </h3>

              <ul className="list-disc">
                <li>প্রতি টোকেনের মূল্য ৫০ টাকা।</li>
                <li>১টি বায়োডাটায় প্রস্তাব পাঠাতে ১টি টোকেন প্রয়োজন হবে।</li>
                <li>
                  ১টি বায়োডাটার অভিভাবকের যোগাযোগ নম্বর দেখতে ২টি
                  টোকেন প্রয়োজন হবে
                </li>
              </ul>
            </div>
          </div>

          {/* token */}
          <div className="bg-white p-5 rounded-3xl flex flex-col justify-center items-center gap-3">
            <h3 className="text-2xl font-bold mb-2 text-center">
              আপনার বর্তমান টোকেন সংখ্যা
            </h3>
            <p className="text-[#ab2929] max-w-sm text-7xl font-semibold text-center">
              ৫
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-center  mb-6 lg:mt-20 md:mt-16 mt-10">
          টোকেন কিনুন
        </h3>
        <div className="bg-white p-5 rounded-3xl flex flex-col justify-center items-center gap-3">
          <div className="flex justify-evenly items-center w-full mb-5">
            <h4 className="text-lg font-semibold">বাছাই করুন</h4>
            <h4 className="text-lg font-semibold">টোকেন সংখ্যা</h4>
            <h4 className="text-lg font-semibold">মূল্য</h4>
            <h4 className="text-lg font-semibold">কিনুন</h4>
          </div>

          <div className=" w-full mb-5 flex justify-evenly">
            <RadioGroup
              // onValueChange={field.onChange}
              // defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 space-y-2">
                <RadioGroupItem
                  value="token"
                  id="token"
                  className="h-5 w-5 border-2 border-[#005889] text-[#005889] focus:ring-[#005889]"
                />
                <label
                  htmlFor="self"
                  className="text-xs text-[#005889]"
                ></label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-1">
              <Select
              // value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger className="p-4 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                  <SelectValue placeholder="টোকেন সংখ্যা" />
                </SelectTrigger>
                <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                  {tokenOptions.map((x) => (
                    <SelectItem
                      key={x.id}
                      className="focus:bg-transparent focus:text-[#E25A6F] p-2 text-md"
                      value={x.id}
                    >
                      {x.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="w-36">X ৫০ টাকা</p>
            </div>
            <div>
              <p>৫০ টাকা</p>
            </div>
            <div>
              <p>৫০ টাকা</p>
            </div>
          </div>
          <div className=" w-full mb-5 flex justify-evenly">
            <RadioGroup
              // onValueChange={field.onChange}
              // defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 space-y-2">
                <RadioGroupItem
                  value="token"
                  id="token"
                  className="h-5 w-5 border-2 border-[#005889] text-[#005889] focus:ring-[#005889]"
                />
                <label
                  htmlFor="self"
                  className="text-xs text-[#005889]"
                ></label>
              </div>
            </RadioGroup>
            <div>
              <Select
              // value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                  <SelectValue placeholder="টোকেন সংখ্যা" />
                </SelectTrigger>
                <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                  {tokenOptions.map((x) => (
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
              <p>৫০ টাকা</p>
            </div>
            <div>
              <p>৫০ টাকা</p>
            </div>
          </div>
          <div className=" w-full mb-5 flex justify-evenly">
            <RadioGroup
              // onValueChange={field.onChange}
              // defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 space-y-2">
                <RadioGroupItem
                  value="token"
                  id="token"
                  className="h-5 w-5 border-2 border-[#005889] text-[#005889] focus:ring-[#005889]"
                />
                <label
                  htmlFor="self"
                  className="text-xs text-[#005889]"
                ></label>
              </div>
            </RadioGroup>
            <div>
              <Select
              // value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
                  <SelectValue placeholder="টোকেন সংখ্যা" />
                </SelectTrigger>
                <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
                  {tokenOptions.map((x) => (
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
              <p>৫০ টাকা</p>
            </div>
            <div>
              <p>৫০ টাকা</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;
