import Link from "next/link";
import VerifyForm from "./VerifyForm";

const VerifyEmailPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-3 text-center">Verify Email</h2>

      <ul className="text-md text-gray-600 text-justify mb-5 list-disc pl-5">
        <li>
          আপনার ইমেইলে একটি OTP পাঠানো হয়েছে। অনুগ্রহ করে আপনার ইনবক্স (এবং
          স্প্যাম ফোল্ডার) চেক করুন এবং ভেরিফিকেশন কমপ্লিট করুন।
        </li>
        <li>
          (OTP ভ্যালিড থাকবে ৫ মিনিট। ৫ মিনিট অতিক্রম করলে "Resend OTP" দিন এবং
          পুনরায় ইনবক্স চেক করুন।)
        </li>
        <li>
          ইমেইল ভুল দিয়ে থাকলে "Change Email" বাটনে গিয়ে ইমেইল এড্রেস ঠিক করুন।
        </li>
      </ul>
      <VerifyForm />

      <div className="mt-5">
        <p className="text-sm text-gray-600 text-center">
          Already Verified? Please{" "}
          <Link href="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
