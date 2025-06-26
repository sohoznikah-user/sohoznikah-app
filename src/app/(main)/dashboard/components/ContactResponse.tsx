"use client";
import {
  useGetMyContactQuery,
  useUpdateContactMutation,
} from "@/redux/features/admin/contactApi";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { useState } from "react";
import { toast } from "sonner";

const ContactResponse = () => {
  const [response, setResponse] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [updateContactResponse, { isLoading: isUpdateContactResponseLoading }] =
    useUpdateContactMutation();

  const type = "received";
  const { data: contactData, isLoading: isContactLoading } =
    useGetMyContactQuery({
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
                className={`border border-black text-black hover:bg-[#016ca7] hover:text-white px-4 py-1 rounded-full cursor-pointer ${
                  id === item?.id && response === "YES"
                    ? " bg-[#016ca7] text-white"
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
                className={` border border-black text-black hover:bg-[#016ca7] hover:text-white px-4 py-1 rounded-full cursor-pointer ${
                  id === item?.id && response === "NO"
                    ? " bg-[#016ca7] text-white"
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
