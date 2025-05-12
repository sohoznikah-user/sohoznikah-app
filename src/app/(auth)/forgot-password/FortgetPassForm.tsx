"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface ForgotPasswordFormValues {
  email: string;
}

const FortgetPassForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onFinish = async (values: any) => {
    try {
      const result = await forgotPassword(values).unwrap();
      //   console.log(result);
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message || "Reset password link sent to your email!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/reset-password");
      } else {
        Swal.fire({
          title: "Error",
          text: result.message || "Something went wrong!",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      Swal.fire({
        title: "Error",
        text: error?.message || "Something went wrong!",
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
          Email
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="email"
          type="text"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
      </div>

      <Button
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F]"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Reset Password Link"}
      </Button>
    </form>
  );
};

export default FortgetPassForm;
