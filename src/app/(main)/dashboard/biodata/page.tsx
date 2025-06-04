"use client";
import { useAppSelector } from "@/redux/hooks";
import AdminBiodataPage from "../components/AdminBiodataPage";
import UserBiodataPage from "../components/UserBiodataPage";

const BiodataPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      {user?.role === "SUPER_ADMIN" || user?.role === "ADMIN" ? (
        <AdminBiodataPage />
      ) : (
        <UserBiodataPage />
      )}
    </div>
  );
};
export default BiodataPage;
