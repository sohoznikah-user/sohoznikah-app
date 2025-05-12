// File: src/app/(main)/dashboard/page.tsx
"use client";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import DashboardLeftNav from "./DashboardLeftNav";
import DashboardMainContent from "./DashboardMainContent";
import DashboardRightSection from "./DashboardRightSection";

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.acesstoken);
  console.log(user);
  if (!user || !token) {
    redirect("/login");
  }
  return (
    <main className="flex justify-between flex-grow bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <DashboardLeftNav />

      <DashboardMainContent />
      <DashboardRightSection />
    </main>
  );
}
