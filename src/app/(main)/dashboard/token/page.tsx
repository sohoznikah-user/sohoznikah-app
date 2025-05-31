"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import AdminTokenPage from "../components/AdminTokenPage";
import UserTokenPage from "../components/UserTokenPage";

const TokenPage = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log("user", user);

  if (user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") {
    return <AdminTokenPage />;
  } else {
    return <UserTokenPage />;
  }
};

export default TokenPage;
