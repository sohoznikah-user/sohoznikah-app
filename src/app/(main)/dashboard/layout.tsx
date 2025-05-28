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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import DashboardLeftNav from "./components/DashboardLeftNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user || !token) {
      const redirectUrl = `/dashboard`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [user, token, router]);

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
    <main className="flex justify-start flex-grow bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <DashboardLeftNav />
      <div className="w-full bg-gradient-to-r from-blue-100 to-pink-100 text-background">
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
