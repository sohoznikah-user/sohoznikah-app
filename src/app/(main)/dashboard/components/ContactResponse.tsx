"use client";
import {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useUpdateContactMutation,
} from "@/redux/features/admin/contactApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ContactResponse = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const [response, setResponse] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [createContact, { isLoading: isCreateContactLoading }] =
    useCreateContactMutation();
  const router = useRouter();
  const [updateContactResponse, { isLoading: isUpdateContactResponseLoading }] =
    useUpdateContactMutation();

  const type = "received";
  const { data: contactData, isLoading: isContactLoading } =
    useGetAllContactsQuery({
      type,
    });

  const filterdContactData = contactData?.data?.filter(
    (item: any) => item?.contactStatus === "PENDING"
  );

  const handleResponse = async () => {
    if (!id || !response) {
      toast.error("দয়া করে হ্যাঁ বা না সিলেক্ট করুন");
      return;
    }
    try {
      const res = await updateContactResponse({
        id: id,
        updatedData: { response: response },
      }).unwrap();
      if (res?.success) {
        if (response === "YES") {
          toast.success(
            "আপনি সম্মতি দিয়েছেন। অপর পক্ষ আপনার যোগাযোগ নম্বর নিতে পারবেন।"
          );
        } else if (response === "NO") {
          toast.success(
            "আপনি অসম্মতি দিয়েছেন। অপর পক্ষ আপনার যোগাযোগ নম্বর নিতে পারবেন না।"
          );
        }
      } else {
        toast.error(
          "আপনি সম্মতি দেননি। অপর পক্ষ আপনার যোগাযোগ নম্বর নিতে পারবেন না।"
        );
      }
    } catch (error) {
      toast.error("কোনো কিছু ভুল হয়েছে। পুনরায় চেষ্টা করুন");
    }
  };

  // create contact access
  // const handleCreateContactAccess = async (biodataId: string) => {
  //   if (!token || !user) {
  //     toast.error("অনুরোধ পাঠাতে চাইলে প্রথমে লগ ইন করতে হবে।");
  //     return;
  //   }
  //   const contactData = {
  //     biodataId: biodataId,
  //   };
  //   try {
  //     const res = await createContact(contactData).unwrap();
  //     if (res?.success) {
  //       toast.success("যোগাযোগ নাম্বার এর জন্য অনুরোধ পাঠানো হয়েছে");
  //     } else {
  //       toast.error("যোগাযোগ নাম্বার এর জন্য অনুরোধ পাঠানো হয়নি");
  //     }
  //   } catch (error: any) {
  //     if (error.message === "Not enough tokens") {
  //       toast.error("আপনার পর্যাপ্ত টোকেন নেই। দয়া করে টোকেন কিনুন।");
  //       router.push("/dashboard/token");
  //       return;
  //     } else if (error.message === "Unique constraint violation.") {
  //       toast.error("আপনি একই বায়োডাটার জন্য অনুরোধ পাঠাতে পারবেন না");
  //       return;
  //     }
  //     toast.error(error?.message || "অনুরোধ পাঠানো হয়নি");
  //   }
  // };

  return (
    <div className=" w-[96%] mx-5 flex flex-col gap-4">
      {filterdContactData?.map((item: any) => (
        <div
          className=" py-3 rounded-2xl bg-[#FFDA76] z-10 px-5"
          key={item?.id}
        >
          <div className="flex lg:flex-row flex-col gap-2 justify-between items-center">
            <h1 className="text-black text-md text-center">
              আপনার বায়োডাটা একজন পছন্দ করেছেন এবং অভিভাবকের যোগাযোগ নম্বর নিতে
              চাচ্ছেন। আপনি রাজি আছেন?
            </h1>
            <div className="flex gap-2 items-center ">
              <button
                className={`bg-transparent border border-black text-black hover:bg-gray-500 hover:text-white px-4 py-1 rounded-full cursor-pointer ${
                  response === "YES"
                    ? "bg-gradient-to-r from-[#e25a6f] to-[#016ca7]"
                    : ""
                }`}
                onClick={() => {
                  setResponse("YES");
                  setId(item?.id);
                }}
              >
                হ্যাঁ
              </button>
              <button
                className={`bg-transparent border border-black text-black hover:bg-gray-500 hover:text-white px-4 py-1 rounded-full cursor-pointer ${
                  response === "NO"
                    ? "bg-gradient-to-r from-[#e25a6f] to-[#016ca7]"
                    : ""
                }`}
                onClick={() => {
                  setResponse("NO");
                  setId(item?.id);
                }}
              >
                না
              </button>
              <button
                className="bg-[#D75656] text-white px-4 py-1 rounded-full cursor-pointer"
                onClick={() => handleResponse()}
              >
                Send
              </button>

              <p className="text-md font-semibold text-black ml-2">
                (
                {getTimeDifference(
                  item.contactExpiredAt,
                  new Date().toISOString()
                )}
                )
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactResponse;
