// File: src/app/(main)/dashboard/DashboardMainContent.tsx
"use client";
import { useGetBiodataAnalyticsQuery } from "@/redux/features/biodata/biodataApi";
import DashboardMainBioStatus from "./DashboardMainBioStatus";
import DashboardMainMyActivityStatus from "./DashboardMainMyActivityStatus";
import DashboardMainMyBioStatus from "./DashboardMainMyBioStatus";
import DashboardMainNotifications from "./DashboardMainNotifications";

export default function DashboardMainContent() {
  const { data: biodataAnalytics } = useGetBiodataAnalyticsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="py-12 flex flex-col space-y-8 max-w-7xl">
      <DashboardMainBioStatus />
      <div className="flex justify-center space-x-16 text-black">
        <DashboardMainMyActivityStatus biodataAnalytics={biodataAnalytics} />
        <DashboardMainMyBioStatus biodataAnalytics={biodataAnalytics} />
      </div>
      <DashboardMainNotifications />
      {/* <DashboardMainContactUs /> */}
    </div>
  );
}
