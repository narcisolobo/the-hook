"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import UserProvider from "@/context/UserProvider";

type Props = {
  children: ReactNode;
};

function Providers({ children }: Props) {
  return (
    <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UserProvider>
  );
}

export default Providers;
