// File: src/app/(main)/biodatas/listPageComponentes/BiodatasPageAppliedFilters.tsx

import { X } from "lucide-react";

export default function BiodatasPageAppliedFilters() {
  const appliedFilters = [
    {
      id: 1,
      name: "বায়োডাটার ধরন",
      selected: [
        {
          id: 1,
          name: "পুরুষ",
        },
      ],
    },
    {
      id: 2,
      name: "বৈবাহিক অবস্থা",
      selected: [
        {
          id: 1,
          name: "অবিবাহিত",
        },
        {
          id: 2,
          name: "বিবাহিত",
        },
      ],
    },
  ];

  return (
    <div className="w-72 bg-white ml-4 px-4 space-y-2">
      <div className="flex items-center justify-center text-center text-[#1f4f69] pb-2">
        <div className="pb-1 border-b border-[#1f4f69]">আপনি বাছাই করেছেন</div>
      </div>
      <div className="flex flex-col space-y-4">
        {appliedFilters.length > 0 &&
          appliedFilters.map((x) => (
            <div
              key={x.id}
              className="flex flex-col space-y-3 text-black text-xs border border-gray-300 rounded-xl px-6 py-2"
            >
              {x.selected.length > 0 &&
                x.selected.map((y) => (
                  <div key={y.id} className="flex justify-between items-center">
                    <div>{y.name}</div>
                    <X className="text-[#e25a6f] w-4 h-4" />
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}
