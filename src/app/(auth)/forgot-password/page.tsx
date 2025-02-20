import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Forgot Password
      </h2>
      <form className="space-y-4 text-left">
        <div className="space-y-2">
          <Label className="block font-medium" htmlFor="email">
            Email
          </Label>
          <Input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="email"
            type="text"
            placeholder="Email"
          />
        </div>

        <Button className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F]">
          Send Reset Password Link
        </Button>
      </form>
      <p className="text-sm text-gray-600 mt-3 text-center">
        Already have an account?
        <Link href="/login" className="text-blue-500 hover:underline ml-1">
          Login
        </Link>
      </p>
    </>
  );
}
