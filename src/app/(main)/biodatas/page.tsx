import BiodatasPageSidebar from "./BiodatasPageSidebar";
import BiodatasPageSearchByBiodataNo from "./SearchByBiodataNo";
import BiodatasPageCard from "./BiodatasPageCard";

export default function BiodatasPage() {
  return (
    <main className="flex-grow min-w-7xl mt-12 mx-auto flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl text-black mb-4">বায়োডাটা সমূহ</div>
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <BiodatasPageSidebar />

          {/* Main content */}
          <div className="flex-1 p-6">
            <div className="flex justify-end items-center mb-6">
              <BiodatasPageSearchByBiodataNo />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <BiodatasPageCard id={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
