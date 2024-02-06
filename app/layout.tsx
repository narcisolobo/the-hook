import { ReactNode } from "react";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Navbar from "@/components/navbar/Navbar";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THE HOOK",
  description: "THE HOOK is a lyric writing app.",
};

type Props = {
  children: ReactNode;
};

function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-dvh text-base-content`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
