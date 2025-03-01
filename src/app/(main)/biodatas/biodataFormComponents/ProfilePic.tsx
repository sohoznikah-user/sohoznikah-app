"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import male1 from "@/assets/images/male-1.svg";
import male2 from "@/assets/images/male-2.svg";
import male3 from "@/assets/images/male-3.svg";
import male4 from "@/assets/images/male-4.svg";
import male5 from "@/assets/images/male-5.svg";
import male6 from "@/assets/images/male-6.svg";
import female1 from "@/assets/images/female-1.svg";
import female2 from "@/assets/images/female-2.svg";
import female3 from "@/assets/images/female-3.svg";
import female4 from "@/assets/images/female-4.svg";
import female5 from "@/assets/images/female-5.svg";
import female6 from "@/assets/images/female-6.svg";

export default function ProfilePic() {
  const isMale = true;
  let images = [];
  if (isMale) {
    images = [male1, male2, male3, male4, male5, male6];
  } else {
    images = [female1, female2, female3, female4, female5, female6];
  }
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">প্রোফাইল পিকচার</div>
      <div className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
        <div>
          আপনার সাথে মানানসই বা সামঞ্জস্যপূর্ণ একটি প্রোফাইল পিকচার বাছাই করুন:
        </div>
        <div className="flex flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-1/3 mb-4 flex items-center justify-center relative"
            >
              <div
                className={`border p-12 rounded-3xl cursor-pointer transition-all relative ${
                  selectedImage === image
                    ? "border-[#E25A6F] ring-2 ring-[#E25A6F]"
                    : "border-gray-300"
                } `}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`Male${index + 1}`}
                  width={120}
                  height={40}
                  priority
                />
                {selectedImage === image && (
                  <CheckCircle className="absolute top-4 right-4 text-[#E25A6F]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-4xl w-full space-x-2">
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
