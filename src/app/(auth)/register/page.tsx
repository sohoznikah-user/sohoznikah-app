import { Metadata } from "next";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const metadata: Metadata = {
  title: "Registration",
};

export default function RegistrationPage() {
  const accountTypes = [
    "পাত্র/পাত্রী হিসেবে",
    "অভিভাবক হিসেবে",
    "ঘটক হিসেবে",
    "ভিজিটর হিসেবে",
  ]; // TO:DO get from DB

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Registration</h2>
      <form className="space-y-4 text-left">
        <div className="space-y-2">
          <Label className="block font-medium" htmlFor="name">
            Name
          </Label>
          <Input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="name"
            type="text"
            placeholder="Name"
          />
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
          />
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
        </div>

        <div className="space-y-2">
          <Label className="block font-medium">
            সহজনিকাহ ম্যাট্রিমনিতে কি ভূমিকায় একাউন্ট খুলছেন?
          </Label>
          <RadioGroup className="flex flex-col gap-3">
            {accountTypes.map((type) => (
              <Label key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} />
                <span className="capitalize">{type}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <Button className="w-full bg-[#E25A6F] text-white py-2 rounded-md hover:bg-[#D14A5F]">
          Register
        </Button>
      </form>

      <p className="text-sm mt-3 text-center">
        Already have an account?
        <Link href="/login" className="text-blue-500 hover:underline ml-1">
          Login
        </Link>
      </p>
    </>
  );
}
