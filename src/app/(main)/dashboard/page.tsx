// File: src/app/(main)/dashboard/page.tsx

import DashboardMainContent from "./components/DashboardMainContent";
import DashboardRightSection from "./components/DashboardRightSection";

export default function DashboardPage() {
  return (
    <div className="flex justify-between flex-grow bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <DashboardMainContent />
      <DashboardRightSection />
    </div>
  );
}
