// File: src/app/(main)/dashboard/DashboardMainContent.tsx
"use client";
import { useGetBiodataAnalyticsQuery } from "@/redux/features/biodata/biodataApi";
import DashboardMainBioStatus from "./DashboardMainBioStatus";
import DashboardMainMyActivityStatus from "./DashboardMainMyActivityStatus";
import DashboardMainMyBioStatus from "./DashboardMainMyBioStatus";

export default function DashboardMainContent() {
  const { data: biodataAnalytics } = useGetBiodataAnalyticsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className=" flex flex-col w-full">
      <DashboardMainBioStatus />
      <div className="flex flex-col md:flex-col lg:flex-row justify-center md:space-x-8 space-y-8 md:space-y-8 lg:space-y-0 text-black w-full h-full mt-5 ">
        <div className="w-full lg:w-1/2 h-full ">
          <DashboardMainMyActivityStatus biodataAnalytics={biodataAnalytics} />
        </div>
        <div className="w-full lg:w-1/2 h-full ">
          <DashboardMainMyBioStatus biodataAnalytics={biodataAnalytics} />
        </div>
      </div>

      {/* <DashboardMainContactUs /> */}
    </div>
  );
}
