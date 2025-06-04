// File: src/app/(main)/dashboard/page.tsx
"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import AdminDashboard from "./components/AdminDashboard";
import DashboardMainContent from "./components/DashboardMainContent";
import DashboardRightSection from "./components/DashboardRightSection";

export default function DashboardPage() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <>
      {user?.role === "SUPER_ADMIN" || user?.role === "ADMIN" ? (
        <AdminDashboard />
      ) : (
        <div className="flex justify-between flex-grow bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
          <DashboardMainContent />
          <DashboardRightSection />
        </div>
      )}
    </>
  );
}
