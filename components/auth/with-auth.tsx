"use client";

import { ComponentProps } from "react";
import { NextPage } from "next";
import { useUser } from "@/context/UserProvider";

function withAuth<P extends ComponentProps<NextPage>>(
  WrappedComponent: NextPage<P>,
) {
  const WithAuth: NextPage<P> = (props) => {
    const user = useUser();

    if (!user.current) {
      throw new Error("You must be signed in to view this page.");
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
}

export default withAuth;
