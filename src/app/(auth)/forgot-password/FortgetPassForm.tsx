"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ForgotPasswordFormValues {
  email: string;
}

const FortgetPassForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<ForgotPasswordFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");

  const onFinish = async (values: ForgotPasswordFormValues) => {
    // Validate email before proceeding
    const isEmailValid = await trigger("email");

    if (!isEmailValid) {
      toast.error("Please fix the validation errors before proceeding");
      return;
    }

    // Additional validation checks
    if (!values.email) {
      toast.error("Please enter your email address");
      return;
    }

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await forgotPassword(values).unwrap();
      if (result.success) {
        toast.success(
          result.message || "Reset password link sent to your email!"
        );
        router.push("/reset-password");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <form className="space-y-4 text-left" onSubmit={handleSubmit(onFinish)}>
      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="email">
          Email
        </Label>
        <Input
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 border border-gray-300"
          id="email"
          type="email"
          placeholder="Email"
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

      <Button
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50"
        type="submit"
        disabled={isLoading || !isValid || !email}
      >
        {isLoading ? "Sending..." : "Send Reset Password Link"}
      </Button>
    </form>
  );
};

export default FortgetPassForm;
