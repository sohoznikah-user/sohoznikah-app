// File: src/app/(main)/biodatas/listPageComponentes/SearchByBiodataNo.tsx

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function BiodatasPageSearchByBiodataNo() {
  return (
    <form className="flex items-center space-x-4">
      <div className="w-32">
        <Select>
          <SelectTrigger className="text-[#1f4f69]">
            <SelectValue placeholder="SNM" />
          </SelectTrigger>
          <SelectContent className="bg-white text-[#1f4f69]">
            <SelectItem
              className="focus:bg-[#E25A6F] focus:text-white"
              value="all"
            >
              SNM
            </SelectItem>
            <SelectItem
              className="focus:bg-[#E25A6F] focus:text-white"
              value="male"
            >
              পুরুষ
            </SelectItem>
            <SelectItem
              className="focus:bg-[#E25A6F] focus:text-white"
              value="female"
            >
              নারী
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-64">
        <div className="space-y-2">
          <Input
            className="w-full px-4 py-2 border rounded-md text-[#1f4f69] selection:bg-[#E25A6F] selection:text-white"
            id="biodataNo"
            type="text"
            placeholder="বায়োডাটা নং"
          />
        </div>
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </form>
  );
}
