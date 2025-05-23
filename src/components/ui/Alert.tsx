import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

const Alert = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-black">
        <AlertDialogHeader>
          <AlertDialogTitle>
            এই ফিচারটি ব্যবহার করতে চাইলে আপনাকে লগইন করতে হবে।
          </AlertDialogTitle>
          {/* <AlertDialogDescription>
            এই ফিচারটি ব্যবহার করতে চাইলে আপনাকে লগইন করতে হবে।
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-900 text-white">
            বাতিল
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogin}
            className=" text-white bg-[#E25A6F]  hover:bg-[#D14A5F]"
          >
            লগিন
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
