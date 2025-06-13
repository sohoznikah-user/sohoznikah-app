"use client";
import female from "@/assets/images/female-5.svg";
import male from "@/assets/images/male-5.svg";
import NeedLoginModal from "@/components/shared/NeedLoginModal";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCreateFavouriteMutation,
  useGetFavouriteByIdQuery,
} from "@/redux/features/admin/favouriteApi";
import {
  useCreateShortlistMutation,
  useGetShortlistByIdQuery,
} from "@/redux/features/admin/shortlistApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";
import { CircleChevronDown, Copy, Heart, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfileCard = ({
  biodataId,
  biodata,
  myBiodata,
  isAdmin,
}: {
  biodataId: string;
  biodata: IBiodata;
  myBiodata: boolean;
  isAdmin?: boolean;
}) => {
  console.log("biodata from profile card", biodata);
  console.log("biodataId from profile card", biodataId);
  console.log("myBiodata from profile card", myBiodata);
  console.log("isAdmin from profile card", isAdmin);

  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const { data: favourite } = useGetFavouriteByIdQuery(biodataId, {
    skip: !biodataId || !token || !user,
  });
  const { data: shortlist } = useGetShortlistByIdQuery(biodataId, {
    skip: !biodataId || !token || !user,
  });

  const [createFavourite, { isLoading }] = useCreateFavouriteMutation();
  const [createShortlist, { isLoading: isCreatingShortlist }] =
    useCreateShortlistMutation();

  useEffect(() => {
    if (favourite?.success) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favourite]);

  useEffect(() => {
    if (shortlist?.success) {
      setIsShortlisted(true);
    } else {
      setIsShortlisted(false);
    }
  }, [shortlist]);
  // console.log("shortlist", shortlist?.success);

  const handleFavourite = async (type: "add" | "remove") => {
    if (!token || !user) {
      setIsModalOpen("login");
    }
    try {
      const res = await createFavourite({
        biodataId: biodataId,
      }).unwrap();
      if (res?.success) {
        if (res?.statusCode === 201) {
          toast.success("ফেভারিট লিস্টে যোগ করা হয়েছে");
          setIsFavourite(true);
        } else if (res?.statusCode === 200) {
          toast.error("ফেভারিট লিস্ট থেকে মুছে ফেলা হয়েছে।");
          setIsFavourite(false);
        }
      }
    } catch (error) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন");
    } finally {
      handleReset();
    }
  };
  const handleShortlist = async (type: "add" | "remove") => {
    if (!token || !user) {
      setIsModalOpen("login");
    }
    try {
      const res = await createShortlist({
        biodataId: biodataId,
      }).unwrap();
      if (res?.success) {
        if (res?.statusCode === 201) {
          toast.success("চুড়ান্ত তালিকায় যোগ করা হয়েছে");
          setIsFavourite(true);
        } else if (res?.statusCode === 200) {
          toast.error("চুড়ান্ত তালিকা থেকে মুছে ফেলা হয়েছে");
          setIsFavourite(false);
        }
      }
    } catch (error) {
      toast.error("কিছু ভুল হয়েছে। আবার চেষ্টা করুন");
    } finally {
      handleReset();
    }
  };

  const handleCopyUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("লিংক কপি করা হয়েছে");
    } catch (error) {
      toast.error("লিংক কপি করা হয়নি");
    }
  };

  const handleReset = () => {
    setIsModalOpen(null);
    setIsFavourite(false);
    setIsShortlisted(false);
  };

  const status = biodata?.status === "APPROVED" ? "Verified" : "Unverified";
  const code = biodata?.code || "SNM---";
  const profileImage = biodata?.biodataType === "GROOM" ? male : female;

  return (
    <>
      <Card className="bg-white text-black border-none rounded-4xl lg:max-w-[450px] w-full min-w-auto">
        <CardContent className="pt-8">
          <div
            className={`flex flex-col items-center ${isAdmin || myBiodata ? " justify-center" : ""} space-y-4 `}
          >
            <div className="w-full flex items-start justify-between">
              <div className="w-1 text-[#00b754] text-md font-semibold">
                {status}
              </div>
              <Image
                src={biodata?.profilePic || profileImage}
                alt="Profile"
                width={isAdmin || myBiodata ? 170 : 100}
                height={40}
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = male;
                }}
              />
              <div className="w-1"></div>
            </div>

            <div className="text-lg">
              বায়োডাটা কোড: <span className="font-semibold">{code}</span>
            </div>

            {!myBiodata && !isAdmin && (
              <div className="flex space-x-4 border border-gray-400 rounded-xl p-4 ">
                <Heart
                  className={`h-6 w-6 cursor-pointer ${
                    isFavourite ? "text-[#e25a6f]" : "text-black"
                  }`}
                  onClick={() =>
                    setIsModalOpen(!token || !user ? "login" : "favourite")
                  }
                  fill={isFavourite ? "red" : "white"}
                />

                <Star
                  className={`h-6 w-6 cursor-pointer ${
                    isShortlisted ? "text-[#e25a6f]" : "text-black"
                  }`}
                  onClick={() =>
                    setIsModalOpen(!token || !user ? "login" : "shortlist")
                  }
                  fill={isShortlisted ? "#FFCD06" : "white"}
                />

                <Copy
                  className="h-6 w-6 rotate-90 cursor-pointer hover:text-[#e25a6f]"
                  onClick={handleCopyUrl}
                />
                {/* <Mail className="h-6 w-6" /> */}
                <CircleChevronDown className="h-6 w-6 text-[#b52d1f]" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal for login */}
      <NeedLoginModal
        open={isModalOpen === "login"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
      />

      {/* Modal for favourite */}
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

      {/* Modal for shortlist */}
      <ReusableModal
        open={isModalOpen === "shortlist"}
        onClose={() => setIsModalOpen(null)}
        loading={isLoading}
        onConfirm={() => handleShortlist(isShortlisted ? "remove" : "add")}
        confirmText={isShortlisted ? "মুছে ফেলুন" : "যোগ করন"}
        cancelText="বাতিল"
        title={`আপনি কি চুড়ান্ত  ${
          isShortlisted ? "তালিকা থেকে মুছে ফেলতে" : "তালিকায় যোগ করতে"
        } চান?`}
        description={`চুড়ান্ত ${isShortlisted ? "তালিকা থেকে মুছে ফেলতে মুছে ফেলুন" : "তালিকায় যোগ করতে যোগ করুন"} বাটনে ক্লিক করতে হবে।`}
      />
    </>
  );
};

export default ProfileCard;
