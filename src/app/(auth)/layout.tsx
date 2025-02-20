import { ReactNode } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D6EAFF] to-[#FFE6F0]">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg min-w-96 bg-gradient-to-r from-[#F2F5FD] to-[#F9F5FA]">
        {children}
      </div>
    </div>
  );
}
