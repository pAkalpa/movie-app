"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: any }) => {
  return <SessionProvider session={null}>{children}</SessionProvider>;
};

export default AuthProvider;
