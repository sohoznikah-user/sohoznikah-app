"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface RegisterFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  accountType: string;
}

const accountTypes = [
  { id: "GroomBride", title: "পাত্র/পাত্রী হিসেবে" },
  { id: "Guardian", title: "অভিভাবক হিসেবে" },
  { id: "Matchmaker", title: "ঘটক হিসেবে" },
  { id: "Visitor", title: "ভিজিটর হিসেবে" },
];

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
  });

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const result = await registerUser(values).unwrap();
      if (result.success) {
        toast.success(result.message || "Successfully registered!");
        router.push(`/login?email=${encodeURIComponent(values.email)}`);
      }
    } catch (error: any) {
      console.error("Register Error:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to register!"
      );
    }
  };

  return (
    <form className="space-y-4 text-left" onSubmit={handleSubmit(onFinish)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          className="border border-gray-300"
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

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Mobile Number</Label>
        <Input
          className="border border-gray-300"
          id="phoneNumber"
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
        <Label htmlFor="password">Password</Label>
        <Input
          className="border border-gray-300"
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
        <Label>সহজনিকাহ ম্যাট্রিমনিতে কি ভূমিকায় একাউন্ট খুলছেন?</Label>
        <RadioGroup
          className="flex flex-col gap-3"
          onValueChange={(value) => setValue("accountType", value)}
        >
          {accountTypes.map((type) => (
            <Label key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.id} id={type.id} />
              <span>{type.title}</span>
            </Label>
          ))}
        </RadioGroup>
        {errors.accountType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.accountType.message}
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
