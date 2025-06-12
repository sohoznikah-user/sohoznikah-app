// File: src/app/(main)/biodatas/[id]/viewBioDataComponents/AddressInfo.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressInfoFormData } from "@/lib/types";
import { IBiodata } from "@/utils/mapApiToBiodataFormData";
import { ArrowRight } from "lucide-react";

export default function AddressInfo({
  biodata,
  addressInfoFormData,
}: {
  biodata?: IBiodata;
  addressInfoFormData: AddressInfoFormData;
}) {
  // console.log("addressInfoFormData", addressInfoFormData);
  return (
    <Card className="border-gray-200 bg-[#fcfcfc] text-black  lg:max-w-[450px] min-w-auto">
      <CardHeader>
        <CardTitle className="text-[#004972] text-center  text-3xl font-normal">
          ঠিকানা
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-1/2">স্থায়ী ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {addressInfoFormData?.addresses?.map((addr, index) => (
              <ul key={index}>
                {addr?.location === "bangladesh" &&
                  addr?.type === "permanent_address" && (
                    <li className="flex justify-start items-center gap-3">
                      <ArrowRight size={19} /> {addr?.permanentHomeAddress},{" "}
                      {addr?.city}, {addr?.state}
                    </li>
                  )}
                {addr?.location === "foreign" &&
                  addr?.type === "permanent_address" && (
                    <li className="flex justify-start items-center gap-3">
                      <ArrowRight size={19} /> {addr?.city}, {addr?.state},{" "}
                      {addr?.country}
                    </li>
                  )}
              </ul>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">বর্তমান ঠিকানা:</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {addressInfoFormData?.addresses?.map((addr, index) => (
              <ul key={index}>
                {addr?.location === "bangladesh" &&
                  addr?.type === "current_address" && (
                    <li className="flex justify-start items-center gap-3">
                      <ArrowRight size={19} /> {addr?.permanentHomeAddress},{" "}
                      {addr?.city}, {addr?.state}
                    </li>
                  )}
                {addr?.location === "foreign" &&
                  addr?.type === "current_address" && (
                    <li className="flex justify-start items-center gap-3">
                      <ArrowRight size={19} /> {addr?.city}, {addr?.state},{" "}
                      {addr?.country}
                    </li>
                  )}
              </ul>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-1/2">কোথায় বেড়ে উঠেছেন?</div>
          <div className="w-1/2 pl-2 border-l border-gray-200">
            {addressInfoFormData?.addresses?.map(
              (addr, index) =>
                addr?.type === "grown_up" && (
                  <div key={index}>
                    <p className="flex justify-start items-center gap-3">
                      {addr?.detail}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
