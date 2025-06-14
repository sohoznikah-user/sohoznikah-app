"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeEmailMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ChangeEmailValues {
  email: string;
}

const ChangeEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [changeEmail, { isLoading }] = useChangeEmailMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailValues>({
    mode: "onChange",
    defaultValues: { email: "" },
  });

  useEffect(() => {
    const email = searchParams.get("email");

    if (email) {
      setValue("email", email);
    }
  }, [searchParams, setValue]);

  const handleChangeEmail = async (values: ChangeEmailValues) => {
    const changeEmailData = {
      email: values.email,
    };

    try {
      const res = await changeEmail(changeEmailData).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Email has been changed!");
        router.push(`/verify-email?email=${values.email}`);
      } else {
        toast.error(res?.message || "Failed to change email!");
      }
    } catch (error: any) {
      console.error("Error changing email:", error);
      toast.error(error?.message || "Failed to change email!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleChangeEmail)}
        className="space-y-4 w-full max-w-md"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className="border border-gray-300"
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button
          className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50 mt-3"
          type="submit"
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? "Changing..." : "Change"}
        </Button>
      </form>
      {/* <div className="flex gap-1 mt-5 justify-between items-center w-full px-4">
        <button
          disabled={isResendOTPLoading}
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleResendOTP({ email: searchParams.get("email") })}
        >
          Resend OTP
        </button>
        <button
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500"
          onClick={() =>
            handleChangeEmail({ email: searchParams.get("email") })
          }
        >
          Change Email
        </button>
        <button
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500"
          onClick={() => handleResendOTP({ email: searchParams.get("email") })}
        >
          Logout
        </button>
      </div> */}
    </>
  );
};

export default ChangeEmailForm;
