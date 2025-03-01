import DashboardLeftNav from "./DashboardLeftNav";
import DashboardMainContent from "./DashboardMainContent";
import DashboardRightSection from "./DashboardRightSection";

export default function DashboardPage() {
  return (
    <main className="flex justify-between flex-grow bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <DashboardLeftNav />

      <DashboardMainContent />
      <DashboardRightSection />
    </main>
  );
}
