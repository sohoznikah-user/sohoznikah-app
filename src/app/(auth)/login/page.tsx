import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form className="space-y-4 text-left">
        <div className="space-y-2">
          <Label className="block font-medium" htmlFor="emailMobileNumber">
            Email/Mobile Number
          </Label>
          <Input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="emailMobileNumber"
            type="text"
            placeholder="Email/Mobile Number"
          />
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
          />
          <Link
            href="/forgot-password"
            className="text-blue-500 text-sm mt-1 inline-block hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F]">
          Login
        </Button>
      </form>
      <p className="text-sm text-gray-600 mt-3 text-center">
        Don&apos;t have an account?
        <Link href="/register" className="text-blue-500 hover:underline ml-1">
          Register
        </Link>
      </p>
    </>
  );
}
