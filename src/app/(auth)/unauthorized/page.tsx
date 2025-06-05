"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const UnauthorizedPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
    toast.error("You are not authorized to access this page");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold">
        You are not authorized to access this page
      </h1>
      <div className="flex gap-4 mt-5">
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
