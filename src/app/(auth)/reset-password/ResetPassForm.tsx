"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassForm = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<ResetPasswordFormValues>({
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const onFinish = async (values: ResetPasswordFormValues) => {
    // Validate all fields before proceeding
    const isNewPasswordValid = await trigger("newPassword");
    const isConfirmPasswordValid = await trigger("confirmPassword");

    if (!isNewPasswordValid || !isConfirmPasswordValid) {
      toast.error("Please fix the validation errors before proceeding");
      return;
    }

    // Additional validation checks
    if (!values.newPassword || !values.confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Password length validation
    if (values.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Password match validation
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await resetPassword({
        newPassword: values.newPassword,
      }).unwrap();
      if (result.success) {
        toast.success(result.message || "Password reset successful!");
        router.push("/login");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <form className="space-y-4 text-left" onSubmit={handleSubmit(onFinish)}>
      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="newPassword">
          New Password
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="newPassword"
          type="password"
          placeholder="New Password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="confirmPassword">
          Confirm Password
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50"
        type="submit"
        disabled={isLoading || !isValid || !newPassword || !confirmPassword}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default ResetPassForm;
