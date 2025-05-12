import { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Registration",
};

export default function RegistrationPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Registration</h2>
      <RegisterForm />

      <p className="text-sm mt-3 text-center">
        Already have an account?
        <Link href="/login" className="text-blue-500 hover:underline ml-1">
          Login
        </Link>
      </p>
    </>
  );
}
