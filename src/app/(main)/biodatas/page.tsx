import BiodatasPageFilters from "./BiodatasPageFilters";
import BiodatasPageSearchByBiodataNo from "./SearchByBiodataNo";
import BiodatasPageCard from "./BiodatasPageCard";
import BiodatasPageAppliedFilters from "./BiodatasPageAppliedFilters";

export default function BiodatasPage() {
  return (
    <>
      <div className="mt-12 text-3xl text-center text-black mb-4">
        বায়োডাটা সমূহ
      </div>
      <main className="flex justify-between flex-grow">
        {/* Left Sidebar */}
        <BiodatasPageFilters />

        {/* Main content */}
        <div className="flex-grow max-w-7xl">
          <div className="flex justify-end items-center mb-6">
            <BiodatasPageSearchByBiodataNo />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <BiodatasPageCard key={i} id={i} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <BiodatasPageAppliedFilters />
      </main>
    </>
  );
}
