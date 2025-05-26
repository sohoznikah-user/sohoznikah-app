// File: src/app/(auth)/login/LoginForm.tsx
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
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard"; // Get redirect URL

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");

  const onFinish = async (values: LoginFormValues) => {
    const isEmailValid = await trigger("email");
    const isPasswordValid = await trigger("password");

    if (!isEmailValid || !isPasswordValid) {
      toast.error("Please fix the validation errors before proceeding");
      return;
    }

    if (!values.email || !values.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await loginUser(values).unwrap();
      if (result.success) {
        toast.success(result.message || "You have successfully logged in!");

        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        const decodedToken = jwtDecode<TUser>(accessToken);

        dispatch(
          setUser({
            user: decodedToken,
            acesstoken: accessToken,
            refreshtoken: refreshToken,
          })
        );

        router.push(decodeURIComponent(redirectUrl)); // Redirect to the specified URL
      } else {
        toast.error(result.message || "Invalid email or password!");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error?.message || "Invalid email or password!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email/Mobile Number</Label>
        <Input
          id="email"
          type="text"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <Link href="/forgot-password" className="text-sm text-blue-500">
          Forgot Password?
        </Link>
      </div>

      <Button
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
