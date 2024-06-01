"use client";

import { ReactNode, useEffect, useState } from "react";
import { SessionProvider, getSession } from "next-auth/react";

import { Session } from "next-auth";

export default function NextAuthProvider({
  children
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
