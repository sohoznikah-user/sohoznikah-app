// File: src/components/navbar/index.tsx

"use client";
import logo from "@/assets/images/logo.svg";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const biodata = useAppSelector((state) => state.biodata.biodata);
  const biodataFormData = useAppSelector(
    (state) => state.biodata.biodataFormData
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    <div className="sticky top-0 flex items-center z-20 justify-center p-4 text-[#1f4f69] bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <NavigationMenu className="min-w-96">
        <NavigationMenuList className="flex space-x-2 justify-center">
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

      <div className="min-w-96 flex justify-center">
        <Image src={logo} alt="Logo" width={80} height={50} priority />
      </div>

      <div className="min-w-96 flex justify-end space-x-4">
        {user?.role === "USER" && (
          <Link
            href="/biodata-editor"
            className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all"
          >
            বায়োডাটা তৈরী করুন
          </Link>
        )}

        {!user && !token && (
          <Link
            href="/login"
            className="border-2 border-[#1f4f69] text-[#1f4f69] bg-transparent hover:bg-[#1b3c50] hover:text-white px-4 py-2 transition-all"
          >
            Login
          </Link>
        )}
        {user && token && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={biodata?.profilePic}
                  alt={biodataFormData?.primaryInfoFormData?.fullName}
                />
                <AvatarFallback>{test?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 bg-[#307fa7] border-none"
            >
              <DropdownMenuItem
                className="focus:bg-[#E25A6F] cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-[#E25A6F] cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
