// File: src/app/(main)/dashboard/page.tsx
"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import AdminDashboard from "./components/AdminDashboard";
import DashboardMainContent from "./components/DashboardMainContent";
import DashboardMainNotifications from "./components/DashboardMainNotifications";
import DashboardRightSection from "./components/DashboardRightSection";

export default function DashboardPage() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="relative">
      {user?.role === "SUPER_ADMIN" || user?.role === "ADMIN" ? (
        <AdminDashboard />
      ) : (
        <>
          <div className="flex lg:flex-row flex-col flex-wrap justify-between flex-grow relative w-full">
            <div className="w-full lg:w-3/4 h-full">
              <DashboardMainContent />
            </div>
            <div className="w-full lg:w-1/4 h-full ">
              <DashboardRightSection />
            </div>
          </div>
          <div className="w-full  h-full lg:mt-10 mt-6 mb-6">
            <DashboardMainNotifications />
          </div>
        </>
      )}
    </div>
  );
}
