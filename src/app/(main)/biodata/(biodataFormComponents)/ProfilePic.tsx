import { Button } from "@/components/ui/button";

export default function ProfilePic() {
  const isMale = true;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">প্রোফাইল পিকচার</div>
      <div className="max-w-5xl w-full text-[#005889] flex flex-col space-y-6">
        {isMale && (
          <>
            <div>
              আপনার সাথে মানানসই বা সামঞ্জস্যপূর্ণ একটি প্রোফাইল পিকচার বাছাই
              করুন:
            </div>
          </>
        )}
        {!isMale && (
          <>
            <div>
              আপনার সাথে মানানসই বা সামঞ্জস্যপূর্ণ একটি প্রোফাইল পিকচার বাছাই
              করুন:
            </div>
          </>
        )}
      </div>
      <div className="max-w-5xl w-ful space-x-2">
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Previous
        </Button>
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Next
        </Button>
      </div>
    </div>
  );
}
