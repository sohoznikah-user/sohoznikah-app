// File: src/components/navbar/index.tsx
"use client";
import female from "@/assets/images/female-1.svg";
import logo from "@/assets/images/logo.svg";
import male from "@/assets/images/male-5.svg";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export interface MenuItem {
  name: string;
  route: string;
}

export function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.acesstoken);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileImage = biodata?.biodataType === "GROOM" ? male : female;

  const menuItems: MenuItem[] = [
    {
      name: "হোম",
      route: "/",
    },
    {
      name: "টিউটোরিয়াল",
      route: "/tutorial",
    },
    {
      name: "যোগাযোগ",
      route: "/contact-us",
    },
    {
      name: "প্রশ্ন-উত্তর",
      route: "/faq",
    },
  ];

  const test = {
    name: "test",
    profilePicture:
      "http://localhost:3000/_next/static/media/male.b7323272.svg",
  };

  return (
    <div className="relative py-2  px-4 text-[#1f4f69] bg-transparent border-b border-gray-200">
      <div className="flex items-center z-50 justify-between lg:justify-center container mx-auto">
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden fixed top-6 left-5 px-2 py-1 bg-white rounded-lg cursor-pointer text-[#1f4f69] border-[#1f4f69] focus:outline-none z-50"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Menu - Desktop */}
        <NavigationMenu className=" w-full hidden lg:block">
          <NavigationMenuList className="flex space-x-2 justify-start">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.route}
                  className="hover:text-[#1b3c50] hover:bg-transparent text-lg"
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Logo - Centered on mobile, center on desktop */}
        <div className="lg:min-w-80 w-auto mx-auto flex justify-center items-center">
          <Link href="/">
            <Image src={logo} alt="Logo" width={80} height={50} priority />
          </Link>
        </div>

        {/* Right actions - Desktop */}
        <div className="w-full hidden lg:flex justify-end items-center space-x-4 text-md">
          {user?.role === "USER" && (
            <>
              {biodata?.status === "" ? (
                <Link
                  href="/biodata-editor"
                  className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md rounded-lg"
                >
                  বায়োডাটা তৈরী করুন
                </Link>
              ) : biodata?.status === "PROCESSING" ? (
                <Link
                  href="/biodata-editor"
                  className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md rounded-lg"
                >
                  বায়োডাটা সম্পূর্ণ করুন
                </Link>
              ) : biodata?.status === "PENDING" ||
                biodata?.status === "EDIT_PENDING" ? (
                <button className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md rounded-lg">
                  Pending Approval
                </button>
              ) : biodata?.status === "UPDATE_REQUESTED" ? (
                <Link
                  href="/biodata-editor"
                  className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md rounded-lg"
                >
                  এডিট সম্পূর্ণ করে পাবলিশ করুন
                </Link>
              ) : biodata?.status === "APPROVED" ? (
                <Link
                  href="/biodatas/my-biodata"
                  className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md rounded-lg"
                >
                  আমার বায়োডাটা
                </Link>
              ) : (
                ""
              )}
            </>
          )}

          {!user && !token && (
            <>
              <Link
                href="/biodata-editor"
                className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-lg rounded-lg"
              >
                বায়োডাটা তৈরী করুন
              </Link>

              <Link
                href="/login"
                className="border-2 border-[#1f4f69] text-[#1f4f69] bg-transparent hover:bg-[#1b3c50] hover:text-white px-4 py-2 transition-all text-lg rounded-lg"
              >
                লগইন
              </Link>
            </>
          )}
          {user && token && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none cursor-pointer rounded-full border border-[#1f4f69] p-1">
                {/* <Avatar>
                  <AvatarImage
                    src={biodata?.profilePic || profileImage}
                    // alt={biodataFormData?.primaryInfoFormData?.fullName}
                  />
                  <AvatarFallback>{test?.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
                <User size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="mt-2 bg-[#307fa7] border-none text-white"
              >
                <DropdownMenuItem
                  className="focus:bg-[#E25A6F] cursor-pointer text-white hover:text-white"
                  onClick={() => router.push("/dashboard")}
                >
                  ড্যাশবোর্ড
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:bg-[#E25A6F] cursor-pointer text-white hover:text-white"
                  onClick={() => {
                    dispatch(logout());
                    toast.success("Logged out successfully");
                    router.push("/");
                  }}
                >
                  লগআউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Drawer and Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu overlay"
            />
            {/* Drawer */}
            <div className="fixed top-[90px] left-0 w-full bg-white shadow-md z-50 flex flex-col items-center py-4 lg:hidden animate-fade-in">
              <nav className="w-full flex flex-col items-center space-y-2 mb-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.route}
                    className="text-lg text-[#1f4f69] hover:text-[#1b3c50] py-2 w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col items-center space-y-2 w-full">
                {user?.role === "USER" && (
                  <>
                    {biodata?.status === "" ? (
                      <Link
                        href="/biodata-editor"
                        className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md w-11/12 text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        বায়োডাটা তৈরী করুন
                      </Link>
                    ) : biodata?.status === "PROCESSING" ? (
                      <Link
                        href="/biodata-editor"
                        className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md w-11/12 text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        বায়োডাটা সম্পূর্ণ করুন
                      </Link>
                    ) : biodata?.status === "PENDING" ||
                      biodata?.status === "EDIT_PENDING" ? (
                      <button className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md w-11/12 text-center">
                        Pending Approval
                      </button>
                    ) : biodata?.status === "UPDATE_REQUESTED" ? (
                      <button className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md w-11/12 text-center">
                        Complete Update & Submit
                      </button>
                    ) : biodata?.status === "APPROVED" ? (
                      <Link
                        href="/biodatas/my-biodata"
                        className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all text-md w-11/12 text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        আমার বায়োডাটা
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {!user && !token && (
                  <Link
                    href="/login"
                    className="border-2 border-[#1f4f69] text-[#1f4f69] bg-transparent hover:bg-[#1b3c50] hover:text-white px-4 py-2 transition-all w-11/12 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
                {user && token && (
                  <div className="flex flex-col items-center w-11/12">
                    <button
                      className="flex items-center space-x-2 w-full justify-center py-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push("/dashboard");
                      }}
                    >
                      <Avatar>
                        <AvatarImage
                          src={biodata?.profilePic}
                          alt={biodataFormData?.primaryInfoFormData?.fullName}
                        />
                        <AvatarFallback>{test?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>Profile</span>
                    </button>
                    <button
                      className="w-full bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all mt-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        dispatch(logout());
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
