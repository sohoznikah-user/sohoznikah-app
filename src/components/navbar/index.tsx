import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";

export interface MenuItem {
  name: string;
  route: string;
}

export function Navbar() {
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

  return (
    <div className="sticky top-0 flex items-center justify-center p-4 text-[#1f4f69] bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
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
        <Image src={logo} alt="Logo" width={100} height={50} priority />
      </div>

      <div className="min-w-96 flex justify-end space-x-4">
        <Link
          href="/login"
          className="border-2 border-[#1f4f69] text-[#1f4f69] bg-transparent hover:bg-[#1b3c50] hover:text-white px-4 py-2 transition-all"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-[#E25A6F] text-white hover:bg-[#D14A5F] px-4 py-2 transition-all"
        >
          বায়োডাটা তৈরী করুন
        </Link>
      </div>
    </div>
  );
}
