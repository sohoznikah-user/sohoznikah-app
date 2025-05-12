// File: src/app/(main)/dashboard/DashboardMainContent.tsx
import DashboardMainBioStatus from "./DashboardMainBioStatus";
import DashboardMainContactUs from "./DashboardMainContactUs";
import DashboardMainMyActivityStatus from "./DashboardMainMyActivityStatus";
import DashboardMainMyBioStatus from "./DashboardMainMyBioStatus";
import DashboardMainNotifications from "./DashboardMainNotifications";

export default function DashboardMainContent() {
  return (
    <div className="py-12 flex flex-col space-y-8 max-w-7xl">
      <DashboardMainBioStatus />
      <div className="flex justify-center space-x-16 text-black">
        <DashboardMainMyActivityStatus />
        <DashboardMainMyBioStatus />
      </div>
      <DashboardMainNotifications />
      <DashboardMainContactUs />
    </div>
  );
}
