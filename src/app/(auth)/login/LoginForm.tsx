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
import { toast } from "sonner";

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
    // Validate all fields before proceeding
    const isEmailValid = await trigger("email");
    const isPasswordValid = await trigger("password");

    if (!isEmailValid || !isPasswordValid) {
      toast.error("Please fix the validation errors before proceeding");
      return;
    }

    // Additional validation checks
    if (!values.email || !values.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password length validation
    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await loginUser(values).unwrap();
      console.log(result);
      if (result.success) {
        toast.success(result.message || "You have successfully logged in!");

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
      } else {
        toast.error(result.message || "Invalid email or password!");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error?.message || "Invalid email or password!");
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
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
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
        disabled={isLoading || !isValid || !email || !password}
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
