"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface VerifyFormValues {
  email: string;
  otp: string;
}

const VerifyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormValues>({
    mode: "onChange",
    defaultValues: { email: "", otp: "" },
  });

  useEffect(() => {
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    if (email) {
      setValue("email", email);
    }
    if (otp) {
      setValue("otp", otp);
    }
  }, [searchParams, setValue]);

  const handleVerifyEmail = async (values: VerifyFormValues) => {
    const verifyData = {
      email: values.email,
      otp: Number(values.otp),
    };

    try {
      const res = await verifyEmail(verifyData).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Email has been verified!");
        router.push("/login");
      } else {
        toast.error(res?.message || "Failed to verify your email!");
      }
    } catch (error: any) {
      console.error("Error verifying email:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to verify your email!"
      );
    }
  };

  const isEmailAutoFilled = !!searchParams.get("email");
  const isOtpAutoFilled = !!searchParams.get("otp");

  return (
    <form
      onSubmit={handleSubmit(handleVerifyEmail)}
      className="space-y-4 w-full max-w-md"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          disabled={isEmailAutoFilled}
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

      <div className="space-y-2">
        <Label htmlFor="otp">OTP</Label>
        <Input
          id="otp"
          type="text" // Changed to text to handle string OTPs
          placeholder="OTP"
          disabled={isOtpAutoFilled}
          {...register("otp", {
            required: "OTP is required",
          })}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>

      <Button
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50"
        type="submit"
        disabled={isLoading || isSubmitting}
      >
        {isLoading || isSubmitting ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
};

export default VerifyForm;
