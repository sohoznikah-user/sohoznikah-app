"use client";
// File: src/app/(main)/dashboard/DashboardMainMyActivityStatus.tsx

export default function DashboardMainMyActivityStatus({
  biodataAnalytics,
}: {
  biodataAnalytics: any;
}) {
  return (
    <div className="md:w-2/3 lg:w-full mx-auto w-full bg-[#F5F4FC] p-8 flex flex-col space-y-4 rounded-xl">
      <div className="text-2xl text-[#005381] text-center mb-8">
        আপনার বায়োডাটা সর্বমোট
      </div>
      <div className="flex justify-between">
        <div>ভিউ হয়েছে</div>
        <div className="w-6 text-center">
          {biodataAnalytics?.data?.totalViews || 0}
        </div>
      </div>
      <div className="flex justify-between">
        <div>পছন্দের তালিকায় রেখেছে</div>
        <div className="w-6 text-center">
          {biodataAnalytics?.data?.totalFavouriteReceived || 0}
        </div>
      </div>
      <div className="flex justify-between">
        <div>চূড়ান্ত তালিকায় রেখেছে</div>
        <div className="w-6 text-center">
          {biodataAnalytics?.data?.totalShortlistReceived || 0}
        </div>
      </div>
      <div className="flex justify-between">
        <div>প্রাথমিক প্রস্তাব এসেছে</div>
        <div className="w-6 text-center">
          {biodataAnalytics?.data?.totalProposalReceived || 0}
        </div>
      </div>
      <div className="flex justify-between">
        <div>যোগাযোগ তথ্য নিয়েছে</div>
        <div className="w-6 text-center">
          {biodataAnalytics?.data?.totalContactReceived || 0}
        </div>
      </div>
      {/* <div className="flex justify-between">
        <div>রিপোর্ট এসেছে</div>
        <div className="w-6 text-center">
          {biodataAnalytics?.data?.totalReportReceived || 0}
        </div>
      </div> */}
    </div>
  );
}
