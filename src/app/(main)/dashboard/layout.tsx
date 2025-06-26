"use client";
import Loading from "@/app/loading";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetMyBiodataQuery } from "@/redux/features/biodata/biodataApi";
import {
  setAllBiodata,
  setAllBiodataFormData,
} from "@/redux/features/biodata/biodataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ContactResponse from "./components/ContactResponse";
import DashboardLeftNav from "./components/DashboardLeftNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const emailVerified = useAppSelector((state) => state.auth.emailVerified);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user || !token) {
      const redirectUrl = `/dashboard`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [user, token, router]);

  useEffect(() => {
    if (!emailVerified) {
      router.push("/verify-email");
    }
  }, [emailVerified, router]);

  const {
    data: fetchedBiodata,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetMyBiodataQuery(undefined, {
    skip: !user || !token,
  });

  // Populate Redux with fetched biodata
  useEffect(() => {
    if (fetchedBiodata?.data) {
      const mapped = mapApiToBiodataFormData(fetchedBiodata.data);
      dispatch(setAllBiodataFormData(mapped.biodataFormData));
      dispatch(setAllBiodata(mapped.biodata));
    }
  }, [fetchedBiodata, dispatch]);

  // Handle fetch errors
  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to fetch biodata. Please try again.");
    }
  }, [fetchError]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <main
      className="flex justify-stretch flex-grow bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF] text-black 
     h-full"
    >
      {/* Dashboard Toggle Button - Only visible on mobile */}
      <button
        className="fixed top-5 right-4 z-50 lg:hidden  p-2 rounded-lg cursor-pointer"
        onClick={() => setIsSidebarOpen(true)}
      >
        <CircleUserRound className="w-8 h-8 text-gray-500" />
      </button>

      <DashboardLeftNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="w-full bg-gradient-to-r from-blue-100 to-pink-100 text-background px-4 md:px-6 lg:px-5 py-5">
        {user?.role === "USER" && <ContactResponse />}
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
