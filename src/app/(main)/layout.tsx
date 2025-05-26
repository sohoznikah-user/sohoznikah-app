// File: src/app/(main)/layout.tsx
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
