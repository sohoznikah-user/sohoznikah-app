// File: src/app/(main)/biodatas/layout.tsx
import { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="flex-grow">{children}</main>;
}
