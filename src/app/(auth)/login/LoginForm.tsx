"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUser } from "@/utils/tokenHelper";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const result = await loginUser(values).unwrap();

      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message || "You have successfully logged in!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        const decodedToken = jwtDecode(accessToken) as TUser;

        dispatch(
          setUser({
            user: decodedToken,
            acesstoken: accessToken,
            refreshtoken: refreshToken,
          })
        );

        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Invalid email or password!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form className="space-y-4 text-left" onSubmit={handleSubmit(onFinish)}>
      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="email">
          Email/Mobile Number
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="email"
          type="text"
          placeholder="Email/Mobile Number"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="password">
          Password
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <Link
          href="/forgot-password"
          className="text-blue-500 text-sm mt-1 inline-block hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
