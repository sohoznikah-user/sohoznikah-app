"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface RegisterFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  accountType: string;
}

const RegisterForm = () => {
  const accountTypes = [
    "পাত্র/পাত্রী হিসেবে",
    "অভিভাবক হিসেবে",
    "ঘটক হিসেবে",
    "ভিজিটর হিসেবে",
  ];
  const [accountType, setAccountType] = useState("");
  const [registerUser, { isLoading }] = useUserRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
  });

  const onFinish = async (values: RegisterFormValues) => {
    if (!accountType) {
      toast.error("Please select an account type");
      return;
    }

    console.log(values);
    const registerData = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      accountType: accountType,
    };
    console.log(registerData);
    try {
      const result = await registerUser(registerData).unwrap();
      if (result.success) {
        toast.success(result.message || "Successfully registered!");

        router.push("/login");
      }
    } catch (error: any) {
      console.error("Register Error:", error);
      toast.error(error?.message || "Failed to register!");
    }
  };

  return (
    <form className="space-y-4 text-left" onSubmit={handleSubmit(onFinish)}>
      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="name">
          Name
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="name"
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="email">
          Email
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

      <div className="space-y-2">
        <Label className="block font-medium" htmlFor="mobile">
          Mobile Number
        </Label>
        <Input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="mobile"
          type="text"
          placeholder="Mobile Number"
          {...register("phoneNumber", {
            required: "Mobile Number is required",
            pattern: {
              value: /^[0-9]{11}$/,
              message: "Please enter a valid 11-digit mobile number",
            },
          })}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
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
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="block font-medium">
          সহজনিকাহ ম্যাট্রিমনিতে কি ভূমিকায় একাউন্ট খুলছেন?
        </Label>
        <RadioGroup
          className="flex flex-col gap-3"
          value={accountType}
          onValueChange={setAccountType}
        >
          {accountTypes.map((type) => (
            <Label key={type} className="flex items-center space-x-2">
              <RadioGroupItem value={type} id={type} />
              <span className="capitalize">{type}</span>
            </Label>
          ))}
        </RadioGroup>
        {!accountType && (
          <p className="text-red-500 text-sm mt-1">
            Please select an account type
          </p>
        )}
      </div>

      <Button
        className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F] disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
