// File: src/app/(main)/biodatas/listPageComponentes/BiodatasPageCard.tsx

"use client";
import male from "@/assets/images/male-5.svg";
import Alert from "@/components/ui/Alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { heights, maritalStatuses, occupationsList } from "@/lib/consts";
import {
  useCreateFavouriteMutation,
  useGetFavouriteByIdQuery,
} from "@/redux/features/admin/favouriteApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { getDistrictTitle, getTitleById } from "@/utils/getBanglaTitle";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export interface BiodatasPageCardProps {
  id: number;
  name: string;
  code: number;
  birthYear: string | Date;
  height: number;
  permanentAddress: string;
  occupation: string;
  maritalStatus: string;
}

export default function BioCard({
  id,
  code,
  birthYear,
  height,
  occupation,
  maritalStatus,
  permanentAddress,
}: BiodatasPageCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const router = useRouter();
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const { data: favourite } = useGetFavouriteByIdQuery(
    {
      biodataId: id,
    },
    {
      skip: !token || !user,
    }
  );
  // const { data: shortlist } = useGetShortlistByIdQuery(
  //   {
  //     biodataId: id,
  //   },
  //   {
  //     skip: !token || !user,
  //   }
  // );

  const [createFavourite, { isLoading }] = useCreateFavouriteMutation();

  const handleOnClick = () => {
    router.push(`/biodatas/${id}`);
  };
  const handleFavourite = async (type: "add" | "remove") => {
    if (!token || !user) {
      return;
    }
    try {
      const res = await createFavourite({
        biodataId: id,
      }).unwrap();
      if (res?.success) {
        if (res?.statusCode === 201) {
          toast.success(res?.message || "Added to favourite");
          setIsFavourite(true);
        } else if (res?.statusCode === 200) {
          toast.error(res?.message || "Deleted from favourite");
          setIsFavourite(false);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Card
      key={id}
      className="border-none overflow-hidden bg-gradient-to-t from-[#e6f2ff] to-[#fff0f6]"
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="w-1/3">
            {!token || !user ? (
              <Alert>
                <Heart
                  className="w-8 h-8 text-[#E25A6F]"
                  fill={isFavourite ? "#E25A6F" : "none"}
                  onClick={() =>
                    handleFavourite(isFavourite ? "remove" : "add")
                  }
                />
              </Alert>
            ) : (
              <Heart
                className="w-8 h-8 text-[#E25A6F]"
                fill={isFavourite ? "#E25A6F" : "none"}
                onClick={() => handleFavourite(isFavourite ? "remove" : "add")}
              />
            )}
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <Image src={male} alt="Male" width={80} height={40} priority />
          </div>
          <div className="w-1/3 flex flex-col items-end space-y-2">
            {/* <Badge className="text-[#00b754]">Verified</Badge> */}
            <Badge className="text-[#016ca7]">Seen</Badge>
          </div>
        </div>

        <div className="text-center mb-4 flex items-center justify-center">
          <div className="text-black bg-[#fcfafd] p-3 rounded-md">
            বায়োডাটা নং: {code || "--"}
          </div>
        </div>

        <div className="space-y-3 text-black">
          <div className="flex justify-between">
            <span>বৈবাহিক অবস্থা:</span>
            <span>{getTitleById(maritalStatuses, maritalStatus)}</span>
          </div>
          <div className="flex justify-between">
            <span>জন্মসন:</span>
            <span>
              {birthYear
                ? typeof birthYear === "string" && birthYear.length === 4
                  ? birthYear
                  : format(new Date(birthYear), "yyyy")
                : "--"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>উচ্চতা:</span>
            <span>{getTitleById(heights, String(height))}</span>
          </div>
          <div className="flex justify-between">
            <span>স্থায়ী ঠিকানা:</span>
            <span>{getDistrictTitle(permanentAddress)}</span>
          </div>
          <div className="flex justify-between">
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
          className="w-full text-white bg-[#E25A6F]  hover:bg-[#D14A5F]"
          onClick={handleOnClick}
        >
          বায়োডাটা দেখুন
        </Button>
      </CardFooter>
    </Card>
  );
}
