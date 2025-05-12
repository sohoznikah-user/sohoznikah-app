import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <LoginForm />
      <p className="text-sm text-gray-600 mt-3 text-center">
        Don&apos;t have an account?
        <Link href="/register" className="text-blue-500 hover:underline ml-1">
          Register
        </Link>
      </p>
    </>
  );
}
