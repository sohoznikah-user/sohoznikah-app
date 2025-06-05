// File: src/app/layout.tsx
import RootProvider from "@/lib/provider/RootProvider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const customFont = localFont({
  src: [
    {
      path: "fonts/SolaimanLipi_22-02-2012.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/SolaimanLipi_22-02-2012.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-custom",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning className={customFont.variable}>
      <body
        className={`${inter.className} font-sans `}
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
