import Link from "next/link";
import VerifyForm from "./VerifyForm";

const VerifyEmailPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6 text-center">Verify Email</h2>
      <VerifyForm />
      <p className="text-sm text-gray-600 mt-3 text-center">
        Already Verified? Please{" "}
        <Link href="/login" className="text-blue-500 hover:underline ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmailPage;
