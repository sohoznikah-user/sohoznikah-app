// File: src/app/layout.tsx
import RootProvider from "@/lib/provider/RootProvider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Noto_Serif_Bengali } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

// const tiroBangla = Tiro_Bangla({
//   subsets: ["bengali"],
//   weight: ["400"],
// });

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Sohoz Nikah",
    absolute: "Sohoz Nikah",
  },
  description:
    "Sohoz Nikah is the easiest way to create and search life partners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSerifBengali.className} `}
        suppressHydrationWarning
      >
        <RootProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}
