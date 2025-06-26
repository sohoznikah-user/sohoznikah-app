// File: src/app/(main)/biodatas/listPageComponentes/BiodatasPageCard.tsx

"use client";
import female from "@/assets/images/female-1.svg";
import male from "@/assets/images/male-5.svg";
import NeedLoginModal from "@/components/shared/NeedLoginModal";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { heights, maritalStatuses, occupationsList } from "@/lib/consts";
import { useCreateFavouriteMutation } from "@/redux/features/admin/favouriteApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  getBanglaDistrictAndUpazila,
  getTitleById,
} from "@/utils/getBanglaTitle";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export interface BiodatasPageCardProps {
  id: string;
  name: string;
  code: string;
  profilePic: string;
  birthYear: string | Date;
  height: number;
  permanentAddress: string;
  occupation: string;
  maritalStatus: string;
  biodataType: string;
  isFavourite: boolean;
  isSeen: boolean;
}

export default function BioCard(biodata: BiodatasPageCardProps) {
  const {
    id,
    code,
    biodataType,
    profilePic,
    birthYear,
    height,
    occupation,
    maritalStatus,
    permanentAddress,
    isFavourite,
    isSeen,
  } = biodata;

  const router = useRouter();
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const emailVerified = useAppSelector((state) => state.auth.emailVerified);
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const myBiodataData = useAppSelector((state) => state.biodata.biodata);

  const [createFavourite, { isLoading }] = useCreateFavouriteMutation();

  const handleOnClick = (id: string) => {
    if (typeof id !== "string") {
      console.error("Invalid ID provided:", id);
      return;
    }
    router.push(`/biodatas/${id}`);
  };

  const handleFavourite = async (type: "add" | "remove") => {
    if (!user || !token) {
      const redirectUrl = `/biodatas`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    } else if (!emailVerified) {
      router.push("/verify-email");
      toast.error("আপনার ইমেইলটি ভেরিফাই করুন।");
      return;
    } else if (myBiodataData?.status !== "APPROVED") {
      toast.error(
        user?.role === "SUPER_ADMIN"
          ? "আপনি সুপার অ্যাডমিন। আপনার এখানে এক্সেস নেই।"
          : "বায়োডাটা তৈরী এবং এপ্রুভ করা থাকতে হবে"
      );
      handleReset();
      return;
    }
    const favouriteData = {
      biodataId: id,
    };
    try {
      const res = await createFavourite(favouriteData).unwrap();
      if (res?.success) {
        if (res?.statusCode === 201) {
          toast.success("ফেভারিট লিস্টে যোগ করা হয়েছে");
        } else if (res?.statusCode === 200) {
          toast.error("ফেভারিট লিস্ট থেকে মুছে ফেলা হয়েছে");
        }
      }
    } catch (error) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন");
    } finally {
      handleReset();
    }
  };

  const handleReset = () => {
    setIsModalOpen(null);
  };

  const profileImage = biodataType === "BRIDE" ? female : male;

  return (
    <>
      <Card
        key={id}
        className="border-none overflow-hidden bg-gradient-to-t from-[#e6f2ff] to-[#fff0f6]  min-w-auto md:max-w-[365px]  mx-auto"
      >
        <CardContent className="md:p-7 p-5 lg:p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-1/3">
              <Heart
                className="w-8 h-8 text-[#E25A6F] cursor-pointer"
                fill={isFavourite ? "#E25A6F" : "none"}
                onClick={() =>
                  setIsModalOpen(!token || !user ? "login" : "favourite")
                }
              />
            </div>
            <div className="w-1/3 flex items-center justify-center mt-3">
              <Image
                src={profilePic || profileImage}
                alt="Profile"
                width={80}
                height={40}
                priority
              />
            </div>
            <div className="w-1/3 flex flex-col items-end space-y-2">
              <Badge className="text-[#00b754]">Verified</Badge>
              {token && user && isSeen && (
                <Badge className="text-[#00b754]">Seen</Badge>
              )}
            </div>
          </div>

          <div className="text-center mb-4 flex items-center justify-center">
            <div className="text-black bg-[#fcfafd] p-3 rounded-md">
              বায়োডাটা নং: {code || "--"}
            </div>
          </div>

          <div className="space-y-2 text-black">
            <div className="flex justify-between text-md">
              <span>বৈবাহিক অবস্থা:</span>
              <span>{getTitleById(maritalStatuses, maritalStatus)}</span>
            </div>
            <div className="flex justify-between  text-md">
              <span>জন্মসন:</span>
              <span>
                {birthYear ? format(new Date(birthYear), "yyyy") : "--"}
              </span>
            </div>
            <div className="flex justify-between  text-md">
              <span>উচ্চতা:</span>
              <span>
                {heights ? getTitleById(heights, String(height)) : "--"}
              </span>
            </div>
            <div className="flex justify-between  text-md">
              <span>স্থায়ী ঠিকানা:</span>
              <span>
                {permanentAddress === "foreign" ? (
                  "বিদেশ"
                ) : (
                  <>{`${getBanglaDistrictAndUpazila(
                    permanentAddress?.split(",")[0],
                    permanentAddress?.split(",")[1]
                  )}`}</>
                )}
              </span>
            </div>
            <div className="flex justify-between  text-md">
              <span>পেশা:</span>
              <span>
                {occupation ? (
                  <>
                    {getTitleById(occupationsList, occupation.slice(0, 2))}
                    {occupation.length > 2 ? "..." : ""}
                  </>
                ) : (
                  "--"
                )}{" "}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-white bg-[#E25A6F]  hover:bg-[#D14A5F] text-md"
            onClick={() => handleOnClick(id)}
          >
            বায়োডাটা দেখুন
          </Button>
        </CardFooter>
      </Card>

      <NeedLoginModal
        open={isModalOpen === "login"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
      />

      <ReusableModal
        open={isModalOpen === "favourite"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        onConfirm={() => handleFavourite(isFavourite ? "remove" : "add")}
        confirmText={isFavourite ? "মুছে ফেলুন" : "যোগ করন"}
        cancelText="বাতিল"
        title={`আপনি কি ফেভারিট ${
          isFavourite ? "লিস্ট থেকে মুছে ফেলতে" : "লিস্টে যোগ করতে"
        } চান?`}
        description={`ফেভারিট  ${isFavourite ? "লিস্ট থেকে মুছে ফেলতে মুছে ফেলুন" : "লিস্টে যোগ করতে চাইলে যোগ করুন"} বাটনে ক্লিক করতে হবে।`}
      />
    </>
  );
}
