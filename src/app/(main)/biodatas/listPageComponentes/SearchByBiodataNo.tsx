"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface BiodatasPageSearchByBiodataNoProps {
  onSearchChange: (searchTerm: string) => void;
  onReset: () => void;
  initialSearchTerm: string;
}

export default function BiodatasPageSearchByBiodataNo({
  onSearchChange,
  onReset,
  initialSearchTerm,
}: BiodatasPageSearchByBiodataNoProps) {
  const [gender, setGender] = useState<string>("");
  const [biodataNo, setBiodataNo] = useState<string>("");

  // Initialize from initialSearchTerm
  useEffect(() => {
    if (initialSearchTerm) {
      const [prefix, no] = initialSearchTerm.split("-");
      if (prefix && no) {
        setGender(prefix === "M" ? "male" : prefix === "F" ? "female" : "");
        setBiodataNo(no);
      }
    } else {
      setGender("");
      setBiodataNo("");
    }
  }, [initialSearchTerm]);

  const handleSearch = () => {
    if (!gender || !biodataNo) {
      onSearchChange("");
      return;
    }

    const prefix = gender === "male" ? "M" : "F";
    const searchTerm = `${prefix}-${biodataNo}`;
    onSearchChange(searchTerm);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
    if (biodataNo && value) {
      const prefix = value === "male" ? "M" : "F";
      onSearchChange(`${prefix}-${biodataNo}`);
    } else {
      onSearchChange("");
    }
  };

  const handleBiodataNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBiodataNo(value);
    if (gender && value) {
      const prefix = gender === "male" ? "M" : "F";
      onSearchChange(`${prefix}-${value}`);
    } else {
      onSearchChange("");
    }
  };

  const handleReset = () => {
    setGender("");
    setBiodataNo("");
    onReset();
  };

  return (
    <form
      className="flex items-center space-x-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div className="md:w-28 flex-1">
        <Select onValueChange={handleGenderChange} value={gender}>
          <SelectTrigger className="text-[#1f4f69] text-md border-gray-300 px-1">
            <SelectValue placeholder="পাত্র/পাত্রী" />
          </SelectTrigger>
          <SelectContent className="bg-white text-[#1f4f69] ">
            <SelectItem
              className="focus:bg-[#E25A6F] focus:text-white "
              value="male"
            >
              পাত্র (M)
            </SelectItem>
            <SelectItem
              className="focus:bg-[#E25A6F] focus:text-white"
              value="female"
            >
              পাত্রী (F)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative md:w-48 flex-2">
        <div className="space-y-2">
          <Input
            className="w-full px-3 border rounded-md text-[#1f4f69] selection:bg-[#E25A6F] selection:text-white md:text-md text-md border-gray-300"
            id="biodataNo"
            type="text"
            placeholder="বায়োডাটা নং"
            value={biodataNo}
            onChange={handleBiodataNoChange}
          />
        </div>
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Search className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <button
        type="button"
        className="py-1.5 px-4 bg-[#e25a6f] text-white rounded-lg cursor-pointer text-md"
        onClick={handleReset}
      >
        রিসেট
      </button>
    </form>
  );
}
