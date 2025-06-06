"use client";

import bkash from "@/assets/images/bkash.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tokenOptions } from "@/lib/consts";
import { useCreateTokenMutation } from "@/redux/features/admin/tokenApi";
import { Copy, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES AND SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

type Bundle = {
  id: string;
  title: string;
  tokenTitle: string;
  tokenCount: number;
  price: number;
};

const PREDEFINED_BUNDLES: Bundle[] = [
  {
    id: "BUNDLE1",
    title: "বান্ডেল  ১",
    tokenTitle: "৬",
    tokenCount: 6,
    price: 250,
  },
  {
    id: "BUNDLE2",
    title: "বান্ডেল  ২",
    tokenTitle: "১২",
    tokenCount: 12,
    price: 500,
  },
  {
    id: "BUNDLE3",
    title: "বান্ডেল  ৩",
    tokenTitle: "২৪",
    tokenCount: 24,
    price: 1000,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const UserTokenPage = () => {
  // State for selected option and custom quantity
  const [selectedOption, setSelectedOption] = useState<"custom" | string>(
    "custom"
  );
  const [customQuantity, setCustomQuantity] = useState<number>(1);

  // State to control the visibility of the payment form
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // State for payment form inputs
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [createToken, { isLoading }] = useCreateTokenMutation();

  // Handler for the "কিনুন" button
  const handleBuy = () => {
    // Show the payment form instead of directly making the API call
    setShowPaymentForm(true);
  };

  // Handler for the "Send" button in the payment form
  const handlePaymentSubmit = async () => {
    let tokenData: any = {};

    if (selectedOption === "custom") {
      tokenData = {
        tokenType: "CUSTOM",
        quantity: customQuantity,
        totalPrice: customQuantity * 50, // assuming ৫০ টাকা per token
        phoneNumber,
        transactionId,
      };
    } else {
      // A predefined bundle was selected
      const bundle = PREDEFINED_BUNDLES.find((b) => b.id === selectedOption)!;
      tokenData = {
        tokenType: bundle.id,
        quantity: bundle.tokenCount,
        totalPrice: bundle.price,
        phoneNumber,
        transactionId,
      };
    }

    try {
      const res = await createToken(tokenData).unwrap();
      if (res.success) {
        toast.success("আপনি সফলভাবে টোকেন রিকোয়েস্ট পাঠিয়েছেন।", {
          duration: 4000,
        });
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("কিনতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
    } finally {
      handleReset();
    }
  };

  const handleReset = () => {
    setShowPaymentForm(false);
    setPhoneNumber("");
    setTransactionId("");
    setSelectedOption("custom");
    setCustomQuantity(1);
  };

  return (
    <div className="min-h-[500px]  flex justify-center items-start py-16">
      {!showPaymentForm && (
        <div className="w-full max-w-3xl">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            টোকেন কিনুন
          </h1>

          {/* Main White Container */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-4 text-center bg-gray-50 px-8 py-5">
              <div className="col-span-1 text-[#005381] font-medium">
                বাছাই করুন
              </div>
              <div className="col-span-1 text-[#005381] font-medium">
                টোকেন সংখ্যা
              </div>
              <div className="col-span-1 text-[#005381] font-medium">মূল্য</div>
              <div className="col-span-1 text-[#005381] font-medium">কিনুন</div>
            </div>

            {/* CUSTOM ROW */}
            <div
              className={`grid grid-cols-4 items-center px-6 py-4 border-b border-gray-200`}
            >
              {/* Radio Button */}
              <div className="flex justify-center">
                <RadioGroup
                  value={selectedOption}
                  onValueChange={(val) => setSelectedOption(val)}
                  className="flex"
                >
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="custom"
                      id="radio-custom"
                      className={`
                      h-5 w-5 rounded-full border-1 border-[#307DA7]
                      text-[#5B8EAA] focus:ring-0
                      ${selectedOption === "custom" ? "bg-[#307DA7]" : "bg-white"}
                    `}
                    />
                    <label htmlFor="radio-custom" className="sr-only">
                      Custom Quantity
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Quantity Select  (e.g. ১, ২, ৩, ... ) × ৫০ */}
              <div className="flex justify-center space-x-2">
                <Select
                  onValueChange={(val) => setCustomQuantity(Number(val))}
                  value={String(customQuantity)}
                >
                  <SelectTrigger className="h-10 w-20 bg-white border border-gray-300 rounded-lg text-center">
                    <SelectValue placeholder="১" className="text-center" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-lg">
                    {tokenOptions.map((opt) => (
                      <SelectItem
                        key={opt.id}
                        value={String(opt.id)}
                        className="p-2 text-gray-700 hover:bg-gray-100"
                      >
                        {opt.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-green-600 font-medium mt-2">× ৳৫০</span>
              </div>

              {/* Price Column (customQuantity * ৫০) */}
              <div className="text-center text-gray-800 font-medium">
                {customQuantity * 50} টাকা
              </div>

              {/* Buy Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleBuy}
                  className={`
                  px-4 py-2 rounded-lg font-medium text-white cursor-pointer
                  ${selectedOption === "custom" ? "bg-[#E25A6F] hover:bg-[#CA2740]" : "bg-red-300 cursor-not-allowed"}
                `}
                  disabled={selectedOption !== "custom"}
                >
                  কিনুন
                </button>
              </div>
            </div>

            {/* PREDEFINED BUNDLES */}
            {PREDEFINED_BUNDLES.map((bundle) => {
              const isSelected = selectedOption === bundle.id;
              return (
                <div
                  key={bundle.id}
                  className={`grid grid-cols-4 items-center px-6 py-4 ${
                    bundle.id !==
                    PREDEFINED_BUNDLES[PREDEFINED_BUNDLES.length - 1].id
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {/* Radio Button */}
                  <div className="flex justify-center">
                    <RadioGroup
                      value={selectedOption}
                      onValueChange={(val) => setSelectedOption(val)}
                      className="flex"
                    >
                      <div className="flex items-center">
                        <RadioGroupItem
                          value={bundle.id}
                          id={`radio-${bundle.id}`}
                          className={`
                          h-5 w-5 rounded-full border-1 border-[#307DA7]
                          text-[#5B8EAA] focus:ring-0
                          ${isSelected ? "bg-[#307DA7]" : "bg-white"}
                        `}
                        />
                        <label
                          htmlFor={`radio-${bundle.id}`}
                          className="sr-only"
                        >
                          {bundle.title}
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Bundle Box: white background, rounded, with blue header and token text */}
                  <div className="flex justify-center">
                    <div className="bg-white border border-gray-200 rounded-xl text-center w-36">
                      <div className="bg-[#307DA7] text-white text-sm font-medium py-1 rounded-t-xl">
                        {bundle.title}
                      </div>
                      <div className="py-2 text-gray-700 text-xs">
                        {bundle.tokenTitle}টি টোকেন
                      </div>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="text-center text-gray-800 font-medium">
                    {bundle.price} টাকা
                  </div>

                  {/* Buy Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleBuy}
                      className={`
                      px-4 py-2 rounded-lg font-medium text-white cursor-pointer
                      ${isSelected ? "bg-[#E25A6F] hover:bg-[#CA2740]" : "bg-red-300 cursor-not-allowed"}
                    `}
                      disabled={!isSelected}
                    >
                      কিনুন
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showPaymentForm && (
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            পরিশোধ করুন
          </h2>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden p-10 relative">
            <div className="absolute top-5 right-5">
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-500 hover:text-gray-900 cursor-pointer border border-gray-200 hover:border-gray-500 rounded-lg p-1"
              >
                <X className="w-6 h-6 " />
              </button>
            </div>

            {/* Payment Method and Amount */}
            <div className="mb-4 flex justify-start items-center gap-5">
              <p className="text-gray-700 font-medium">আপনি কিনছেন:</p>

              {selectedOption === "custom" ? (
                <div className="flex items-center gap-2">
                  <div className="bg-white border border-gray-200 rounded-xl text-center px-4 py-2">
                    <div className="text-gray-700">
                      {customQuantity}টি টোকেন
                    </div>
                  </div>
                  <span className="text-gray-700">
                    <span className="font-medium">মোট মূল্য:</span>{" "}
                    {customQuantity * 50} টাকা
                  </span>
                </div>
              ) : (
                PREDEFINED_BUNDLES.find(
                  (bundle) => bundle.id === selectedOption
                ) && (
                  <div className="flex items-center gap-5">
                    <div className="bg-white border border-gray-200 rounded-xl text-center w-36">
                      <div className="bg-[#307DA7] text-white text-sm font-medium py-1 rounded-t-xl">
                        {
                          PREDEFINED_BUNDLES.find(
                            (b) => b.id === selectedOption
                          )?.title
                        }
                      </div>
                      <div className="py-2 text-gray-700 text-xs">
                        {
                          PREDEFINED_BUNDLES.find(
                            (b) => b.id === selectedOption
                          )?.tokenTitle
                        }
                        টি টোকেন
                      </div>
                    </div>
                    <span className="text-gray-700">
                      <span className="font-medium">মোট মূল্য:</span>{" "}
                      {
                        PREDEFINED_BUNDLES.find((b) => b.id === selectedOption)
                          ?.price
                      }{" "}
                      টাকা
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Bkash Number */}
            <div className="mb-4 mt-6 flex justify-start items-center gap-5">
              <div className="w-[45%]">
                <p className="text-gray-700 mb-2">
                  এই নম্বরে বিকাশ{" "}
                  <span className="text-[#AD0000] font-semibold">
                    সেন্ড মানি
                  </span>{" "}
                  করুন:
                </p>
              </div>
              <div className=" flex items-center justify-end bg-white px-3 py-6 border border-gray-300 rounded-lg w-[55%] relative gap-5">
                <div className="absolute left-3 top-1">
                  <Image src={bkash} alt="copy" width={40} height={30} />
                </div>
                <span className="text-[#AD0000] text-3xl font-semibold text-center">
                  01731 353123
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("01731353123");
                    toast.success("01731353123 নাম্বারটি কপি করা হয়েছে");
                  }}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Copy className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Instruction */}
            <p className="text-[#005280] text-sm mb-4 italic font-semibold mt-5 ">
              বিকাশ সেন্ড মানি করার পর নিচের তথ্যগুলো আমাদেরকে সেন্ড করুন। ২৪
              ঘন্টার মধ্যে আপনার ক্রয়কৃত টোকেন প্রদান করা হবে।
            </p>

            {/* Form Inputs */}
            <div className="mb-4 mt-8 flex justify-start items-center gap-5">
              <label className="flex-1 text-gray-700 font-medium mb-2">
                যে নম্বর থেকে সেন্ড মানি করেছেন:
              </label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-[55%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 mt-5 flex justify-start items-center gap-5">
              <label className="flex-1 text-gray-700 font-medium mb-2">
                ট্রানজেকশন আইডি:
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="TrxID"
                className="w-[70%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handlePaymentSubmit}
              className="w-full mt-3 bg-[#E25A6F] text-white font-medium py-2 rounded-lg hover:bg-[#CA2740]/80 transition-all duration-300 border-none border-0 cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTokenPage;
